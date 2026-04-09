document.addEventListener('DOMContentLoaded', function () {
    // 1. Sidebar Dropdown Fix (Single Click)
    const sidebarLinks = document.querySelectorAll('.sidebar .nav-item > a');
    
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const parent = this.parentElement;
            const subMenu = parent.querySelector('.sub-menu');
            
            if (subMenu) {
                e.preventDefault();
                e.stopImmediatePropagation();
                
                // Sabhi dusre menus ko band karo (Optional but clean)
                document.querySelectorAll('.nav-item').forEach(item => {
                    if (item !== parent) item.classList.remove('active');
                });

                // Current menu toggle
                parent.classList.toggle('active');
            }
        });
    });

    // 2. Form Validation (Force Red Message)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');

            requiredFields.forEach(field => {
                const container = field.parentElement;
                
                // Old errors remove
                const oldErr = container.querySelector('.error-msg');
                if (oldErr) oldErr.remove();
                field.classList.remove('is-invalid');

                // Check empty or default select
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
