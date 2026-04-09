document.addEventListener('DOMContentLoaded', function () {
    // 1. GLOBAL SIDEBAR FIX (Har dropdown ke liye)
    const allNavLinks = document.querySelectorAll('.sidebar .nav-item > a');
    
    allNavLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const parent = this.parentElement;
            const subMenu = parent.querySelector('.sub-menu');
            
            // Agar menu ke andar sub-menu hai toh hi toggle karein
            if (subMenu) {
                e.preventDefault();
                e.stopImmediatePropagation();
                
                // Pehle se khule hue dusre menus ko band karein
                document.querySelectorAll('.sidebar .nav-item').forEach(item => {
                    if (item !== parent) {
                        item.classList.remove('active');
                    }
                });

                // Ab current wale ko toggle karein
                parent.classList.toggle('active');
            }
        });
    });

    // 2. ALL PAGES VALIDATION (Global Fix)
    const allForms = document.querySelectorAll('form');
    allForms.forEach(form => {
        form.addEventListener('submit', function (e) {
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');

            requiredFields.forEach(field => {
                const container = field.parentElement;
                
                // Purane error remove karein
                const oldErr = container.querySelector('.error-msg');
                if (oldErr) {
                    oldErr.remove();
                }
                field.classList.remove('is-invalid');

                // Check empty value or default select
                if (!field.value.trim() || field.value === "Select Category" || field.value === "0") {
                    isValid = false;
                    field.classList.add('is-invalid');

                    const errorSpan = document.createElement('span');
                    errorSpan.className = 'error-msg';
                    
                    const label = container.querySelector('label');
                    const fieldName = label ? label.innerText.replace('*', '').trim() : "Field";
                    errorSpan.innerText = fieldName + " is required";
                    
                    container.appendChild(errorSpan);
                }
            });

            if (!isValid) {
                e.preventDefault();
                const firstErr = form.querySelector('.is-invalid');
                if (firstErr) {
                    firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    });
});
