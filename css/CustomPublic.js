document.addEventListener('click', function(e) {
    if (e.target && e.target.innerText.trim() === 'Subscribe') {
        
        const emailBox = document.querySelector('input[type="email"]');
        const emailValue = emailBox ? emailBox.value.trim() : "";

        if (emailValue === "") {
            alert("Please enter your email!");
        } else if (!emailValue.includes("@")) {
            alert("Invalid email format!");
        } else {
            
            alert("Success! Subscribed with: " + emailValue);
            emailBox.value = ""; 
        }
    }
});

window.addEventListener('load', function() {
    document.querySelectorAll('li').forEach(function(li) {
        if (li.nextSibling && li.nextSibling.nodeType === 3) {
            if (li.nextSibling.nodeValue.trim() === 'c') {
                li.nextSibling.remove();
            }
        }
    });
});






function fixCalendarBug() {
    
    const dateInputs = document.querySelectorAll('.bookingrange, .date-range, input[placeholder*="dd/mm/yyyy"]');

    dateInputs.forEach(input => {
        
        input.style.cursor = 'pointer';

        
        input.addEventListener('mousedown', function() {
            this.type = 'date'; 
            
            
            if (this.showPicker) {
                this.showPicker();
            }
        });

        input.addEventListener('blur', function() {
            if (!this.value) {
                this.type = 'text';
            }
        });
    });
}


window.onload = fixCalendarBug;
setInterval(fixCalendarBug, 1500);





// DOM load hone ka wait karein taaki form mil sake
document.addEventListener('DOMContentLoaded', function() {
    
   
    const subscribeForm = document.querySelector('.footer-newsletter form') || document.querySelector('.subscribe-form form');

    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const emailInput = subscribeForm.querySelector('input[type="email"]') || subscribeForm.querySelector('input');
            const emailValue = emailInput ? emailInput.value.trim() : "";

            if (emailValue === "" || !emailValue.includes("@")) {
                alert("Please enter a valid email address!");
            } else {
                console.log("Subscription success for:", emailValue);
                alert("Mubarak ho! " + emailValue + " subscribe ho gaya hai.");
                
                emailInput.value = ""; 
            }
        });
        console.log("Newsletter fix applied successfully!");
    }
});
