// Immediately apply the theme based on localStorage
(function () {
    const darkMode = localStorage.getItem('darkMode');
    const isDark = darkMode === 'enabled';

    // Apply the theme class to the document immediately
    document.documentElement.className = isDark ? 'dark' : 'light';

    // Add event listeners for toggle buttons if they exist
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const lightModeToggle = document.getElementById('light-mode-toggle');

    if (darkModeToggle && lightModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
            localStorage.setItem('darkMode', 'enabled');
        });

        lightModeToggle.addEventListener('click', () => {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
            localStorage.setItem('darkMode', 'disabled');
        });
    }
})();
