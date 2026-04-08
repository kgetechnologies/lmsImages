document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.querySelector('#sidebarCollapse');

    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', function (e) {
            e.preventDefault();
            sidebar.classList.toggle('open');
        });
    }

    const dropdowns = document.querySelectorAll('.sidebar ul li > a');
    dropdowns.forEach(link => {
        link.addEventListener('click', function (e) {
            const parent = this.parentElement;
            const subMenu = parent.querySelector('ul');

            if (subMenu) {
                e.preventDefault();
                const isActive = parent.classList.contains('active');
                
                document.querySelectorAll('.sidebar ul li.active').forEach(activeItem => {
                    if (activeItem !== parent) activeItem.classList.remove('active');
                });

                parent.classList.toggle('active', !isActive);
            }
        });
    });

    const allForms = document.querySelectorAll('form');
    allForms.forEach(form => {
        form.addEventListener('submit', function (e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                const error = field.parentElement.querySelector('.error-msg');
                if (error) error.remove();

                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = "#f64e60";
                    
                    const msg = document.createElement('span');
                    msg.className = 'error-msg';
                    msg.style.cssText = "color: #f64e60; font-size: 11px; margin-top: 5px; display: block;";
                    msg.innerText = "This field is required!";
                    field.parentElement.appendChild(msg);
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
