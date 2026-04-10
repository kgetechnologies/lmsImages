
(function() {
    function openCalendar() {
        
        const calendarInput = jQuery('input[placeholder*="dd/mm/yyyy"]');

        if (calendarInput.length > 0) {
            
            if (typeof jQuery.fn.daterangepicker === 'function') {
                calendarInput.daterangepicker({
                    autoUpdateInput: true,
                    showDropdowns: true,
                    locale: { format: 'DD/MM/YYYY' }
                }).focus(); // Force focus to open it
                
                console.log("Calendar opened via Library");
            } else {
                // Fallback: If no library, use browser's native date picker
                calendarInput.attr('type', 'date');
                if (calendarInput[0].showPicker) {
                    calendarInput[0].showPicker();
                }
                console.log("Calendar opened via Native Fallback");
            }
        }
    }

    // Har jagah click sunne ke liye
    document.addEventListener('mousedown', function(e) {
        if (e.target.placeholder && e.target.placeholder.includes('dd/mm/yyyy')) {
            openCalendar();
        }
    });

    // Page load par bhi ek baar check karein
    window.onload = openCalendar;
})();
