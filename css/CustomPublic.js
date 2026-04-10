function forceCalendarInit() {
    
    const inputs = document.querySelectorAll('input[placeholder*="dd/mm/yyyy"]');

    inputs.forEach(input => {
       
        input.addEventListener('focus', function() {
            this.type = 'date';
        });

        
        input.onclick = function() {
            if (typeof this.showPicker === 'function') {
                this.showPicker();
            }
        };
        
        input.style.cursor = 'pointer';
    });

    console.log("Force Calendar logic applied!");
}


window.addEventListener('load', forceCalendarInit);
setInterval(forceCalendarInit, 2000);
