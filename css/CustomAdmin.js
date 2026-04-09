document.addEventListener('DOMContentLoaded', function () {
    
   
    const handleSidebar = () => {
        const sidebarLinks = document.querySelectorAll('.sidebar .nav-item > a');
        sidebarLinks.forEach(link => {
            link.onclick = function (e) {
                const parent = this.parentElement;
                const subMenu = parent.querySelector('.sub-menu');
                if (subMenu) {
                    e.preventDefault();
                    parent.classList.toggle('active');
                }
            };
        });
    };

   
    const updateSEO = () => {
        const activeSection = document.querySelector('.add-course-info.active h4, .card-header h4, h1, h2');
        const sectionName = activeSection ? activeSection.innerText : "Course Management";
        
    
        document.title = `${sectionName} | KGE Technologies`;

      
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.name = "description";
            document.head.appendChild(metaDesc);
        }
        metaDesc.content = `Manage your ${sectionName} on KGE Technologies platform. Professional course creation tools.`;
    };

   
    const applyValidation = () => {
        const continueBtn = document.querySelector('.btn-primary, #continue-btn');
        if (!continueBtn) return;

        continueBtn.onclick = function (e) {
            let isValid = true;
            document.querySelectorAll('.error-msg').forEach(el => el.remove());

            const isFree = document.getElementById('FreeCourse')?.checked;
            const sellingPrice = document.getElementById('SellingPrice');
            const noOfMonths = document.getElementById('Noofmonth');

          
            if (sellingPrice || noOfMonths) {
                if (!isFree) {
                    if (!sellingPrice?.value || sellingPrice.value == "0") {
                        showError(sellingPrice, "Course price is mandatory");
                        isValid = false;
                    }
                    if (!noOfMonths?.value || noOfMonths.value == "0") {
                        showError(noOfMonths, "Course duration is mandatory");
                        isValid = false;
                    }
                }
            }

            if (!isValid) {
                e.preventDefault();
                e.stopImmediatePropagation();
                return false;
            }
        };
    };

    function showError(field, msg) {
        if (!field) return;
        field.style.border = "1px solid red";
        const error = document.createElement('div');
        error.className = 'error-msg';
        error.style.cssText = "color: red; font-size: 12px; margin-top: 5px;";
        error.innerText = msg;
        field.parentElement.appendChild(error);
    }

  
    const observer = new MutationObserver(() => {
        handleSidebar();
        updateSEO();
        applyValidation();
    });

    observer.observe(document.body, { childList: true, subtree: true });

  
    handleSidebar();
    updateSEO();
    applyValidation();
});
