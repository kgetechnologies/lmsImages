/* --- BUG #112: VANILLA JS CALENDAR FIX (NO JQUERY) --- */

(function() {
    function activateCalendar() {
        // 1. Placeholder ke basis par input box ko dhoondo
        const dateInput = document.querySelector('input[placeholder*="dd/mm/yyyy"]');

        if (dateInput) {
            // 2. Cursor pointer karo taaki pata chale click ho sakta hai
            dateInput.style.cursor = "pointer";

            // 3. Jab user click kare, tab input type badal do
            dateInput.addEventListener('click', function() {
                this.type = 'date'; // Text se Date mein convert
                
                // Modern browsers mein calendar popup kholne ke liye
                if (this.showPicker) {
                    this.showPicker();
                }
            });

            // 4. Agar user date select karke hat jaye, toh format wapas set karein (Optional)
            dateInput.addEventListener('blur', function() {
                if (!this.value) {
                    this.type = 'text';
                }
            });
        }
    }

    // Page load hote hi run karein
    if (document.readyState === 'complete') {
        activateCalendar();
    } else {
        window.addEventListener('load', activateCalendar);
    }
})();
