document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.querySelector('#sidebarCollapse');

    // 1. Sidebar Toggle
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            sidebar.classList.toggle('open');
        });
    }

    // 2. Dropdown Accordion Logic
    const menuLinks = document.querySelectorAll('.sidebar ul li > a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const parent = this.parentElement;
            const subMenu = parent.querySelector('ul');

            if (subMenu) {
                e.preventDefault();
                e.stopPropagation();
                
                if (!parent.classList.contains('active')) {
                    document.querySelectorAll('.sidebar ul li.active').forEach(el => el.classList.remove('active'));
                    parent.classList.add('active');
                } else {
                    parent.classList.remove('active');
                }
            }
        });
    });

    // 3. Form Validation Logic
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
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
                    error.style.cssText = "color: #f64e60; font-size: 11px; display: block; margin-top: 4px;";
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
    });
});
