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

    // 2. Tab Click Fix (For 9 Sections)
    // Hum har tab ke andar jo dabba (radio button) hai use force click karenge
    const tabLabels = document.querySelectorAll('.nav-tabs label, .nav-tabs input[type="radio"]');
    
    tabLabels.forEach(tab => {
        tab.style.cursor = "pointer"; // Cursor pointer dikhega
        tab.addEventListener('click', function (e) {
            // Agar label par click hua hai, toh uske andar ke radio button ko check kardo
            const radio = this.tagName === 'INPUT' ? this : this.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
                // Form ko batane ke liye ki tab badal gaya hai (agar zaroorat ho)
                radio.dispatchEvent(new Event('change', { bubbles: true }));
            }
            console.log("Tab switched!");
        });
    });

    // 3. Form Validation (Vishal's SEO Requirement)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');

            requiredFields.forEach(field => {
                const oldMsg = field.parentElement.querySelector('.error-msg');
                if (oldMsg) oldMsg.remove();

                if (!field.value.trim() || field.value === "Select Category") {
                    isValid = false;
                    field.style.borderColor = "#f64e60";
                    const span = document.createElement('span');
                    span.className = 'error-msg';
                    span.style.cssText = "color:#f64e60; font-size:11px; display:block; margin-top:5px; font-weight:500;";
                    span.innerText = "This content is required for SEO fixing!";
                    field.parentElement.appendChild(span);
                } else {
                    field.style.borderColor = "#e2e8f0";
                }
            });

            if (!isValid) {
                e.preventDefault();
                const firstInvalid = form.querySelector('.error-msg');
                if (firstInvalid) firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });
});
