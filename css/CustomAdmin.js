const enforceValidation = () => {
    const continueBtn = document.querySelector('.btn-primary, button[type="submit"]');
    if (!continueBtn) return;

    const newBtn = continueBtn.cloneNode(true);
    continueBtn.parentNode.replaceChild(newBtn, continueBtn);

    newBtn.addEventListener('click', function(e) {
        let isValid = true;
        
      
        document.querySelectorAll('.error-msg').forEach(el => el.remove());
        document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));

        const isFree = document.getElementById('FreeCourse')?.checked;
        const sellingPrice = document.getElementById('SellingPrice');
        const noOfMonths = document.getElementById('Noofmonth');

        if (sellingPrice || noOfMonths) {
            if (!isFree) {
                if (!sellingPrice?.value.trim() || sellingPrice.value == "0") {
                    showError(sellingPrice, "Selling price is required");
                    isValid = false;
                }
                if (!noOfMonths?.value.trim() || noOfMonths.value == "0") {
                    showError(noOfMonths, "Duration is required");
                    isValid = false;
                }
            }
        }

        document.querySelectorAll('input[required], select[required]').forEach(field => {
            if (!field.value.trim() || field.value === "Select Category") {
                showError(field, "This field is required");
                isValid = false;
            }
        });

        if (!isValid) {
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }
        
    }, true);
};


function showError(field, message) {
    if (!field) return;
    field.classList.add('is-invalid');
    field.style.border = "1px solid red";
    const err = document.createElement('span');
    err.className = 'error-msg';
    err.style.cssText = "color: red; font-size: 11px; display: block; margin-top: 2px;";
    err.innerText = message;
    field.parentElement.appendChild(err);
}


const observer = new MutationObserver(() => {
    enforceValidation();
});

observer.observe(document.body, { childList: true, subtree: true });
enforceValidation(); 
