document.addEventListener('DOMContentLoaded', function () {
    // 1. Sidebar Toggle (Mobile View)
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.querySelector('#sidebarCollapse');
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', () => sidebar.classList.toggle('open'));
    }

    // 2. FIX: Sidebar Sub-menu (Single Click Fix)
    // Isse sub-menu 1-click pe hi khulega
    const menuItems = document.querySelectorAll('.nav-item');
    menuItems.forEach(item => {
        const link = item.querySelector('a');
        if (link) {
            link.addEventListener('click', function(e) {
                const subMenu = item.querySelector('.sub-menu');
                if (subMenu) {
                    e.preventDefault(); 
                    // Baki sabhi open menus ko band karne ke liye (Optional)
                    menuItems.forEach(otherItem => {
                        if (otherItem !== item) otherItem.classList.remove('active');
                    });
                    // Current menu ko toggle karein
                    item.classList.toggle('active');
                }
            });
        }
    });

    // 3. Tab Labels Selection Fix
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

    // 4. FIX: Course Add Form Validation (Error Message in Red)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            let isValid = true;
            const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');

            inputs.forEach(input => {
                const parent = input.parentElement;
                
                // Purane error messages ko remove karein
                const oldErr = parent.querySelector('.error-msg');
                if (oldErr) oldErr.remove();
                input.classList.remove('is-invalid');

                // Validation Check: Khali field ya default "Select" value
                if (!input.value.trim() || input.value === "Select Category" || input.value === "0") {
                    isValid = false;
                    input.classList.add('is-invalid'); // CSS mein border red ho jayega

                    // Naya error message create karein
                    const error = document.createElement('span');
                    error.className = 'error-msg'; // Ye class aapki CSS se RED dikhegi
                    
                    // Field ke naam ke sath message
                    const label = parent.querySelector('label');
                    const fieldName = label ? label.innerText.replace(':', '') : "This field";
                    error.innerText = fieldName + " is required";
                    
                    parent.appendChild(error);
                }
            });

            if (!isValid) {
                e.preventDefault(); // Form submit hone se rokein
                // Pehle error wale field par scroll karein
                const firstErr = form.querySelector('.is-invalid');
                if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });
});
