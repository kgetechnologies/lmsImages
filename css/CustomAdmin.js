document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.querySelector('#sidebarCollapse'); /
    const body = document.querySelector('body');

    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            sidebar.classList.toggle('open');
            body.classList.toggle('sidebar-open');
        });

        document.addEventListener('click', function (e) {
            if (window.innerWidth <= 991) {
                if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
                    sidebar.classList.remove('open');
                    body.classList.remove('sidebar-open');
                }
            }
        });

        sidebar.addEventListener('click', function (e) {
            e.stopPropagation();
        });
    }
});
