document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.querySelector('#sidebarCollapse');

    // 1. Universal Sidebar Toggle
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            sidebar.classList.toggle('open');
        });
    }

    // 2. Multi-Level Menu Accordion
    const dropdowns = document.querySelectorAll('.sidebar ul li > a');
    dropdowns.forEach(link => {
        link.addEventListener('click', function (e) {
            const parent = this.parentElement;
            if (parent.querySelector('ul')) {
                e.preventDefault();
                // Close others
                document.querySelectorAll('.sidebar ul li.active').forEach(active => {
                    if (active !== parent) active.classList.remove('active');
                });
                parent.classList.toggle('active');
            }
        });
    });

    // 3. 9-Section Validation (For New Course Page)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            let isValid = true;
            const requireds = form.querySelectorAll('[required]');

            requireds.forEach(field => {
                const oldMsg = field.parentElement.querySelector('.error-msg');
                if (oldMsg) oldMsg.remove();

                if (!field.value.trim() || field.value === "Select Category") {
                    isValid = false;
                    field.style.borderColor = "#f64e60";
                    const span = document.createElement('span');
                    span.className = 'error-msg';
                    span.innerText = "This field is mandatory for SEO!";
                    field.parentElement.appendChild(span);
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
