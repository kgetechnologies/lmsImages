document.addEventListener("DOMContentLoaded", function () {

   
    const sidebar = document.querySelector(".sidebar");
    const toggleBtn = document.querySelector(".menu-toggle");

    if (toggleBtn) {
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
                parent.classList.toggle("active");

                document.querySelectorAll(".sidebar .nav-item").forEach(item => {
                    if (item !== parent) {
                        item.classList.remove("active");
                    }
                });
            }
        });
    });

    const currentUrl = window.location.href;
    document.querySelectorAll(".sidebar a").forEach(link => {
        if (currentUrl.includes(link.getAttribute("href"))) {
            link.classList.add("active");
            const parent = link.closest(".nav-item");
            if (parent) parent.classList.add("active");
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
        error.className = "error-msg";
        error.innerText = message;

        const container = field.closest(".form-group, .mb-3, .col-md-6, .col-md-12") || field.parentElement;
        container.appendChild(error);
    }
});
