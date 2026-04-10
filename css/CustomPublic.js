function loadCalendar() {
   
    const rangeInput = jQuery('input[placeholder*="dd/mm/yyyy"]');

    if (rangeInput.length > 0 && jQuery.fn.daterangepicker) {
        rangeInput.daterangepicker({
            autoUpdateInput: false,
            locale: {
                format: 'DD/MM/YYYY',
                cancelLabel: 'Clear'
            }
        });

       
        rangeInput.on('apply.daterangepicker', function(ev, picker) {
            jQuery(this).val(picker.startDate.format('DD/MM/YYYY') + ' - ' + picker.endDate.format('DD/MM/YYYY'));
        });

        rangeInput.on('cancel.daterangepicker', function(ev, picker) {
            jQuery(this).val('');
        });

        console.log("DateRangePicker successfully bound!");
    } else {
       
        console.log("Library not found, trying native fallback...");
        document.querySelectorAll('input[placeholder*="dd/mm/yyyy"]').forEach(el => {
            el.type = 'date'; 
        });
    }
}


jQuery(document).ready(function() {
    loadCalendar();
});
