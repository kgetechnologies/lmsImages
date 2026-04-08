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

    // 2. Multi-Level Menu Accordion
    const menuItems = document.querySelectorAll('.sidebar ul li > a');
    menuItems.forEach(link => {
        link.addEventListener('click', function (e) {
            const parent = this.parentElement;
            if (parent.querySelector('ul')) {
                e.preventDefault();
                document.querySelectorAll('.sidebar ul li.active').forEach(item => {
                    if (item !== parent) item.classList.remove('active');
                });
                parent.classList.toggle('active');
            }
        });
    });

    // 3. 9-Section Tab Switcher (Pricing, Requirements, etc.)
    const labels = document.querySelectorAll('.nav-tabs label');
    labels.forEach(label => {
        label.addEventListener('click', function() {
            // Hum label ke peeche wale radio ko trigger karenge
            const radioId = this.getAttribute('for');
            const radio = document.getElementById(radioId);
            if(radio) {
                radio.checked = true;
                // Form ko refresh ya section change ka signal bhejna
                radio.dispatchEvent(new Event('change', { bubbles: true }));
                console.log("Section changed to: " + this.innerText.trim());
            }
        });
    });

    // 4. SEO & Field Validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            let isValid = true;
            const requireds = form.querySelectorAll('[required]');

            requireds.forEach(field => {
                const oldMsg = field.parentElement.querySelector('.error-msg');
                if (oldMsg) oldMsg.remove();
                field.classList.remove('is-invalid');

                if (!field.value.trim() || field.value === "Select Category") {
                    isValid = false;
                    field.classList.add('is-invalid');
                    const span = document.createElement('span');
                    span.className = 'error-msg';
                    span.innerText = "Mandatory for SEO fixing!";
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
