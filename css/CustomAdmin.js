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


    const dropdownLinks = document.querySelectorAll('.sidebar ul li > a');

    dropdownLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const parentLi = this.parentElement;
            const subMenu = parentLi.querySelector('ul');

            if (subMenu) {
                e.preventDefault();
                e.stopPropagation();

                const isAlreadyActive = parentLi.classList.contains('active');

                document.querySelectorAll('.sidebar ul li.active').forEach(activeItem => {
                    if (activeItem !== parentLi) {
                        activeItem.classList.remove('active');
                    }
                });

                parentLi.classList.toggle('active', !isAlreadyActive);
            }
        });
    });

    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 991 && sidebar && sidebar.classList.contains('open')) {
            if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
                sidebar.classList.remove('open');
            }
        }
    });

    const allForms = document.querySelectorAll('form');

    allForms.forEach(form => {
        form.addEventListener('submit', function (e) {
            const inputsToCheck = form.querySelectorAll('input[required], select[required], textarea[required]');
            let isValid = true;

            inputsToCheck.forEach(input => {
                const existingError = input.parentElement.querySelector('.error-msg');
                if (existingError) existingError.remove();

                if (input.value.trim() === "") {
                    isValid = false;
                    input.style.borderColor = "#f64e60"; 
                    
                    const error = document.createElement('span');
                    error.className = 'error-msg';
                    error.style.color = "#f64e60";
                    error.style.fontSize = "11px";
                    error.style.display = "block";
                    error.style.marginTop = "4px";
                    error.innerText = "This field is required!";
                    input.parentElement.appendChild(error);
                } else {
                    input.style.borderColor = "#e2e8f0"; 
                }
            });

            if (!isValid) {
                e.preventDefault(); 
                const firstError = form.querySelector('.error-msg');
                if (firstError) firstError.parentElement.scrollIntoView({ behavior: 'smooth' });
            }
        });

        form.querySelectorAll('input, select, textarea').forEach(input => {
            input.addEventListener('input', function() {
                if (this.value.trim() !== "") {
                    this.style.borderColor = "#e2e8f0";
                    const error = this.parentElement.querySelector('.error-msg');
                    if (error) error.remove();
                }
            });
        });
    });
});
