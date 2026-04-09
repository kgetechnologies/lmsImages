document.addEventListener('DOMContentLoaded', function () {
  

    const pricingForm = document.querySelector('form'); 

    if (pricingForm) {
        pricingForm.addEventListener('submit', function (e) {
            let isValid = true;
            
            document.querySelectorAll('.error-msg').forEach(el => el.remove());
            document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));

      
            const isFree = document.getElementById('FreeCourse')?.checked;
            const sellingPrice = document.getElementById('SellingPrice');
            const noOfMonths = document.getElementById('Noofmonth');

            if (!isFree) {
               
                if (!sellingPrice.value.trim() || sellingPrice.value === "0") {
                    showFieldError(sellingPrice, "Selling price is required");
                    isValid = false;
                }

                if (!noOfMonths.value.trim() || noOfMonths.value === "0") {
                    showFieldError(noOfMonths, "Please enter duration");
                    isValid = false;
                }
            }

            pricingForm.querySelectorAll('[required]').forEach(field => {
                if (!field.value.trim()) {
                    showFieldError(field, "This field is required");
                    isValid = false;
                }
            });

            if (!isValid) {
                e.preventDefault();
                e.stopPropagation();
            }
        });
    }

    function showFieldError(field, message) {
        const container = field.parentElement;
        field.classList.add('is-invalid');
        
        const err = document.createElement('span');
        err.className = 'error-msg';
        err.style.cssText = "color: red; font-size: 12px; display: block; margin-top: 5px;";
        err.innerText = message;
        
        container.appendChild(err);
    }
});
