document.addEventListener('DOMContentLoaded', function () {
    // 1. GLOBAL SIDEBAR (Single Click Fix for All Items)
    const allNavLinks = document.querySelectorAll('.sidebar .nav-item > a');
    
    allNavLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const parent = this.parentElement;
            const subMenu = parent.querySelector('.sub-menu');
            
            if (subMenu) {
                // Bootstrap ke default action ko rokne ke liye
                e.preventDefault();
                e.stopImmediatePropagation(); 
                
                // Toggle active class (Issey hamari CSS trigger hogi)
                parent.classList.toggle('active');

                // Baaki menus band karne ke liye (Optional)
                document.querySelectorAll('.sidebar .nav-item').forEach(item => {
                    if (item !== parent) item.classList.remove('active');
                });
            }
        });
    });

    // 2. UNIVERSAL FORM VALIDATION (For All Pages & Next Items)
    const allForms = document.querySelectorAll('form');
    allForms.forEach(form => {
        form.addEventListener('submit', function (e) {
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');

            requiredFields.forEach(field => {
                const container = field.parentElement;
                
                // Purane custom errors saaf karein
                const oldErr = container.querySelector('.error-msg');
                if (oldErr) oldErr.remove();
                field.classList.remove('is-invalid');

                // Validation Logic
                if (!field.value.trim() || field.value === "Select Category" || field.value === "0") {
                    isValid = false;
                    field.classList.add('is-invalid');

                    const errorSpan = document.createElement('span');
                    errorSpan.className = 'error-msg'; 
                    
                    const label = container.querySelector('label');
                    const fieldName = label ? label.innerText.replace('*', '').trim() : "This field";
                    errorSpan.innerText = fieldName + " is required";
                    
                    container.appendChild(errorSpan);
                }
            });

            if (!isValid) {
                e.preventDefault();
                const firstErr = form.querySelector('.is-invalid');
                if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });
});
