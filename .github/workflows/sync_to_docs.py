import os
import sys
import json
import io
from datetime import datetime
import google.oauth2.service_account
from googleapiclient.discovery import build

def main():
    """
    Main function to sync file contents to Google Docs.
    Can either sync all mapped files or a specific subset passed as arguments.
    """
    # --- 1. AUTHENTICATION ---
    try:
        gcp_sa_key = os.environ['GCP_SA_KEY']
        creds_json = json.loads(gcp_sa_key)
        creds = google.oauth2.service_account.Credentials.from_service_account_info(creds_json)
    except KeyError:
        print("ERROR: GCP_SA_KEY secret not found. Please ensure it is set in your repository settings.")
        sys.exit(1)
    except json.JSONDecodeError:
        print("ERROR: Failed to decode GCP_SA_KEY JSON. Ensure the secret is copied correctly.")
        sys.exit(1)

    scoped_credentials = creds.with_scopes([
        'https://www.googleapis.com/auth/documents',
        'https://www.googleapis.com/auth/drive'
    ])
    docs_service = build('docs', 'v1', credentials=scoped_credentials)
    print("Successfully authenticated with Google APIs.")

    # --- 2. LOAD MAPPING ---
    try:
        mapping_json_str = os.environ['DOCS_MAPPING']
        file_to_doc_mapping = json.loads(mapping_json_str)
    except KeyError:
        print("ERROR: DOCS_MAPPING secret not found.")
        sys.exit(1)
    except json.JSONDecodeError:
        print("ERROR: Failed to decode DOCS_MAPPING JSON.")
        sys.exit(1)

    if not file_to_doc_mapping:
        print("Warning: DOCS_MAPPING is empty. No files to process.")
        return

    # --- 3. DETERMINE WHICH FILES TO PROCESS ---
    # sys.argv[1:] will contain the list of files changed in the commit.
    # If it's empty, we fall back to processing all mapped files.
    files_to_process = sys.argv[1:]
    
    if not files_to_process:
        print("No specific files provided; processing all files in DOCS_MAPPING.")
        target_files = file_to_doc_mapping.keys()
    else:
        print(f"Processing specific files from commit: {files_to_process}")
        target_files = files_to_process

    # --- 4. PROCESS FILES ---
    commit_sha = os.getenv('GITHUB_SHA', 'Unknown')
    short_sha = commit_sha[:7]
    timestamp = datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S UTC')
    
    processed_a_file = False
    for repo_file_path in target_files:
        # Only process files that are actually in our mapping
        if repo_file_path not in file_to_doc_mapping:
            print(f"Skipping '{repo_file_path}' as it is not in the DOCS_MAPPING.")
            continue

        doc_id = file_to_doc_mapping[repo_file_path]
        print(f"\nProcessing file: '{repo_file_path}' for Doc ID: '{doc_id}'")
        processed_a_file = True

        if not os.path.exists(repo_file_path):
            print(f"  - WARNING: File '{repo_file_path}' not found in repository. Skipping.")
            continue

        with open(repo_file_path, 'r', encoding='utf-8') as f:
            file_content = f.read()

        header = f"\n\n--- Appended on {timestamp} from commit {short_sha} ---\n\n"
        content_to_append = header + file_content

        # --- 5. APPEND TO GOOGLE DOC ---
        try:
            document = docs_service.documents().get(documentId=doc_id).execute()
            end_index = document.get('body').get('content')[-1].get('endIndex')

            requests = [
                {
                    'insertText': {
                        'location': { 'index': end_index - 1 },
                        'text': content_to_append
                    }
                }
            ]

            docs_service.documents().batchUpdate(
                documentId=doc_id,
                body={'requests': requests}
            ).execute()

            print(f"  - SUCCESS: Successfully appended content to Google Doc.")

        except Exception as e:
            print(f"  - ERROR: An error occurred while updating the Google Doc: {e}")

    if not processed_a_file:
         print("\nNo files from the commit matched the files in DOCS_MAPPING. Nothing to do.")


if __name__ == '__main__':
    main()
