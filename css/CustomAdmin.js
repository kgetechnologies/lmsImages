document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.querySelector('.sidebar-toggle'); 
    const sidebar = document.querySelector('.sidebar');

    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', function (e) {
            e.preventDefault();
            sidebar.classList.toggle('open');
        });
    }
    document.addEventListener('click', function (event) {
        if (window.innerWidth <= 991) {
            if (!sidebar.contains(event.target) && !toggleBtn.contains(event.target)) {
                sidebar.classList.remove('open');
            }
        }
    });
    const currentPath = window.location.pathname;
    const menuLinks = document.querySelectorAll('.sidebar-menu li a');
    
    menuLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.parentElement.classList.add('active');
        }
    });
});
