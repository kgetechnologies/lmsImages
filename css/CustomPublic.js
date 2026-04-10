const clearBulkyErrors = () => {
    const selectors = [
        '.validation-summary-errors', 
        '.validation-summary-valid', 
        '[data-valmsg-summary="true"]',
        'ul.text-danger' 
    ];

    selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.style.display = 'none';
        });
    });
};

document.addEventListener('DOMContentLoaded', clearBulkyErrors);


document.addEventListener('click', (e) => {
    
    setTimeout(clearBulkyErrors, 100);
});
