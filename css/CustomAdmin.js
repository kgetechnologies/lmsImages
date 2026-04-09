console.log("CustomAdmin.js Loaded Successfully");
document.addEventListener("DOMContentLoaded", function () {

    document.addEventListener("click", function (e) {
        const continueBtn = e.target.closest("button, a");
        if (!continueBtn) return;

        if (!continueBtn.textContent.trim().toLowerCase().includes("continue")) return;

        
        const pricingTab = document.querySelector(
            'input[type="radio"][value="Pricing"]:checked, #Pricing.active, .Pricing.active'
        );


        const sellingPrice = document.getElementById("SellingPrice");
        if (!pricingTab && !sellingPrice) return;

        const isFree = document.getElementById("FreeCourse");
        const noOfMonths = document.getElementById("Noofmonth");

        let isValid = true;

        document.querySelectorAll(".error-msg").forEach(el => el.remove());
        document.querySelectorAll(".is-invalid").forEach(el => {
            el.classList.remove("is-invalid");
        });

        if (isFree && !isFree.checked) {
            if (sellingPrice && (!sellingPrice.value.trim() || sellingPrice.value === "0")) {
                showError(sellingPrice, "Selling price is required");
                isValid = false;
            }

            if (noOfMonths && (!noOfMonths.value.trim() || noOfMonths.value === "0")) {
                showError(noOfMonths, "Please enter duration");
                isValid = false;
            }
        }

      
        if (!isValid) {
            e.preventDefault();
            e.stopImmediatePropagation();

            const firstError = document.querySelector(".is-invalid");
            if (firstError) {
                firstError.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
                firstError.focus();
            }
        }
    });

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


    function showError(field, message) {
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
