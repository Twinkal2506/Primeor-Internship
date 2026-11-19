
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

// Open and close the mobile navigation
menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("open");
    menuToggle.classList.toggle("active");

    const isOpen = navLinks.classList.contains("open");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
});

// Close the menu after clicking a navigation link
const navigationItems = navLinks.querySelectorAll("a");

navigationItems.forEach(function (item) {
    item.addEventListener("click", function () {
        navLinks.classList.remove("open");
        menuToggle.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
});

// Close the menu when switching back to desktop size
window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
        navLinks.classList.remove("open");
        menuToggle.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    }
});

const workshopOptions = document.querySelectorAll(".workshop-option");

const workshopImage = document.getElementById("workshopImage");
const previewNumber = document.getElementById("previewNumber");
const workshopCategory = document.getElementById("workshopCategory");
const workshopTitle = document.getElementById("workshopTitle");
const workshopDescription = document.getElementById("workshopDescription");

const workshopData = {
    pottery: {
        number: "01",
        category: "WORK WITH YOUR HANDS",
        title: "Shape something beautiful.",
        description: "Get your hands into clay, explore form and texture, and create something uniquely yours.",
        image: "https://images.unsplash.com/photo-1422246358533-95dcd3d48961?w=1000&auto=format&fit=crop&q=85"
    },

    painting: {
        number: "02",
        category: "COLOUR OUTSIDE THE LINES",
        title: "Let colour take over.",
        description: "Experiment with colour, brushwork and creative expression in a relaxed painting session.",
        image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1000&auto=format&fit=crop&q=85"
    },

    photography: {
        number: "03",
        category: "SEE THINGS DIFFERENTLY",
        title: "Capture a new perspective.",
        description: "Explore composition, light and storytelling while learning to see everyday moments differently.",
        image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1000&auto=format&fit=crop&q=85"
    }
};

const workshopCopy = document.querySelector(".workshop-copy");

workshopOptions.forEach((option) => {
    option.addEventListener("click", () => {
        const selectedWorkshop = workshopData[option.dataset.workshop];

        if (!selectedWorkshop) return;

        workshopOptions.forEach((button) => {
            button.setAttribute("aria-selected", "false");
            button.classList.remove("active");
        });

        option.setAttribute("aria-selected", "true");
        option.classList.add("active");

        workshopImage.classList.add("is-changing");

        if (workshopCopy) {
            workshopCopy.classList.add("is-changing");
        }

        setTimeout(() => {
            workshopImage.src = selectedWorkshop.image;
            workshopImage.alt = selectedWorkshop.title;

            previewNumber.textContent = selectedWorkshop.number;
            workshopCategory.textContent = selectedWorkshop.category;
            workshopTitle.textContent = selectedWorkshop.title;
            workshopDescription.textContent = selectedWorkshop.description;

            workshopImage.classList.remove("is-changing");

            if (workshopCopy) {
                workshopCopy.classList.remove("is-changing");
            }
        }, 300);
    });
});

const hero = document.querySelector(".hero");

const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
);

const desktopScreen = window.matchMedia("(min-width: 769px)");

let ticking = false;

function updateParallax() {
    if (!hero || reduceMotion.matches || !desktopScreen.matches) {
        if (hero) {
            hero.style.setProperty("--parallax-offset", "0px");
        }

        ticking = false;
        return;
    }

    const scrollPosition = window.scrollY;
    const offset = Math.max(-70, -scrollPosition * 0.12);

    hero.style.setProperty("--parallax-offset", `${offset}px`);

    ticking = false;
}

window.addEventListener("scroll", () => {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
}, { passive: true });

window.addEventListener("resize", updateParallax);

updateParallax();