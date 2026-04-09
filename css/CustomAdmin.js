document.addEventListener('DOMContentLoaded', function () {
    // 1. GLOBAL SIDEBAR (Fix for All Dropdowns)
    const sidebarLinks = document.querySelectorAll('.sidebar .nav-item > a');
    
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const parent = this.parentElement;
            const subMenu = parent.querySelector('.sub-menu');
            
            if (subMenu) {
                e.preventDefault();
                e.stopImmediatePropagation(); // Bootstrap override
                
                // Toggle current menu
                parent.classList.toggle('active');

                // Baaki menus ko band karne ke liye (Sleek look)
                document.querySelectorAll('.sidebar .nav-item').forEach(item => {
                    if (item !== parent) item.classList.remove('active');
                });
            }
        });
    });

    // 2. UNIVERSAL VALIDATION (For All Pages)
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function (e) {
            let isValid = true;
            form.querySelectorAll('[required]').forEach(field => {
                const container = field.parentElement;
                
                // Remove existing custom error
                const oldErr = container.querySelector('.error-msg');
                if (oldErr) oldErr.remove();
                field.classList.remove('is-invalid');

                // Check empty or default value
                if (!field.value.trim() || field.value === "Select Category" || field.value === "0") {
                    isValid = false;
                    field.classList.add('is-invalid');
                    
                    const err = document.createElement('span');
                    err.className = 'error-msg';
                    err.innerText = "This field is required";
                    container.appendChild(err);
                }
            });
            if (!isValid) e.preventDefault();
        });
    });
});
