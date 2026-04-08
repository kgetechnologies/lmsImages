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

                if (isAlreadyActive) {
                    parentLi.classList.remove('active');
                } else {
                    parentLi.classList.add('active');
                }
            }
        });
    });

    if (sidebar) {
        sidebar.addEventListener('click', (e) => e.stopPropagation());
    }

    document.addEventListener('click', () => {
        if (window.innerWidth <= 991 && sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
        }
    });
});
