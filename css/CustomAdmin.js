document.addEventListener('DOMContentLoaded', () => {
    
    const getUpdatesBtn = document.querySelector('.subscribe-now-btn'); 
    const emailField = document.querySelector('.footer-email-input') || document.querySelector('input[type="email"]');

    if (getUpdatesBtn && emailField) {
        getUpdatesBtn.addEventListener('click', function(e) {
          
            e.preventDefault(); 
            e.stopPropagation();

            const emailValue = emailField.value.trim();
        
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

            if (emailValue === "") {
                alert("Opps! Email field khali hai.");
                emailField.classList.add('error-border');
            } 
            else if (!emailRegex.test(emailValue)) {
                
                alert("Invalid Email Format! Please include '.com' or '.in' (e.g., veena@gmail.com)");
                emailField.classList.add('error-border');
                emailField.focus();
            } 
            else {
                
                alert("Thank you! Subscription successful.");
                emailField.classList.remove('error-border');
                emailField.value = ""; 
                
                
                console.log("Email validated. Form submission blocked to prevent 404.");
            }
        });

      
        emailField.addEventListener('input', () => {
            emailField.classList.remove('error-border');
        });
    }
});
