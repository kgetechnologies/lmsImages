document.addEventListener('DOMContentLoaded', function () {
    // 1. Sidebar Fix (1-Click Dropdown)
    const navLinks = document.querySelectorAll('.nav-item > a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const parent = this.parentElement;
            const subMenu = parent.querySelector('.sub-menu');
            
            if (subMenu) {
                e.preventDefault();
                e.stopImmediatePropagation(); 
                
                // Toggle sirf current menu ko
                parent.classList.toggle('active');
            }
        });
    });

    // 2. Form Validation Fix (Red Message)
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

                if (!input.value.trim() || input.value === "Select Category") {
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
