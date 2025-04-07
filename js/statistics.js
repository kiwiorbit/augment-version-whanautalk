/**
 * Whānau Talk Website Statistics
 * Handles website analytics display and tracking with animated counters
 */

'use strict';

// Initialize statistics counters
let pageViewCount = 0;
let formSubmissionCount = 0;

// Fixed statistics (these don't change with page views)
const familiesSupported = 42;
const countriesReached = 8;

/**
 * Animate counting from 0 to target number
 * @param {HTMLElement} element - The DOM element to update
 * @param {number} target - The target number to count to
 * @param {number} duration - Duration of animation in milliseconds
 * @param {boolean} isInteger - Whether to display as integer or with decimals
 */
function animateCounter(element, target, duration = 5000, isInteger = true) {
    if (!element) return;

    // Set starting value
    let startValue = 0;
    let startTime = null;

    // Use requestAnimationFrame for smooth animation
    function updateCounter(timestamp) {
        if (!startTime) startTime = timestamp;

        // Calculate progress
        const progress = Math.min((timestamp - startTime) / duration, 1);

        // Apply easing function for smoother animation (ease-out)
        const easedProgress = 1 - Math.pow(1 - progress, 3);

        // Calculate current value
        const currentValue = startValue + (target - startValue) * easedProgress;

        // Update the element text
        if (isInteger) {
            element.textContent = Math.floor(currentValue).toLocaleString();
        } else {
            element.textContent = currentValue.toFixed(1);
        }

        // Continue animation if not complete
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }

    // Start the animation
    requestAnimationFrame(updateCounter);
}

/**
 * Increment page view counter and update display
 */
function incrementPageViews() {
    // In a real implementation, this would fetch from a database or analytics service
    // For demo purposes, we'll use localStorage to persist between sessions
    if (localStorage.getItem('whanauTalkPageViews')) {
        pageViewCount = parseInt(localStorage.getItem('whanauTalkPageViews'));
    }

    // Increment the counter
    pageViewCount++;

    // Save to localStorage
    localStorage.setItem('whanauTalkPageViews', pageViewCount);
}

/**
 * Increment form submission counter and update display
 */
function incrementFormSubmissions() {
    // In a real implementation, this would fetch from a database or analytics service
    // For demo purposes, we'll use localStorage to persist between sessions
    if (localStorage.getItem('whanauTalkFormSubmissions')) {
        formSubmissionCount = parseInt(localStorage.getItem('whanauTalkFormSubmissions'));
    }

    // Increment the counter
    formSubmissionCount++;

    // Save to localStorage
    localStorage.setItem('whanauTalkFormSubmissions', formSubmissionCount);

    // Animate the form submission counter immediately
    const formSubmissionElement = document.getElementById('formSubmissionCount');
    if (formSubmissionElement) {
        animateCounter(formSubmissionElement, formSubmissionCount);
    }
}

/**
 * Start animations for all statistics counters
 */
function animateStatistics() {
    // Get all statistic elements
    const pageViewElement = document.getElementById('pageViewCount');
    const formSubmissionElement = document.getElementById('formSubmissionCount');

    // Get all statistic elements without IDs (using their parent's class and index)
    const statisticNumbers = document.querySelectorAll('.statistic-number');

    // Add staggered delays for a more interesting visual effect
    const baseDelay = 300; // milliseconds

    // Animate page views counter
    if (pageViewElement) {
        setTimeout(() => {
            animateCounter(pageViewElement, pageViewCount);
        }, baseDelay * 0); // No delay for first counter
    }

    // Animate form submissions counter
    if (formSubmissionElement) {
        setTimeout(() => {
            animateCounter(formSubmissionElement, formSubmissionCount);
        }, baseDelay * 1); // Delay by 300ms
    }

    // Animate fixed statistics (families supported and Devices Delivered)
    // These are the 3rd and 4th .statistic-number elements
    if (statisticNumbers.length >= 3) {
        setTimeout(() => {
            animateCounter(statisticNumbers[2], familiesSupported);
        }, baseDelay * 2); // Delay by 600ms
    }

    if (statisticNumbers.length >= 4) {
        setTimeout(() => {
            animateCounter(statisticNumbers[3], countriesReached);
        }, baseDelay * 3); // Delay by 900ms
    }
}

/**
 * Check if an element is in the viewport
 * @param {HTMLElement} element - The element to check
 * @returns {boolean} - Whether the element is in the viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Initialize statistics on page load
 */
function initializeStatistics() {
    // Load values from localStorage
    if (localStorage.getItem('whanauTalkPageViews')) {
        pageViewCount = parseInt(localStorage.getItem('whanauTalkPageViews'));
    }

    if (localStorage.getItem('whanauTalkFormSubmissions')) {
        formSubmissionCount = parseInt(localStorage.getItem('whanauTalkFormSubmissions'));
    }

    // Increment page views for this visit
    incrementPageViews();

    // Add event listener to contact form for submission tracking
    const contactForm = document.getElementById('contactFormElement');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            // Only increment if form validation passes
            if (event.defaultPrevented) {
                return;
            }
            incrementFormSubmissions();
        });
    }

    // Set up intersection observer for statistics section
    const statisticsSection = document.getElementById('statisticsSection');
    if (statisticsSection) {
        // Check if IntersectionObserver is supported
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Start animation when statistics section comes into view
                        animateStatistics();
                        // Unobserve after animation starts
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 }); // Trigger when at least 10% of the element is visible

            observer.observe(statisticsSection);
        } else {
            // Fallback for browsers that don't support IntersectionObserver
            window.addEventListener('scroll', function scrollHandler() {
                if (isInViewport(statisticsSection)) {
                    animateStatistics();
                    window.removeEventListener('scroll', scrollHandler);
                }
            });

            // Also check on initial load
            if (isInViewport(statisticsSection)) {
                animateStatistics();
            }
        }
    }
}

// Initialize statistics when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeStatistics);
