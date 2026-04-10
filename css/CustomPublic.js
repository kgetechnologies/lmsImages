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
