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

    const menuLinks = document.querySelectorAll('.sidebar ul li > a');

    menuLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const parentLi = this.parentElement;
            const subMenu = parentLi.querySelector('ul');

            if (subMenu) {
                e.preventDefault();
                e.stopPropagation();

                if (!parentLi.classList.contains('active')) {
                    document.querySelectorAll('.sidebar ul li.active').forEach(activeLi => {
                        activeLi.classList.remove('active');
                    });
                    parentLi.classList.add('active');
                } else {
                    parentLi.classList.remove('active');
                }
            }
        });
    });

    sidebar.addEventListener('click', (e) => e.stopPropagation());

    document.addEventListener('click', () => {
        if (window.innerWidth <= 991) {
            sidebar.classList.remove('open');
        }
    });
});
