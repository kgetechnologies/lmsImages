const validatePricingSection = (e) => {
   
    const isContinueBtn = e.target.closest('.btn-primary') || e.target.closest('button[type="submit"]');
    if (!isContinueBtn) return;

   
    const isFree = document.getElementById('FreeCourse')?.checked;
    const sellingPrice = document.getElementById('SellingPrice');
    const noOfMonths = document.getElementById('Noofmonth');

    
    if (!sellingPrice && !noOfMonths) return;

    let isValid = true;

    document.querySelectorAll('.error-msg').forEach(el => el.remove());
    document.querySelectorAll('.is-invalid').forEach(el => {
        el.classList.remove('is-invalid');
        el.style.borderColor = "";
    });

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

   
    if (!isValid) {
        e.preventDefault();
        e.stopPropagation();
        
        const firstError = document.querySelector('.is-invalid');
        if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
};


function showError(field, message) {
    field.classList.add('is-invalid');
    field.style.borderColor = "red";
    
    if (!field.parentElement.querySelector('.error-msg')) {
        const err = document.createElement('span');
        err.className = 'error-msg';
        err.style.cssText = "color: red; font-size: 12px; display: block; margin-top: 5px; font-weight: 500;";
        err.innerText = message;
        field.parentElement.appendChild(err);
    }
}

document.addEventListener('click', validatePricingSection, true);

document.addEventListener('click', function(e) {
    const sidebarLink = e.target.closest('.sidebar .nav-item > a');
    if (sidebarLink) {
        const parent = sidebarLink.parentElement;
        const subMenu = parent.querySelector('.sub-menu');
        if (subMenu) {
            e.preventDefault();
            parent.classList.toggle('active');
        }
    }
}, true);
