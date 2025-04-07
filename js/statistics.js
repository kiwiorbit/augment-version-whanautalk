/**
 * Whānau Talk Website Statistics
 * Handles website analytics display and tracking
 */

'use strict';

// Initialize statistics counters
let pageViewCount = 0;
let formSubmissionCount = 0;

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
    
    // Update the display
    updateStatisticsDisplay();
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
    
    // Update the display
    updateStatisticsDisplay();
}

/**
 * Update the statistics display with current values
 */
function updateStatisticsDisplay() {
    const pageViewElement = document.getElementById('pageViewCount');
    const formSubmissionElement = document.getElementById('formSubmissionCount');
    
    if (pageViewElement) {
        pageViewElement.textContent = pageViewCount.toLocaleString();
    }
    
    if (formSubmissionElement) {
        formSubmissionElement.textContent = formSubmissionCount.toLocaleString();
    }
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
}

// Initialize statistics when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeStatistics);
