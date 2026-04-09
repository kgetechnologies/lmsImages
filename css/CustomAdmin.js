document.addEventListener('DOMContentLoaded', function () {
    const sidebarLinks = document.querySelectorAll('.sidebar .nav-item > a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const parent = this.parentElement;
            const subMenu = parent.querySelector('.sub-menu');
            if (subMenu) {
                e.preventDefault();
                e.stopImmediatePropagation();
                parent.classList.toggle('active');
                document.querySelectorAll('.sidebar .nav-item').forEach(item => {
                    if (item !== parent) item.classList.remove('active');
                });
            }
        });
    });

    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function (e) {
            let isValid = true;
            
            // 1. Pehle generic required fields check karein
            form.querySelectorAll('[required]').forEach(field => {
                validateField(field);
            });

            // 2. Pricing Specific Validation (Custom logic for Selling Price & Months)
            const isFree = document.getElementById('FreeCourse')?.checked;
            const sellingPrice = document.getElementById('SellingPrice');
            const noOfMonths = document.getElementById('Noofmonth');

            if (!isFree) {
                // Agar free nahi hai toh Selling Price check karo
                if (sellingPrice && (!sellingPrice.value.trim() || sellingPrice.value === "0")) {
                    validateField(sellingPrice, "Selling price is required");
                    isValid = false;
                }
                // Duration check karo
                if (noOfMonths && (!noOfMonths.value.trim() || noOfMonths.value === "0")) {
                    validateField(noOfMonths, "Please enter duration");
                    isValid = false;
                }
            }

            // Helper function to show/hide errors (Consistency ke liye)
            function validateField(field, customMsg) {
                const container = field.parentElement;
                const oldErr = container.querySelector('.error-msg');
                if (oldErr) oldErr.remove();
                field.classList.remove('is-invalid');

                if (!field.value.trim() || field.value === "Select Category" || field.value === "0") {
                    isValid = false;
                    field.classList.add('is-invalid');
                    const err = document.createElement('span');
                    err.className = 'error-msg';
                    err.style.color = 'red'; // Ensuring red text
                    err.style.fontSize = '12px';
                    err.innerText = customMsg || "This field is required";
                    container.appendChild(err);
                }
            }

            if (!isValid) {
                e.preventDefault();
                // Scroll to the first error so user can see it
                const firstError = form.querySelector('.is-invalid');
                if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });
});
