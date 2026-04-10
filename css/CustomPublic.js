document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.querySelector('.bookingrange') || document.querySelector('input[placeholder*="dd/mm/yyyy"]');

    if (dateInput) {
        
        dateInput.style.cursor = "pointer";

        
        dateInput.addEventListener('click', function() {
            this.type = 'date';
            
            
            if (this.showPicker) {
                this.showPicker();
            }
        });

        
        dateInput.addEventListener('blur', function() {
            if (!this.value) {
                this.type = 'text';
            }
        });
    }
});
