document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.querySelector('#sidebarCollapse');

    if (toggleBtn) {
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
        if (window.innerWidth <= 991 && !sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
            sidebar.classList.remove('open');
        }
    });

    const submitBtn = document.querySelector('button[type="submit"]') || document.querySelector('.btn-primary');

    if (submitBtn) {
        submitBtn.addEventListener('click', function (e) {
            const inputsToCheck = document.querySelectorAll('input, select, textarea');
            let isValid = true;

            inputsToCheck.forEach(input => {
                const existingError = input.parentElement.querySelector('.error-msg');
                if (existingError) existingError.remove();

                if (input.hasAttribute('required') && input.value.trim() === "") {
                    isValid = false;
                    input.style.borderColor = "#f64e60"; 

                    const error = document.createElement('span');
                    error.className = 'error-msg';
                    error.innerText = "This field is required!";
                    input.parentElement.appendChild(error);
                } else {
                    input.style.borderColor = "#2d2d3f"; 
                }
            });

            if (!isValid) {
                e.preventDefault(); 
                alert("Please fill all required fields.");
            }
        });
    }
});
