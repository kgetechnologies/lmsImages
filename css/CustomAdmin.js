document.addEventListener("DOMContentLoaded", function() {
    console.log("CustomAdmin.js is Loaded and Working!");
    
    const menuLinks = document.querySelectorAll(".sidebar ul li > a");

    menuLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            const parentLi = this.parentElement;
            const hasSubmenu = parentLi.querySelector("ul");

            if (hasSubmenu) {
                e.preventDefault();
                document.querySelectorAll(".sidebar ul li").forEach(li => {
                    if (li !== parentLi) li.classList.remove("active");
                });
                parentLi.classList.toggle("active");
                console.log("Menu Toggled:", this.innerText.trim());
            }
        });
    });
    function checkWidth() {
        const sidebar = document.querySelector(".sidebar");
        if (sidebar) {
            if (window.innerWidth <= 991) {
                sidebar.classList.add("hide");
            } else {
                sidebar.classList.remove("hide");
            }
        }
    }

    window.addEventListener("resize", checkWidth);
    checkWidth(); 
});
