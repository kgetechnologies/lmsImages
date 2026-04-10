document.addEventListener('DOMContentLoaded', () => {
   
    const subscribeBtn = document.querySelector('.subscribe-now-btn') || document.querySelector('button:contains("Subscribe Now")'); 
    const emailInput = document.querySelector('input[type="email"]') || document.querySelector('.footer-email-input');

    if (subscribeBtn && emailInput) {
        subscribeBtn.addEventListener('click', (e) => {
            e.preventDefault(); 
            
            const emailValue = emailInput.value.trim();
          
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

            if (emailValue === "") {
                alert("Please enter an email address.");
                emailInput.style.border = "2px solid red";
            } else if (!emailPattern.test(emailValue)) {
                
                alert("Invalid email format! Please include a dot (.) and a domain (e.g., .com)");
                emailInput.style.border = "2px solid red";
            } else {
               
                alert("Subscription successful! Thank you for updating.");
                emailInput.style.border = "2px solid green";
                emailInput.value = ""; 
            }
        });

       
        emailInput.addEventListener('input', () => {
            emailInput.style.border = "1px solid #ccc";
        });
    }
});
