
/* =========================================
   AFTERIMAGE — INTERACTIVE IMAGE VIEWER
========================================= */

const imageButtons = document.querySelectorAll(".image-trigger");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");

const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxCounter = document.getElementById("lightboxCounter");

const closeButton = document.getElementById("lightboxClose");
const previousButton = document.getElementById("lightboxPrev");
const nextButton = document.getElementById("lightboxNext");

const slideshowToggle = document.getElementById("slideshowToggle");
const progressBar = document.getElementById("slideshowProgressBar");

const SLIDE_DURATION = 4000;

let currentImageIndex = 0;
let lastFocusedElement = null;

let slideshowTimer = null;
let isPlaying = false;


// COLLECT IMAGE INFORMATION

const galleryImages = Array.from(imageButtons).map((button) => {
    const image = button.querySelector("img");

    const caption = button.closest(".gallery-item")
        .querySelector(".image-caption span:first-child");

    return {
        src: image.src,
        alt: image.alt,
        title: caption.textContent
    };
});


// OPEN LIGHTBOX

function openLightbox(index) {
    currentImageIndex = index;
    lastFocusedElement = document.activeElement;

    showImage();

    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    closeButton.focus();
}


// UPDATE SLIDESHOW PROGRESS

function updateProgress() {
    if (!progressBar) return;

    progressBar.style.transition = "none";
    progressBar.style.width = "0%";

    if (isPlaying) {
        requestAnimationFrame(() => {
            progressBar.style.transition =
                `width ${SLIDE_DURATION}ms linear`;

            progressBar.style.width = "100%";
        });
    }
}


// DISPLAY SELECTED IMAGE

function showImage() {
    const image = galleryImages[currentImageIndex];

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;

    lightboxTitle.textContent = image.title;

    lightboxCounter.textContent =
        `${String(currentImageIndex + 1).padStart(2, "0")} / ${String(galleryImages.length).padStart(2, "0")}`;

    updateProgress();

    if (isPlaying) {
        scheduleNextSlide();
    }
}


// SCHEDULE NEXT SLIDE

function scheduleNextSlide() {
    clearTimeout(slideshowTimer);

    slideshowTimer = setTimeout(() => {
        currentImageIndex =
            (currentImageIndex + 1) % galleryImages.length;

        showImage();
    }, SLIDE_DURATION);
}


// START SLIDESHOW

function startSlideshow() {
    if (isPlaying) return;

    isPlaying = true;

    slideshowToggle.textContent = "PAUSE ||";
    slideshowToggle.setAttribute("aria-label", "Pause slideshow");

    showImage();
}


// STOP SLIDESHOW

function stopSlideshow() {
    isPlaying = false;

    clearTimeout(slideshowTimer);
    slideshowTimer = null;

    slideshowToggle.textContent = "PLAY →";
    slideshowToggle.setAttribute("aria-label", "Start slideshow");

    updateProgress();
}


// CLOSE LIGHTBOX

function closeLightbox() {
    stopSlideshow();

    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

    if (lastFocusedElement) {
        lastFocusedElement.focus();
    }
}


// NEXT IMAGE

function showNextImage() {
    currentImageIndex =
        (currentImageIndex + 1) % galleryImages.length;

    showImage();
}


// PREVIOUS IMAGE

function showPreviousImage() {
    currentImageIndex =
        (currentImageIndex - 1 + galleryImages.length)
        % galleryImages.length;

    showImage();
}


// THUMBNAIL CLICK EVENTS

imageButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        openLightbox(index);
    });
});


// CONTROL BUTTON EVENTS

closeButton.addEventListener("click", closeLightbox);

nextButton.addEventListener("click", showNextImage);

previousButton.addEventListener("click", showPreviousImage);

slideshowToggle.addEventListener("click", () => {
    if (isPlaying) {
        stopSlideshow();
    } else {
        startSlideshow();
    }
});


// CLICK OUTSIDE IMAGE TO CLOSE

lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});


// KEYBOARD CONTROLS

document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("active")) {
        return;
    }

    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowRight") {
        showNextImage();
    }

    if (event.key === "ArrowLeft") {
        showPreviousImage();
    }
});
