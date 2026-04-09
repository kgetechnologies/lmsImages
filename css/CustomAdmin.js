(function() {
    // 1. Sidebar Logic (Admin/Instructor Menu)
    document.addEventListener('click', function(e) {
        const toggle = e.target.closest('.sidebar .nav-item > a');
        if (toggle) {
            const parent = toggle.parentElement;
            const subMenu = parent.querySelector('.sub-menu');
            if (subMenu) {
                e.preventDefault();
                e.stopPropagation();
                parent.classList.toggle('active');
            }
        }
    }, true);

    // 2. SEO & Title Management
    const updatePageSEO = () => {
        const header = document.querySelector('h1, h2, h4.card-title, .breadcrumb-item.active');
        if (header) {
            const title = header.innerText.trim();
            document.title = `${title} | KGE Admin`;
            
            // Meta Description update
            let meta = document.querySelector('meta[name="description"]');
            if (!meta) {
                meta = document.createElement('meta');
                meta.name = "description";
                document.head.appendChild(meta);
            }
            meta.content = `Editing ${title} section on KGE Technologies.`;
        }
    };

    // 3. THE MASTER VALIDATOR (Blocks everything if invalid)
    document.addEventListener('click', function(e) {
        const btn = e.target.closest('.btn-primary, #continue-btn');
        if (!btn) return;

        // Pricing Page Inputs
        const isFree = document.getElementById('FreeCourse')?.checked;
        const sellingPrice = document.getElementById('SellingPrice');
        const noOfMonths = document.getElementById('Noofmonth');

        let invalid = false;
        document.querySelectorAll('.error-msg').forEach(el => el.remove());

        // Check Pricing only if visible
        if (sellingPrice || noOfMonths) {
            if (!isFree) {
                if (!sellingPrice?.value || sellingPrice.value == "0") {
                    showError(sellingPrice, "Price cannot be zero");
                    invalid = true;
                }
                if (!noOfMonths?.value || noOfMonths.value == "0") {
                    showError(noOfMonths, "Duration required");
                    invalid = true;
                }
            }
        }

        // Agar invalid hai, toh yahan "Stop" lagega
        if (invalid) {
            e.preventDefault();
            e.stopImmediatePropagation(); // Ye Blazor ke code ko chalne se rok dega
            return false;
        }
    }, true); // 'true' is critical here (Event Capturing)

    function showError(field, msg) {
        if (!field) return;
        field.style.border = "2px solid red";
        const error = document.createElement('div');
        error.className = 'error-msg';
        error.style.cssText = "color: red; font-size: 12px; font-weight: bold; margin-top: 4px;";
        error.innerText = msg;
        field.parentElement.appendChild(error);
    }

    // Blazor dynamic change observer
    const obs = new MutationObserver(() => {
        updatePageSEO();
    });
    obs.observe(document.body, { childList: true, subtree: true });
})();
