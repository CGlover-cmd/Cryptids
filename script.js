transition: opacity 0.4s ease;
}

.card-container {
#pre-loader .card-container {
position: relative;
}

.card {
#pre-loader .card {
width: 120px;
height: 168px;
position: relative;
transform-style: preserve-3d;
animation: classic-flip 2.5s infinite ease-in-out;
}

.card-face {
#pre-loader .card-face {
position: absolute;
width: 100%;
height: 100%;
@@ -675,16 +675,22 @@ h1 {
overflow: hidden;
}

.card-face img {
#pre-loader .card-face img {
width: 100%;
height: 100%;
object-fit: cover;
}

.card-back {
    transform: rotateY(180deg);
/* THIS IS THE FIX: Override general rules for the pre-loader card */
#pre-loader .card-front {
    transform: rotateY(0deg); /* Resets the card-front to its default state */
}

#pre-loader .card-back {
    transform: rotateY(180deg); /* Flips the card-back so it's hidden initially */
}


@keyframes classic-flip {
from { transform: rotateY(0deg); }
to { transform: rotateY(360deg); }
@@ -755,3 +761,4 @@ h1 {
margin: 0;
}
}
