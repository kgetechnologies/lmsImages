const setupStrictValidation = () => {
  
    const continueBtn = document.querySelector('.btn-primary, button[type="submit"]');
    
    if (continueBtn && !continueBtn.dataset.validated) {
       
        const strictBtn = continueBtn.cloneNode(true);
        continueBtn.parentNode.replaceChild(strictBtn, continueBtn);
        strictBtn.dataset.validated = "true";

        strictBtn.addEventListener('click', function(e) {
            let isValid = true;
            
          
            document.querySelectorAll('.error-msg').forEach(el => el.remove());
            document.querySelectorAll('.is-invalid').forEach(el => {
                el.classList.remove('is-invalid');
                el.style.border = "";
            });

          
            const isFree = document.getElementById('FreeCourse')?.checked;
            const sellingPrice = document.getElementById('SellingPrice');
            const noOfMonths = document.getElementById('Noofmonth');

       
            if (sellingPrice || noOfMonths) {
                if (!isFree) {
                    if (!sellingPrice?.value.trim() || sellingPrice.value == "0") {
                        showError(sellingPrice, "Price is required");
                        isValid = false;
                    }
                    if (!noOfMonths?.value.trim() || noOfMonths.value == "0") {
                        showError(noOfMonths, "Duration is required");
                        isValid = false;
                    }
                }
            }

            if (!isValid) {
                e.preventDefault();
                e.stopImmediatePropagation();
                return false;
            }

            
            strictBtn.click(); 
        }, true);
    }
};


function showError(field, message) {
    if (!field) return;
    field.classList.add('is-invalid');
    field.style.border = "2px solid red";
    const err = document.createElement('span');
    err.className = 'error-msg';
    err.style.cssText = "color: red; font-size: 12px; display: block; margin-top: 5px; font-weight: bold;";
    err.innerText = message;
    field.parentElement.appendChild(err);
}


const pageObserver = new MutationObserver(() => {
    setupStrictValidation();
});

pageObserver.observe(document.body, { childList: true, subtree: true });


setupStrictValidation();
