/**
 * Whānau Talk Website JavaScript
 * Main script file for website functionality
 */

'use strict';

// Navigation Functions
/**
 * Toggle the side navigation panel
 * @param {boolean} open - Whether to open or close the panel
 */
function toggleNav(open) {
    const sidepanel = document.getElementById("mySidepanel");
    if (sidepanel) {
        sidepanel.style.left = open ? "0" : "-100%";
    } else {
        console.error("Error: Side panel element not found!");
    }
}

/**
 * Open the side navigation panel
 */
function openNav() {
    toggleNav(true);
}

/**
 * Close the side navigation panel
 */
function closeNav() {
    toggleNav(false);
}

/**
 * Toggle collapse functionality for accordion elements
 * @param {string} elementId - ID of the element to toggle
 */
function toggleCollapse(elementId) {
    const element = document.getElementById(elementId);
    const button = document.querySelector('.collapse_btn a');

    if (element && button) {
        // Toggle the 'show' class
        element.classList.toggle('show');

        // Toggle aria-expanded attribute
        const isExpanded = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', String(!isExpanded));
    } else {
        console.error("Error: Element or button not found!");
    }
}


document.addEventListener("DOMContentLoaded", () => {
    const sidepanel = document.getElementById("mySidepanel");
    const navbarToggler = document.querySelector(".navbar-toggler");

    // Function to toggle sidebar
    function toggleSidebar() {
        if (sidepanel.style.left === "0px") {
            sidepanel.style.left = "-100%";
        } else {
            sidepanel.style.left = "0";
        }
    }

    // Event listener for the navbar toggler
    navbarToggler.addEventListener("click", toggleSidebar);

    // Variables to handle swipe gestures
    let touchStartX = 0;
    let touchEndX = 0;

    // Function to handle touch start
    function handleTouchStart(event) {
        touchStartX = event.changedTouches[0].screenX;
    }

    // Function to handle touch end
    function handleTouchEnd(event) {
        touchEndX = event.changedTouches[0].screenX;
        handleSwipeGesture();
    }

    // Track scroll position to disable swipe-to-open when scrolled down
    let isScrolledDown = false;
    const scrollThreshold = 200; // Only allow sidebar open when scrolled less than this amount

    function checkScrollPosition() {
        const scrollPosition = window.scrollY || window.pageYOffset;
        isScrolledDown = scrollPosition > scrollThreshold;
    }

    // Check initial scroll position
    checkScrollPosition();

    // Update on scroll
    window.addEventListener('scroll', checkScrollPosition);

    // Function to handle swipe gesture
    function handleSwipeGesture() {
        if (touchEndX < touchStartX - 50) {
            // Swipe left to close the sidebar (always allowed)
            sidepanel.style.left = "-100%";
        } else if (touchEndX > touchStartX + 50) {
            // Swipe right to open the sidebar (only when near top of page)
            if (!isScrolledDown) {
                sidepanel.style.left = "0";
            }
            // If scrolled down, don't open sidebar on swipe
        }
    }

    // Attach touch event listeners to the entire document
    document.addEventListener("touchstart", handleTouchStart, false);
    document.addEventListener("touchend", handleTouchEnd, false);
});


document.addEventListener("DOMContentLoaded", function () {
    "use strict";
    const accordionButtons = document.querySelectorAll('.accordion-button');
    const accordionImages = document.querySelectorAll('.accordion-button img');

    accordionButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const collapse = button.parentElement.nextElementSibling;

            // Close all other accordion items
            accordionButtons.forEach((otherButton, otherIndex) => {
                if (otherButton !== button) {
                    const otherCollapse = otherButton.parentElement.nextElementSibling;
                    otherCollapse.style.maxHeight = null;
                    accordionImages[otherIndex].src = './images/chevron-down-solid.svg';
                    accordionImages[otherIndex].style.transform = 'rotate(0deg)';
                    otherButton.style.backgroundColor = '#fff';
                }
            });

            // Toggle the clicked accordion item
            if (collapse.style.maxHeight) {
                collapse.style.maxHeight = null;
                accordionImages[index].src = './images/chevron-down-solid.svg';
                accordionImages[index].style.transform = 'rotate(0deg)';
                button.style.backgroundColor = '';
            } else {
                collapse.style.maxHeight = collapse.scrollHeight + "px";
                accordionImages[index].src = './images/minus-solid.svg';
                accordionImages[index].style.transform = 'rotate(180deg)';
                button.style.backgroundColor = '#65b8f7';
            }
        });
    });
});

document.querySelector('.contact-form').addEventListener('mouseover', function() {
    document.querySelector('.contact-us-form').style.background = 'linear-gradient(300deg, #62478f,#262624, #262624,#262624, #1a7083)';
    document.querySelector('.contact-us-form').style.backgroundSize = '180% 180%';
    document.querySelector('.contact-us-form').style.animation = 'gradient-animation 10s ease infinite';
});

document.querySelector('.contact-form').addEventListener('mouseout', function() {
    document.querySelector('.contact-us-form').style.background = 'var(--gradient2)';
    document.querySelector('.contact-us-form').style.animation = 'none';
});

// footer validation start

document.getElementById('contactFormElement').addEventListener('submit', function(event) {
    // Get form elements
    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var message = document.getElementById('message').value.trim();
    var dataConsent = document.getElementById('dataConsent').checked;

    // Email regex pattern
    var emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,6}$/i;

    // Validation checks
    if (name === "") {
        alert("Name is required.");
        event.preventDefault();
        return;
    }

    if (email === "" || !emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        event.preventDefault();
        return;
    }

    if (message === "") {
        alert("Message is required.");
        event.preventDefault();
        return;
    }

    if (!dataConsent) {
        alert("You must agree to the processing of personal data.");
        event.preventDefault();
        return;
    }

});

// Initialize all event listeners when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Add click event listeners to sidebar links
    const anchorLinks = document.querySelectorAll("#mySidepanel a.nav-link.side");
    anchorLinks.forEach(link => {
        link.addEventListener("click", closeNav);
    });

    // Update copyright year
    const yearElement = document.querySelector('.text-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});
