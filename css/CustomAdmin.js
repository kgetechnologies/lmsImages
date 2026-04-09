document.addEventListener('DOMContentLoaded', function () {
    // 1. Sidebar logic (same as before)
    const sidebarLinks = document.querySelectorAll('.sidebar .nav-item > a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const parent = this.parentElement;
            const subMenu = parent.querySelector('.sub-menu');
            if (subMenu) {
                e.preventDefault();
                parent.classList.toggle('active');
            }
        });
    });

    // 2. Validation Logic
    const validatePricingForm = (e) => {
        let isValid = true;
        
        // Purane errors remove karo
        document.querySelectorAll('.error-msg').forEach(el => el.remove());
        document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));

        const isFree = document.getElementById('FreeCourse')?.checked;
        const sellingPrice = document.getElementById('SellingPrice');
        const noOfMonths = document.getElementById('Noofmonth');

        // Validation only if NOT free
        if (!isFree) {
            if (sellingPrice && (!sellingPrice.value.trim() || sellingPrice.value == "0")) {
                showError(sellingPrice, "Selling price is required");
                isValid = false;
            }
            if (noOfMonths && (!noOfMonths.value.trim() || noOfMonths.value == "0")) {
                showError(noOfMonths, "Duration is required");
                isValid = false;
            }
        }

        // Agar invalid hai toh browser ko aage badhne se roko
        if (!isValid) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    };

    // Helper function to show red text
    function showError(field, message) {
        field.classList.add('is-invalid');
        field.style.borderColor = "red"; // Instant visual cue
        
        const err = document.createElement('span');
        err.className = 'error-msg';
        err.style.cssText = "color: red; font-size: 12px; display: block; margin-top: 4px; font-weight: 500;";
        err.innerText = message;
        
        field.parentElement.appendChild(err);
    }

    // 3. Attach to BOTH Form Submit and Continue Button
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', validatePricingForm);
    }

    // Kuch cases mein button click pe validation bypass ho jati hai, isliye button pe bhi lagate hain
    const continueBtn = document.querySelector('.btn-primary, button[type="submit"]'); 
    if (continueBtn) {
        continueBtn.addEventListener('click', function(e) {
            if (!validatePricingForm(e)) {
                // do nothing, error already handled
            }
        });
    }
});
