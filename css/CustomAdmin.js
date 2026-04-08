document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.querySelector('#sidebarCollapse'); // Make sure this ID is correct in HTML
    const body = document.querySelector('body');

    if (toggleBtn) {
        toggleBtn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            sidebar.classList.toggle('open');
            body.classList.toggle('sidebar-open');
        });
    }

    const menuItems = document.querySelectorAll('.sidebar ul li > a');

    menuItems.forEach(item => {
        item.addEventListener('click', function (e) {
            const parentLi = this.parentElement;
            const subMenu = parentLi.querySelector('ul');

            if (subMenu) {
                e.preventDefault();
                e.stopPropagation(); 

                parentLi.classList.toggle('active');

                const siblings = parentLi.parentElement.children;
                Array.from(siblings).forEach(sibling => {
                    if (sibling !== parentLi) {
                        sibling.classList.remove('active');
                    }
                });
            }
        });
    });

    if (sidebar) {
        sidebar.addEventListener('click', function (e) {
            e.stopPropagation();
        });
    }

    document.addEventListener('click', function (e) {
        if (window.innerWidth <= 991) {
            if (sidebar.classList.contains('open') && !sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
                sidebar.classList.remove('open');
                body.classList.remove('sidebar-open');
            }
        }
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth > 991) {
            sidebar.classList.remove('open');
            body.classList.remove('sidebar-open');
        }
    });
});
