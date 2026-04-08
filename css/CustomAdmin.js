document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.querySelector('#sidebarCollapse');

    // --- 1. Sidebar Toggle (Mobile & Desktop) ---
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            sidebar.classList.toggle('open');
        });
    }

    // --- 2. Accordion Dropdown Logic ---
    const dropdownLinks = document.querySelectorAll('.sidebar ul li > a');

    dropdownLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const parentLi = this.parentElement;
            const subMenu = parentLi.querySelector('ul');

            if (subMenu) {
                e.preventDefault();
                e.stopPropagation();

                const isAlreadyActive = parentLi.classList.contains('active');

                // Close other open submenus
                document.querySelectorAll('.sidebar ul li.active').forEach(activeItem => {
                    if (activeItem !== parentLi) {
                        activeItem.classList.remove('active');
                    }
                });

                // Toggle current menu
                parentLi.classList.toggle('active', !isAlreadyActive);
            }
        });
    });

    // --- 3. Close Sidebar on Outside Click (Mobile Only) ---
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 991 && sidebar && sidebar.classList.contains('open')) {
            if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
                sidebar.classList.remove('open');
            }
        }
    });

    // --- 4. Global Form Validation ---
    // Har form par validation apply karne ke liye
    const allForms = document.querySelectorAll('form');

    allForms.forEach(form => {
        form.addEventListener('submit', function (e) {
            const inputsToCheck = form.querySelectorAll('input[required], select[required], textarea[required]');
            let isValid = true;

            inputsToCheck.forEach(input => {
                // Purane error messages hatane ke liye
                const existingError = input.parentElement.querySelector('.error-msg');
                if (existingError) existingError.remove();

                if (input.value.trim() === "") {
                    isValid = false;
                    input.style.borderColor = "#f64e60"; // Red color for error

                    // Error message create karna
                    const error = document.createElement('span');
                    error.className = 'error-msg';
                    error.style.color = "#f64e60";
                    error.style.fontSize = "11px";
                    error.style.display = "block";
                    error.style.marginTop = "4px";
                    error.innerText = "This field is required!";
                    input.parentElement.appendChild(error);
                } else {
                    input.style.borderColor = "#e2e8f0"; // Reset to normal
                }
            });

            if (!isValid) {
                e.preventDefault(); // Form submit hone se rokna
                // Pehle missing field par focus le jana
                const firstError = form.querySelector('.error-msg');
                if (firstError) firstError.parentElement.scrollIntoView({ behavior: 'smooth' });
            }
        });

        // Input karte hi error hatane ka logic
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
