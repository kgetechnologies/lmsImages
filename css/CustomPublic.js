alert("JS File Loaded!");
const observer = new MutationObserver(() => {
    
    const bulkyElements = document.querySelectorAll('.validation-summary-errors, [data-valmsg-summary="true"], ul.text-danger');
    
    bulkyElements.forEach(el => {
        if (el) {
            el.style.setProperty('display', 'none', 'important');
            el.innerHTML = ''; 
        }
    });
});

observer.observe(document.documentElement, {
    childList: true,
    subtree: true
});



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
