// Blazor-style MVC functionality
(function () {
    // Blazor culture functions
    window.blazorCulture = {
        get: () => localStorage['BlazorCulture'],
        set: (value) => localStorage['BlazorCulture'] = value
    };

    // Show loader on real navigation links
    function showLoaderOnNavigation() {
        document.querySelectorAll("a[href]").forEach(link => {
            link.addEventListener("click", function (e) {
                const href = link.getAttribute("href");

                if (!href ||
                    href.startsWith("#") ||
                    href.startsWith("javascript:") ||
                    href.startsWith("mailto:") ||
                    href.startsWith("tel:") ||
                    href === window.location.pathname) {
                    return; // ignore dummy or same-page links
                }

                if (!link.hasAttribute("data-no-loader")) {
                    showLoader();
                }
            });
        });

        // Show loader on form submissions
        document.querySelectorAll("form").forEach(form => {
            form.addEventListener("submit", function (e) {
                if (!form.hasAttribute("data-no-loader")) {
                    showLoader();
                }
            });
        });
    }

    // Loader functions
    window.showLoader = function () {
        const overlay = document.getElementById("loading-overlay");
        if (overlay) {
            overlay.style.display = "flex";
        }
    };

    window.hideLoader = function () {
        const overlay = document.getElementById("loading-overlay");
        if (overlay) {
            overlay.style.display = "none";
        }
    };

    // Language change function (like Blazor)
    window.changeLanguage = function (cultureCode) {
        showLoader();
        window.blazorCulture.set(cultureCode);
        window.location.href =
            "/Public/Culture/SetCulture?culture=" +
            cultureCode +
            "&returnUrl=" +
            encodeURIComponent(window.location.href);
    };

    // Initialize on page load
    document.addEventListener("DOMContentLoaded", function () {
        setTimeout(hideLoader, 500);

        // Setup navigation loader
        showLoaderOnNavigation();

        // Check localStorage culture
        var savedCulture = window.blazorCulture.get();
        var currentCulture = document.documentElement.lang || "en-US";

        if (savedCulture && savedCulture !== currentCulture) {
            changeLanguage(savedCulture);
        }
    });

    // Hide loader when page fully loads
    window.addEventListener("load", function () {
        setTimeout(hideLoader, 1000);
    });
})();
