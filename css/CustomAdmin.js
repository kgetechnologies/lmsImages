document.addEventListener('click', function (e) {
    // 1. Sirf "Continue" button par click hone par chalega
    const continueBtn = e.target.closest('.btn-primary, #continue-btn, .btn-next');
    if (!continueBtn) return;

    // 2. Pricing fields ko dhoondna
    const sellingPrice = document.getElementById('SellingPrice');
    const noOfMonths = document.getElementById('Noofmonth');
    const isFree = document.getElementById('FreeCourse')?.checked;

    // 3. Agar hum Pricing wale section par hain tabhi check karega
    if (sellingPrice || noOfMonths) {
        let hasError = false;

        // Purane error hatana
        document.querySelectorAll('.pricing-error').forEach(el => el.remove());
        if (sellingPrice) sellingPrice.style.border = "";
        if (noOfMonths) noOfMonths.style.border = "";

        // 4. Validation (Sirf agar Free Course tick nahi hai)
        if (!isFree) {
            // Price Check
            if (!sellingPrice?.value || sellingPrice.value === "0" || sellingPrice.value.trim() === "") {
                showPricingError(sellingPrice, "Selling price is required");
                hasError = true;
            }
            // Duration Check
            if (!noOfMonths?.value || noOfMonths.value === "0" || noOfMonths.value.trim() === "") {
                showPricingError(noOfMonths, "Duration is required");
                hasError = true;
            }
        }

        // 5. Agar error hai toh stop karo
        if (hasError) {
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }
    }
}, true); // 'true' catch karne ke liye zaroori hai

// Red Text Error Function (Wahi subah wala style)
function showPricingError(element, message) {
    if (!element) return;
    element.style.border = "1px solid red";
    const errorDiv = document.createElement('div');
    errorDiv.className = 'pricing-error';
    errorDiv.style.cssText = "color: red; font-size: 13px; margin-top: 5px; font-weight: 500;";
    errorDiv.innerText = message;
    element.parentElement.appendChild(errorDiv);
}
