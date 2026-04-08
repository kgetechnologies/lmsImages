document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.querySelector('#sidebarCollapse');

    // 1. Sidebar Toggle (Mobile)
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            sidebar.classList.toggle('open');
        });
    }

    // 2. Dropdown Accordion Fix (Courses, Quizzes etc.)
    const menuItems = document.querySelectorAll('.sidebar ul li > a');
    menuItems.forEach(item => {
        item.addEventListener('click', function (e) {
            const parent = this.parentElement;
            const hasSubmenu = parent.querySelector('ul');

            if (hasSubmenu) {
                e.preventDefault();
                e.stopPropagation();

                const alreadyActive = parent.classList.contains('active');

                // Dusre menus band karo
                document.querySelectorAll('.sidebar ul li.active').forEach(active => {
                    if (active !== parent) active.classList.remove('active');
                });

                // Current menu toggle karo
                parent.classList.toggle('active', !alreadyActive);
            }
        });
    });

    // 3. Form Validation logic
    const allForms = document.querySelectorAll('form');
    allForms.forEach(form => {
        form.addEventListener('submit', function (e) {
            const requireds = form.querySelectorAll('[required]');
            let isValid = true;

            requireds.forEach(field => {
                const oldErr = field.parentElement.querySelector('.error-msg');
                if (oldErr) oldErr.remove();

                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = "#f64e60";
                    const err = document.createElement('span');
                    err.className = 'error-msg';
                    err.style.cssText = "color:#f64e60; font-size:11px; display:block; margin-top:5px;";
                    err.innerText = "Required field!";
                    field.parentElement.appendChild(err);
                } else {
                    field.style.borderColor = "#e2e8f0";
                }
            });

            if (!isValid) {
                e.preventDefault();
                const first = form.querySelector('.error-msg');
                if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });
});
