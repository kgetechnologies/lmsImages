document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.querySelector('#sidebarCollapse');

    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
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
     
                document.querySelectorAll('.sidebar ul li.active').forEach(item => {
                    if (item !== parentLi) item.classList.remove('active');
                });
                parentLi.classList.toggle('active');
            }
        });
    });


    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');

            requiredFields.forEach(field => {
                const oldMsg = field.parentElement.querySelector('.error-msg');
                if (oldMsg) oldMsg.remove();
                field.classList.remove('is-invalid');

                if (!field.value.trim() || field.value === "Select Category") {
                    isValid = false;
                    field.classList.add('is-invalid');
                    const error = document.createElement('span');
                    error.className = 'error-msg';
                    error.innerText = "This content is required for SEO!";
                    field.parentElement.appendChild(error);
                }
            });

            if (!isValid) {
                e.preventDefault();
                const firstInvalid = form.querySelector('.is-invalid');
                if (firstInvalid) firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });
});
