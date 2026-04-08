document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.querySelector('#sidebarCollapse');

    // 1. Sidebar Mobile Toggle
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            sidebar.classList.toggle('open');
        });
    }

    // 2. Sidebar Dropdown Accordion
    const dropdowns = document.querySelectorAll('.sidebar ul li > a');
    dropdowns.forEach(link => {
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

    // 3. Tab Navigation Fix (Pricing & Requirements Sections)
    // Ye code tabs ko force-click karega agar wo normal click nahi ho rahe
    const tabs = document.querySelectorAll('.nav-tabs .nav-link, .nav-tabs input[type="radio"]');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // UI Update: Active class change
            document.querySelectorAll('.nav-tabs .nav-link').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Note: Agar ye backend tabs hain, toh ye trigger logic browser ko naye section par le jayega
            console.log("Section Changed to: " + this.innerText);
        });
    });

    // 4. Form Validation & SEO Check (For All 9 Sections)
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
                    span.style.cssText = "color:#f64e60; font-size:11px; display:block; margin-top:5px;";
                    span.innerText = "This content is required for SEO & proper fixing!";
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
