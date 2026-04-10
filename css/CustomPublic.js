(function() {
    function initCalendar() {
        
        const selectors = [
            'input[name="datetimes"]',
            'input.datepicker',
            '.datetimepicker',
            'input[placeholder*="dd/mm/yyyy"]',
            '.daterange'
        ];

        selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            
            elements.forEach(el => {
                
                if (window.jQuery && jQuery.fn.daterangepicker) {
                    jQuery(el).daterangepicker({
                        opens: 'left',
                        locale: { format: 'DD/MM/YYYY' }
                    });
                    console.log("Calendar initialized via Library");
                } 
                
                else {
                    el.addEventListener('click', function() {
                        if (typeof this.showPicker === 'function') {
                            this.showPicker();
                        }
                    });
                }
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCalendar);
    } else {
        initCalendar();
    }
})();
