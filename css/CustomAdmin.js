document.addEventListener('DOMContentLoaded', function () {
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

    
    const form = document.querySelector('form');
    
    const validateForm = (e) => {
        let isValid = true;
        
       
        document.querySelectorAll('.error-msg').forEach(el => el.remove());
        document.querySelectorAll('.is-invalid').forEach(el => {
            el.classList.remove('is-invalid');
            el.style.borderColor = "";
        });

        const isFree = document.getElementById('FreeCourse')?.checked;
        const sellingPrice = document.getElementById('SellingPrice');
        const noOfMonths = document.getElementById('Noofmonth');

       
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
            
            return false;
        }
        return true;
    };

    function showError(field, message) {
        field.classList.add('is-invalid');
        field.style.borderColor = "red";
        
        const err = document.createElement('span');
        err.className = 'error-msg';
        err.style.cssText = "color: red; font-size: 12px; display: block; margin-top: 5px; font-weight: 500;";
        err.innerText = message;
        
        field.parentElement.appendChild(err);
    }


    if (form) {
        form.addEventListener('submit', validateForm);
    }

    const continueBtn = document.querySelector('.btn-primary');
    if (continueBtn) {
        continueBtn.addEventListener('click', function(e) {
            if (!validateForm(e)) {
              
            }
        });
    }
});
