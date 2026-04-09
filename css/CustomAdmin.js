document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.querySelector('#sidebarCollapse');
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', () => sidebar.classList.toggle('open'));
    }

    const navLinks = document.querySelectorAll('.nav-item > a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const parent = this.parentElement;
            const hasSubMenu = parent.querySelector('.sub-menu');
            
            if (hasSubMenu) {
                e.preventDefault();
                document.querySelectorAll('.nav-item').forEach(item => {
                    if (item !== parent) item.classList.remove('active');
                });
                parent.classList.toggle('active');
            }
        });
    });
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            let isValid = true;
            const inputs = form.querySelectorAll('[required]');

            inputs.forEach(input => {
                const parent = input.parentElement;
                const oldErr = parent.querySelector('.error-msg');
                if (oldErr) oldErr.remove();
                input.classList.remove('is-invalid');

                if (!input.value.trim() || input.value === "Select Category") {
                    isValid = false;
                    input.classList.add('is-invalid');
                    
                    const error = document.createElement('span');
                    error.className = 'error-msg';
                    const labelText = parent.querySelector('label') ? parent.querySelector('label').innerText : "This field";
                    error.innerText = labelText.replace('*', '').trim() + " is required";
                    
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
