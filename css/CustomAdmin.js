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
});
