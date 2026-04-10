(function() {
    function initMyCalendar() {
        
        const dateInput = document.querySelector('.bookingrange');

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
            
            console.log("Calendar logic successfully attached to .bookingrange");
        }
    }


    window.addEventListener('load', initMyCalendar);
    setTimeout(initMyCalendar, 2000); 
})();
