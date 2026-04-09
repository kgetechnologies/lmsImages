document.addEventListener('DOMContentLoaded', function () {
    // 1. Sidebar Toggle Fix
    document.querySelectorAll('.sidebar .nav-item > a').forEach(link => {
        link.addEventListener('click', function (e) {
            const parent = this.parentElement;
            if (parent.querySelector('.sub-menu')) {
                e.preventDefault();
                e.stopImmediatePropagation();
                parent.classList.toggle('active');
            }
        });
    });

    // 2. All Pages Validation
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function (e) {
            let isValid = true;
            form.querySelectorAll('[required]').forEach(field => {
                const container = field.parentElement;
                if (container.querySelector('.error-msg')) container.querySelector('.error-msg').remove();
                
                if (!field.value.trim() || field.value === "Select Category") {
                    isValid = false;
                    field.classList.add('is-invalid');
                    const err = document.createElement('span');
                    err.className = 'error-msg';
                    err.innerText = "This field is required";
                    container.appendChild(err);
                }
            });
            if (!isValid) e.preventDefault();
        });
    });
});
