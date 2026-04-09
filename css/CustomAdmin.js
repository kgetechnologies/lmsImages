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

  
    const currentUrl = window.location.href;
    document.querySelectorAll(".sidebar a").forEach(link => {
        const href = link.getAttribute("href");
        if (href && href !== "#" && currentUrl.includes(href)) {
            link.classList.add("active");

            const parentItem = link.closest(".nav-item");
            if (parentItem) parentItem.classList.add("active");

            const subMenu = link.closest(".sub-menu");
            if (subMenu) {
                const mainItem = subMenu.closest(".nav-item");
                if (mainItem) mainItem.classList.add("active");
            }
        }
    });

    document.addEventListener("click", function (e) {
        const continueBtn = e.target.closest("button, a, label");
        if (!continueBtn) return;

        if (!continueBtn.textContent.trim().toLowerCase().includes("continue")) return;

        const sellingPrice = document.getElementById("SellingPrice");
        const noOfMonths = document.getElementById("Noofmonth");
        const isFree = document.getElementById("FreeCourse");

        if (!sellingPrice || !noOfMonths || !isFree) return;

        let isValid = true;

      
        document.querySelectorAll(".error-msg").forEach(el => el.remove());
        document.querySelectorAll(".is-invalid").forEach(el => {
            el.classList.remove("is-invalid");
        });

      
        if (!isFree.checked) {
            if (!sellingPrice.value.trim() || sellingPrice.value === "0") {
                showError(sellingPrice, "Selling price is required");
                isValid = false;
            }

            if (!noOfMonths.value.trim() || noOfMonths.value === "0") {
                showError(noOfMonths, "Please enter duration");
                isValid = false;
            }
        }

        if (!isValid) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();

            const firstError = document.querySelector(".is-invalid");
            if (firstError) {
                firstError.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
                firstError.focus();
            }
            return false;
        }
    }, true);

    document.querySelectorAll("#SellingPrice, #Noofmonth").forEach(field => {
        field.addEventListener("input", function () {
            if (this.value.trim() !== "" && this.value !== "0") {
                this.classList.remove("is-invalid");
                const error = this.parentElement.querySelector(".error-msg");
                if (error) error.remove();
            }
        });
    });

    const freeCourseCheckbox = document.getElementById("FreeCourse");
    if (freeCourseCheckbox) {
        freeCourseCheckbox.addEventListener("change", function () {
            if (this.checked) {
                ["SellingPrice", "Noofmonth"].forEach(id => {
                    const field = document.getElementById(id);
                    if (field) {
                        field.classList.remove("is-invalid");
                        const err = field.parentElement.querySelector(".error-msg");
                        if (err) err.remove();
                    }
                });
            }
        });
    }

    document.querySelectorAll("form").forEach(form => {
        form.addEventListener("submit", function (e) {
            let isValid = true;

            form.querySelectorAll("[required]").forEach(field => {
                if (!field.value.trim()) {
                    showError(field, "This field is required");
                    isValid = false;
                }
            });

            if (!isValid) {
                e.preventDefault();
            }
        });
    });

    document.querySelectorAll(".nav-tabs input[type='radio']").forEach(tab => {
        tab.addEventListener("change", function () {
            document.querySelectorAll(".tab-pane").forEach(pane => {
                pane.classList.remove("active");
            });

            const target = document.querySelector(this.dataset.target);
            if (target) {
                target.classList.add("active");
            }
        });
    });

    if (typeof bootstrap !== "undefined") {
        document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
            new bootstrap.Tooltip(el);
        });
    }

   
    if (!document.querySelector("meta[name='viewport']")) {
        const metaViewport = document.createElement("meta");
        metaViewport.name = "viewport";
        metaViewport.content = "width=device-width, initial-scale=1.0";
        document.head.appendChild(metaViewport);
    }

    if (!document.querySelector("meta[name='description']")) {
        const metaDesc = document.createElement("meta");
        metaDesc.name = "description";
        metaDesc.content = "Learning Management System by KGE Technologies.";
        document.head.appendChild(metaDesc);
    }

    function showError(field, message) {
        if (!field) return;

        field.classList.add("is-invalid");

        const error = document.createElement("span");
        error.className = "error-msg text-danger";
        error.innerText = message;

        const container = field.closest(
            ".form-group, .mb-3, .col-md-6, .col-md-12"
        ) || field.parentElement;

        container.appendChild(error);
    }

});
