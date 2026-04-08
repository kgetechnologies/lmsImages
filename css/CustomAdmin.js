document.addEventListener('DOMContentLoaded', function () {
    // 1. Sidebar Toggle Logic
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.querySelector('#sidebarCollapse');
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', () => sidebar.classList.toggle('open'));
    }

    // 2. 9 Section Tab Switching (Fix for Pricing/Media/etc.)
    const tabLabels = document.querySelectorAll('.nav-tabs label');
    tabLabels.forEach(label => {
        label.addEventListener('click', function() {
            const targetId = this.getAttribute('for');
            const radio = document.getElementById(targetId) || this.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
                radio.dispatchEvent(new Event('change', { bubbles: true }));
            }
        });
    });

    // 3. SEO Goal: Form Validation for All Pages
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            let isValid = true;
            const inputs = form.querySelectorAll('[required]');

            inputs.forEach(input => {
                // Clear old errors
                const parent = input.parentElement;
                const oldErr = parent.querySelector('.error-msg');
                if (oldErr) oldErr.remove();
                input.classList.remove('is-invalid');

                // Check if empty
                if (!input.value.trim() || input.value === "Select Category") {
                    isValid = false;
                    input.classList.add('is-invalid');
                    const error = document.createElement('span');
                    error.className = 'error-msg';
                    error.innerText = "⚠ SEO Warning: This field is mandatory for page indexing!";
                    parent.appendChild(error);
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
