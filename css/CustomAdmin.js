document.addEventListener("DOMContentLoaded", function() {
    console.log("Admin Panel Loaded Successfully");

    const sidebar = document.querySelector(".sidebar");
    const toggleBtn = document.querySelector(".mobile-toggle-btn"); 

    if (toggleBtn) {
        toggleBtn.addEventListener("click", function() {
            sidebar.classList.toggle("hide");
        });
    }

    const menuItems = document.querySelectorAll(".sidebar ul li");

    menuItems.forEach(item => 
        const link = item.querySelector("a");
        
        if (link) {
            link.addEventListener("click", function(e) {
                const hasSubmenu = item.querySelector("ul");

                if (hasSubmenu) {
                    e.preventDefault(); 
                    menuItems.forEach(i => {
                        if (i !== item) i.classList.remove("active");
                    });

                    item.classList.toggle("active");
                } else {
                    menuItems.forEach(i => i.classList.remove("active"));
                    item.classList.add("active");
                }
            });
        }
    });

    function handleResponsive() {
        if (window.innerWidth <= 991) {
            sidebar.classList.add("hide");
        } else {
            sidebar.classList.remove("hide");
        }
    }

    window.addEventListener("load", handleResponsive);
    window.addEventListener("resize", handleResponsive);

    document.querySelectorAll(".btn").forEach(button => {
        button.addEventListener("mousedown", function() {
            this.style.transform = "scale(0.95)";
        });
        button.addEventListener("mouseup", function() {
            this.style.transform = "scale(1)";
        });
    });
});
