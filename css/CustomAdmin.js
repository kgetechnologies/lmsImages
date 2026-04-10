document.addEventListener('DOMContentLoaded', () => {
    
    
    const menuItems = document.querySelectorAll('.menu-bar ul li');
    menuItems.forEach(item => {
        if(item.textContent.trim() === 'c') item.remove();
    });

   
    const updateBtn = document.querySelector('#get-updates-btn');
    const emailInput = document.querySelector('#email-updates-input');

    if (updateBtn) {
        updateBtn.addEventListener('click', (e) => {
            const emailValue = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(emailValue)) {
                alert("Please enter a valid email address (e.g., name@example.com)");
                return;
            }
            alert("Thank you for subscribing!");
        });
    }

   
    const registrationForm = document.querySelector('#registration-form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', (e) => {
         
            document.querySelectorAll('.error-msg').forEach(el => el.remove());
            
            let hasError = false;
            const requiredFields = registrationForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    hasError = true;
                    const error = document.createElement('span');
                    error.className = 'error-msg';
                    error.style.color = 'red';
                    error.innerText = ' This field is mandatory';
                    field.after(error); 
                }
            });

            if (hasError) e.preventDefault();
        });
    }


    const dreamsLink = document.querySelector('a[href*="dreams"]');
    if (dreamsLink) {
        dreamsLink.addEventListener('click', (e) => {
         
            console.log("Navigating to Dreams section...");
          
        });
    }

   
    const subscribeBtns = document.querySelectorAll('.subscribe-btn');
    subscribeBtns.forEach(btn => {
        btn.onclick = function() {
            this.innerText = "Subscribed!";
            this.style.backgroundColor = "#28a745";
            this.disabled = true;
        };
    });

   
    const calendarEl = document.getElementById('calendar-container');
    if (calendarEl) {
        calendarEl.innerHTML = "<p style='padding:20px;'>Calendar Loading... [Integration Ready]</p>";
        
    }
});
