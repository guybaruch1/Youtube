// script.js

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const submitButton = document.querySelector('button[type="submit"]');
  
    // Disable the submit button by default
    submitButton.disabled = true;
  
    // Enable the submit button when both email and password inputs are valid
    form.addEventListener('input', function() {
      if (emailInput.validity.valid && passwordInput.validity.valid) {
        submitButton.disabled = false;
      } else {
        submitButton.disabled = true;
      }
    });
  });
  