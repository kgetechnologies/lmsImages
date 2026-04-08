document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.querySelector('#sidebarCollapse');

    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            sidebar.classList.toggle('open');
        });
    }

    const menuLinks = document.querySelectorAll('.sidebar ul li > a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const parentLi = this.parentElement;
            const subMenu = parentLi.querySelector('ul');

            if (subMenu) {
                e.preventDefault();
                e.stopPropagation();

                const isActive = parentLi.classList.contains('active');

                document.querySelectorAll('.sidebar ul li.active').forEach(item => {
                    if (item !== parentLi) {
                        item.classList.remove('active');
                    }
                });


                parentLi.classList.toggle('active', !isActive);
            }
        });
    });

    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            const requiredFields = form.querySelectorAll('[required]');
            let firstInvalidField = null;

            requiredFields.forEach(field => {
               
                const existingError = field.parentElement.querySelector('.error-msg');
                if (existingError) existingError.remove();

                if (!field.value.trim() || field.value === "" || field.value === "Select Category") {
                    if (!firstInvalidField) firstInvalidField = field;
                    
                    field.style.borderColor = "#f64e60"; 
                    
                    const errorSpan = document.createElement('span');
                    errorSpan.className = 'error-msg';
                    errorSpan.style.cssText = "color:#f64e60; font-size:11px; display:block; margin-top:5px; font-weight:500;";
                    errorSpan.innerText = "This field is mandatory!";
                    field.parentElement.appendChild(errorSpan);
                } else {
                    field.style.borderColor = "#e2e8f0"; 
                }
            });

            if (firstInvalidField) {
                e.preventDefault();
                firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
                setTimeout(() => firstInvalidField.focus(), 500);
            }
        });

        form.querySelectorAll('input, select, textarea').forEach(input => {
            input.addEventListener('input', function() {
                if (this.value.trim() !== "") {
                    this.style.borderColor = "#e2e8f0";
                    const msg = this.parentElement.querySelector('.error-msg');
                    if (msg) msg.remove();
                }
            });
        });
    });

    document.addEventListener('click', function (e) {
        if (window.innerWidth <= 991 && sidebar && sidebar.classList.contains('open')) {
            if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
                sidebar.classList.remove('open');
            }
        }
    });
});
