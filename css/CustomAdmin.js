document.addEventListener("DOMContentLoaded", function () {

    const sidebar = document.querySelector(".sidebar");
    const toggleBtn = document.querySelector(".menu-toggle");

    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener("click", function () {
            sidebar.classList.toggle("active");
            document.body.classList.toggle("sidebar-open");
        });
    }

   
   
    document.querySelectorAll(".sidebar .nav-item > a").forEach(link => {
        link.addEventListener("click", function (e) {
            const parent = this.parentElement;
            const subMenu = parent.querySelector(".sub-menu");

            if (subMenu) {
                e.preventDefault();

             
                document.querySelectorAll(".sidebar .nav-item").forEach(item => {
                    if (item !== parent) {
                        item.classList.remove("active");
                    }
                });

                parent.classList.toggle("active");
            }
        });
    });

    const currentUrl = window.location.pathname.toLowerCase();

    document.querySelectorAll(".sidebar a").forEach(link => {
        const href = link.getAttribute("href");
        if (!href || href === "#" || href.startsWith("javascript")) return;

        const linkPath = new URL(href, window.location.origin).pathname.toLowerCase();

        if (currentUrl === linkPath || currentUrl.startsWith(linkPath)) {
            link.classList.add("active");

            const parentItem = link.closest(".nav-item");
            if (parentItem) parentItem.classList.add("active");

            const subMenu = link.closest(".sub-menu");
            if (subMenu) {
                const mainParent = subMenu.closest(".nav-item");
                if (mainParent) mainParent.classList.add("active");
            }
        }
    });

 
    document.querySelectorAll("form").forEach(form => {
        form.addEventListener("submit", function (e) {
            let isValid = true;

            form.querySelectorAll(".error-msg").forEach(el => el.remove());
            form.querySelectorAll(".is-invalid").forEach(el => {
                el.classList.remove("is-invalid");
            });

            form.querySelectorAll("[required]").forEach(field => {
                if (!validateField(field)) {
                    isValid = false;
                }
            });

            const isFree = document.getElementById("FreeCourse");
            const sellingPrice = document.getElementById("SellingPrice");
            const noOfMonths = document.getElementById("Noofmonth");

            if (isFree && !isFree.checked) {
                if (sellingPrice && (sellingPrice.value.trim() === "" || sellingPrice.value === "0")) {
                    showError(sellingPrice, "Selling price is required");
                    isValid = false;
                }

                if (noOfMonths && (noOfMonths.value.trim() === "" || noOfMonths.value === "0")) {
                    showError(noOfMonths, "Please enter duration");
                    isValid = false;
                }
            }

            if (!isValid) {
                e.preventDefault();
                const firstError = form.querySelector(".is-invalid");
                if (firstError) {
                    firstError.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });
                    firstError.focus();
                }
            }
        });
    });

 
    document.querySelectorAll("input, select, textarea").forEach(field => {
        field.addEventListener("input", function () {
            if (this.value.trim() !== "") {
                this.classList.remove("is-invalid");
                const error = this.parentElement.querySelector(".error-msg");
                if (error) error.remove();
            }
        });

        field.addEventListener("change", function () {
            if (this.value.trim() !== "") {
                this.classList.remove("is-invalid");
                const error = this.parentElement.querySelector(".error-msg");
                if (error) error.remove();
            }
        });
    });

    function validateField(field) {
        if (!field.value || field.value.trim() === "" || field.value === "0") {
            showError(field, "This field is required");
            return false;
        }
        return true;
    }

    function showError(field, message) {
        field.classList.add("is-invalid");

        const error = document.createElement("span");
        error.className = "error-msg text-danger";
        error.innerText = message;

        const container = field.closest(
            ".form-group, .mb-3, .col-md-6, .col-md-12, .form-floating"
        ) || field.parentElement;

        container.appendChild(error);
    }
});
