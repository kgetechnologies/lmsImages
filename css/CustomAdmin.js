document.addEventListener('DOMContentLoaded', () => {
  
    const getUpdatesBtn = document.querySelector('.subscribe-now-btn'); 
    const emailField = document.querySelector('.footer-email-input') || document.querySelector('input[type="email"]');

    if (getUpdatesBtn && emailField) {
        getUpdatesBtn.addEventListener('click', function(e) {
            e.preventDefault(); 
            const emailValue = emailField.value.trim();
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

            if (emailValue === "") {
                alert("Please enter your email!");
                emailField.classList.add('error-border');
            } 
            else if (!emailRegex.test(emailValue)) {
                alert("Invalid format! Please use a valid email (e.g. name@example.com)");
                emailField.classList.add('error-border');
                emailField.focus();
            } 
            else {
                alert("Success! You are subscribed.");
                emailField.classList.remove('error-border');
                emailField.value = ""; 
            }
        });

        emailField.addEventListener('input', () => {
            emailField.classList.remove('error-border');
        });
    }
  
});
