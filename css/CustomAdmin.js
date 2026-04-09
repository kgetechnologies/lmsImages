document.addEventListener('DOMContentLoaded', function () {
    
    const handleSidebar = () => {
        const sidebarLinks = document.querySelectorAll('.sidebar .nav-item > a');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                const parent = this.parentElement;
                const subMenu = parent.querySelector('.sub-menu');
                if (subMenu) {
                    e.preventDefault();
                   
                    document.querySelectorAll('.sidebar .nav-item').forEach(item => {
                        if (item !== parent) item.classList.remove('active');
                    });
                    parent.classList.toggle('active');
                }
            });
        });
    };

    
    const validateAllSections = (e) => {
        let isValid = true;
        
       
        document.querySelectorAll('.error-msg').forEach(el => el.remove());
        document.querySelectorAll('.is-invalid').forEach(el => {
            el.classList.remove('is-invalid');
            el.style.borderColor = "#dee2e6"; 
        });

        const isFree = document.getElementById('FreeCourse')?.checked;
        const sellingPrice = document.getElementById('SellingPrice');
        const noOfMonths = document.getElementById('Noofmonth');

        if (!isFree) {
            if (sellingPrice && (!sellingPrice.value.trim() || sellingPrice.value == "0")) {
                showError(sellingPrice, "Selling price is required for paid courses");
                isValid = false;
            }
            if (noOfMonths && (!noOfMonths.value.trim() || noOfMonths.value == "0")) {
                showError(noOfMonths, "Please specify validity duration");
                isValid = false;
            }
        }

        const requiredFields = document.querySelectorAll('input[required], select[required], textarea[required]');
        requiredFields.forEach(field => {
            if (!field.value.trim() || field.value === "Select Category") {
                showError(field, "This information is mandatory");
                isValid = false;
            }
        });

      
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
      
        if (!field.parentElement.querySelector('.error-msg')) {
            field.parentElement.appendChild(err);
        }
    }

    handleSidebar();

    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', validateAllSections);
    }

  
    const continueBtn = document.querySelector('.btn-primary, #continue-btn'); 
    if (continueBtn) {
        continueBtn.addEventListener('click', function(e) {
            if (!validateAllSections(e)) {
                console.log("Validation Failed - Blocking Redirect");
            }
        });
    }


    const pageTitle = document.querySelector('h1, h2')?.innerText || "Dashboard";
    document.title = `${pageTitle} | KGE Technologies Admin`;
});
