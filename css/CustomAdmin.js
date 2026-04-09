document.addEventListener('DOMContentLoaded', function () {
    // Sidebar Dropdown 1-Click Fix
    const allLinks = document.querySelectorAll('.sidebar .nav-item > a');
    
    allLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const parent = this.parentElement;
            const subMenu = parent.querySelector('.sub-menu');
            
            if (subMenu) {
                e.preventDefault();
                e.stopImmediatePropagation();
                
                // Toggle active class
                parent.classList.toggle('active');

                // Baaki khule hue menus band karne ke liye
                document.querySelectorAll('.sidebar .nav-item').forEach(item => {
                    if (item !== parent) item.classList.remove('active');
                });
            }
        });
    });

    // Form Validation (Red Error Injected)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            let isValid = true;
            const inputs = form.querySelectorAll('[required]');

            inputs.forEach(input => {
                const parent = input.parentElement;
                const oldErr = parent.querySelector('.error-msg');
                if (oldErr) oldErr.remove();
                input.classList.remove('is-invalid');

                if (!input.value.trim() || input.value === "Select Category" || input.value === "0") {
                    isValid = false;
                    input.classList.add('is-invalid');
                    const error = document.createElement('span');
                    error.className = 'error-msg';
                    error.innerText = "This field is required";
                    parent.appendChild(error);
                }
            });

            if (!isValid) e.preventDefault();
        });
    });
});
