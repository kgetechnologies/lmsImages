document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.querySelector('#sidebarCollapse');

    // 1. Sidebar Toggle (Mobile)
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            sidebar.classList.toggle('open');
        });
    }

    // 2. Dropdown Accordion (Only one menu open at a time)
    const dropdownLinks = document.querySelectorAll('.sidebar ul li > a');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const parentLi = this.parentElement;
            const subMenu = parentLi.querySelector('ul');

            if (subMenu) {
                e.preventDefault();
                const isAlreadyActive = parentLi.classList.contains('active');

                // Close other open submenus
                document.querySelectorAll('.sidebar ul li.active').forEach(item => {
                    if (item !== parentLi) item.classList.remove('active');
                });

                parentLi.classList.toggle('active', !isAlreadyActive);
            }
        });
    });

    // 3. Form Validation Logic
    const allForms = document.querySelectorAll('form');
    allForms.forEach(form => {
        form.addEventListener('submit', function (e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                const existingError = field.parentElement.querySelector('.error-msg');
                if (existingError) existingError.remove();

                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = "#f64e60";
                    
                    const error = document.createElement('span');
                    error.className = 'error-msg';
                    error.style.cssText = "color: #f64e60; font-size: 11px; display: block; margin-top: 5px;";
                    error.innerText = "This field is required!";
                    field.parentElement.appendChild(error);
                } else {
                    field.style.borderColor = "#e2e8f0";
                }
            });

            if (!isValid) {
                e.preventDefault();
                const firstErr = form.querySelector('.error-msg');
                if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });

        // Remove error on typing
        form.querySelectorAll('input, select, textarea').forEach(input => {
            input.addEventListener('input', function() {
                if (this.value.trim() !== "") {
                    this.style.borderColor = "#e2e8f0";
                    const error = this.parentElement.querySelector('.error-msg');
                    if (error) error.remove();
                }
            });
        });
    });
});
