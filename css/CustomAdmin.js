const clearBulkyBox = () => {
    
    const selectors = '.validation-summary-errors, .validation-summary-valid, [data-valmsg-summary="true"]';
    const elements = document.querySelectorAll(selectors);
    
    elements.forEach(el => {
        if (el) {
            el.style.setProperty('display', 'none', 'important');
            el.innerHTML = ''; 
        }
    });
};

document.addEventListener('DOMContentLoaded', clearBulkyBox);

setInterval(clearBulkyBox, 500);
