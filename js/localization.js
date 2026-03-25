// Localization JavaScript functions
function changeCulture(culture) {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '/Public/Culture/SetLanguage';
    
    const cultureInput = document.createElement('input');
    cultureInput.type = 'hidden';
    cultureInput.name = 'culture';
    cultureInput.value = culture;
    
    const returnUrlInput = document.createElement('input');
    returnUrlInput.type = 'hidden';
    returnUrlInput.name = 'returnUrl';
    returnUrlInput.value = window.location.pathname + window.location.search;
    
    const tokenInput = document.createElement('input');
    tokenInput.type = 'hidden';
    tokenInput.name = '__RequestVerificationToken';
    const token = document.querySelector('input[name="__RequestVerificationToken"]');
    tokenInput.value = token ? token.value : '';
    
    form.appendChild(cultureInput);
    form.appendChild(returnUrlInput);
    form.appendChild(tokenInput);
    
    document.body.appendChild(form);
    form.submit();
}

// Initialize culture on page load
document.addEventListener('DOMContentLoaded', function() {
    // Set RTL for Arabic
    const currentCulture = document.documentElement.lang || 'en-US';
    if (currentCulture.startsWith('ar')) {
        document.documentElement.dir = 'rtl';
        document.body.classList.add('rtl');
    } else {
        document.documentElement.dir = 'ltr';
        document.body.classList.remove('rtl');
    }
});