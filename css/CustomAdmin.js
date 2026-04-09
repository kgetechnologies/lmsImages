document.addEventListener('DOMContentLoaded', function () {
    // 1. Sidebar Dropdown Fix (Single Click)
    const navLinks = document.querySelectorAll('.nav-item > a');
    
    navLinks.forEach(link => {
        link.onclick = function (e) {
            const parent = this.parentElement;
            const subMenu = parent.querySelector('.sub-menu');
            
            if (subMenu) {
                e.preventDefault();
                // Toggle 'active' class
                parent.classList.toggle('active');
            }
        };
    });

    // 2. Form Validation Fix (Red Error Message)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.onsubmit = function (e) {
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
                    
                    // Specific logic for label text
                    const label = parent.querySelector('label');
                    const labelName = label ? label.innerText.replace('*', '') : "This field";
                    error.innerText = labelName + " is required";
                    
                    parent.appendChild(error);
                }
            });

            if (!isValid) {
                e.preventDefault();
                const firstErr = form.querySelector('.is-invalid');
                if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        };
    });
});
