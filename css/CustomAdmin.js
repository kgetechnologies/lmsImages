document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.querySelector('#sidebarCollapse');

    // 1. Sidebar Toggle Fix
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            sidebar.classList.toggle('open');
        });
    }

    // 2. Sidebar Dropdown Accordion
    const menuLinks = document.querySelectorAll('.sidebar ul li > a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const parent = this.parentElement;
            if (parent.querySelector('ul')) {
                e.preventDefault();
                document.querySelectorAll('.sidebar ul li.active').forEach(active => {
                    if (active !== parent) active.classList.remove('active');
                });
                parent.classList.toggle('active');
            }
        });
    });

    // 3. 9-Section Tab Click Trigger
    // Ye Pricing aur Requirements wale tabs ko force-click karega
    const tabLabels = document.querySelectorAll('.nav-tabs label');
    tabLabels.forEach(label => {
        label.addEventListener('click', function () {
            const radio = document.getElementById(this.getAttribute('for')) || this.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
                radio.dispatchEvent(new Event('change', { bubbles: true }));
            }
        });
    });

    // 4. Final Validation & SEO Check
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required], .seo-field');

            requiredFields.forEach(field => {
                const oldMsg = field.parentElement.querySelector('.error-msg');
                if (oldMsg) oldMsg.remove();
                field.classList.remove('is-invalid');

                if (!field.value.trim() || field.value === "Select Category") {
                    isValid = false;
                    field.classList.add('is-invalid');
                    const span = document.createElement('span');
                    span.className = 'error-msg';
                    span.innerText = "This content is required for SEO fixing!";
                    field.parentElement.appendChild(span);
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
