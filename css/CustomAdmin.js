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
            form.querySelectorAll('[required]').forEach(field => {
                const container = field.parentElement;
                const oldErr = container.querySelector('.error-msg');
                if (oldErr) oldErr.remove();
                field.classList.remove('is-invalid');
                if (!field.value.trim() || field.value === "Select Category" || field.value === "0") {
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
