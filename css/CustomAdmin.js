document.addEventListener('DOMContentLoaded', function () {
    // 1. Sidebar Sub-menu Fix (Direct Click)
    const sidebarLinks = document.querySelectorAll('.sidebar .nav-item > a');
    
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const parent = this.parentElement;
            const subMenu = parent.querySelector('.sub-menu');
            
            if (subMenu) {
                e.preventDefault();
                e.stopImmediatePropagation();
                
                // Toggle active class (issey CSS wala display:block trigger hoga)
                parent.classList.toggle('active');
            }
        });
    });

    // 2. Form Validation Logic (Red Message Injection)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');

            requiredFields.forEach(field => {
                const container = field.parentElement;
                
                // Purane errors ko saaf karo
                const oldErr = container.querySelector('.error-msg');
                if (oldErr) oldErr.remove();
                field.classList.remove('is-invalid');

                // Check empty value
                if (!field.value.trim() || field.value === "Select Category") {
                    isValid = false;
                    field.classList.add('is-invalid');

                    // Naya Red error message add karo
                    const errorSpan = document.createElement('span');
                    errorSpan.className = 'error-msg'; // Ye upar wali CSS se RED hoga
                    
                    const label = container.querySelector('label');
                    const name = label ? label.innerText.replace('*', '') : "This field";
                    errorSpan.innerText = name + " is required";
                    
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
