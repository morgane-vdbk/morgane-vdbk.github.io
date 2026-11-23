const galerie = document.getElementById("galerie");
const lightbox = document.getElementById("lightbox");
const photoAgrandie = document.getElementById("photoAgrandie");

const fermer = document.getElementById("fermer");
const precedent = document.getElementById("precedent");
const suivant = document.getElementById("suivant");
const compteur = document.getElementById("compteur");

const photos = Array.from(
    galerie.querySelectorAll("img")
);

let indexActuel = 0;

function ouvrirPhoto(index) {
    indexActuel = index;

    afficherPhoto();

    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
}

function afficherPhoto() {
    const photo = photos[indexActuel];

    photoAgrandie.src = photo.src;
    photoAgrandie.alt = photo.alt;

    compteur.textContent =
        `${indexActuel + 1} / ${photos.length}`;
}

function photoSuivante() {
    indexActuel =
        (indexActuel + 1) % photos.length;

    afficherPhoto();
}

function photoPrecedente() {
    indexActuel =
        (indexActuel - 1 + photos.length)
        % photos.length;

    afficherPhoto();
}

function fermerPhoto() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
}

photos.forEach((photo, index) => {
    photo.addEventListener("click", () => {
        ouvrirPhoto(index);
    });
});

suivant.addEventListener("click", photoSuivante);
precedent.addEventListener("click", photoPrecedente);
fermer.addEventListener("click", fermerPhoto);

lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        fermerPhoto();
    }
});

document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("active")) {
        return;
    }

    if (event.key === "ArrowRight") {
        photoSuivante();
    }

    if (event.key === "ArrowLeft") {
        photoPrecedente();
    }

    if (event.key === "Escape") {
        fermerPhoto();
    }
});

let debutTouch = 0;

lightbox.addEventListener("touchstart", (event) => {
    debutTouch = event.changedTouches[0].screenX;
}, { passive: true });

lightbox.addEventListener("touchend", (event) => {
    const finTouch = event.changedTouches[0].screenX;
    const difference = finTouch - debutTouch;

    if (Math.abs(difference) > 50) {
        if (difference < 0) {
            photoSuivante();
        } else {
            photoPrecedente();
        }
    }
}, { passive: true });