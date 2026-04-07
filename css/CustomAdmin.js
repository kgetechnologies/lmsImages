function toggleSidebar() {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("hide");
}

document.querySelectorAll(".sidebar ul li").forEach(item => {
    item.addEventListener("click", function() {
        document.querySelectorAll(".sidebar ul li").forEach(i => {
            i.classList.remove("active");
        });
        this.classList.remove("active");
    });
    this.classList.add("active");
});
});

functon handleResponsive() {
const sidebar = document.querySelector(".sidebar");

    if(window.innerWidth <= 768) {
        sidebar.classList.add("hide");
    } else{
        sidebar.classList.remove("hide");
    }
}

window.addEventListener("Load", handleResponsive);
window.addEventListener("resize", handleResponsive);

document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("click", function() {
        this.style.transform = "scale(0.95)";
    }, 150);
});
});

document.querySelectorAll(".dropdown-toggle").forEach(toggle => {
    toggle.addEventListener("click", function() {
        this.nextElementSibling.classList.toggle("show");
    });
});

window.addEventListener("load", function() {
    console.log("Admin Panel Loaded Successfully");
});
    
