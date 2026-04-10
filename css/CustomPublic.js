/* --- BUG #112: FINAL CALENDAR FIX --- */

(function() {
    function initCalendar() {
        // Console mein jo input mila tha usay target karna
        const dateInput = document.querySelector('input[placeholder*="dd/mm/yyyy"]');

        if (dateInput) {
            // Cursor pointer taaki user ko pata chale click karna hai
            dateInput.style.cursor = "pointer";

            // Click event listener
            dateInput.addEventListener('click', function() {
                // Input type change karke calendar trigger karna
                this.type = 'date';
                
                if (this.showPicker) {
                    this.showPicker();
                }
            });

            // Agar user date select kiye bina bahar click kare toh wapas placeholder dikhana
            dateInput.addEventListener('blur', function() {
                if (!this.value) {
                    this.type = 'text';
                }
            });
        }
    }

    // DOM load hone par run karein
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCalendar);
    } else {
        initCalendar();
    }
})();
