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
