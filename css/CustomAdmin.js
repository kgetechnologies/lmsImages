document.addEventListener('DOMContentLoaded', function () {
 
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.querySelector('#sidebarCollapse');
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            sidebar.classList.toggle('open');
        });
    }

   
    const allLabels = document.querySelectorAll('.nav-tabs label');
    allLabels.forEach(label => {
        label.addEventListener('click', function() {
            const radioId = this.getAttribute('for');
            const radio = document.getElementById(radioId) || this.querySelector('input[type="radio"]');
            
            if (radio) {
                radio.checked = true;
             
                radio.dispatchEvent(new Event('change', { bubbles: true }));
                console.log("Section Switched: " + this.innerText.trim());
            }
        });
    });


    const menuLinks = document.querySelectorAll('.sidebar ul li > a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const parent = this.parentElement;
            const subMenu = parent.querySelector('ul');
            if (subMenu) {
                e.preventDefault();
                parent.classList.toggle('active');
            }
        });
    });

   
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');

            requiredFields.forEach(field => {
                const parent = field.parentElement;
              
                const oldMsg = parent.querySelector('.error-msg');
                if (oldMsg) oldMsg.remove();
                field.classList.remove('is-invalid');

                if (!field.value.trim() || field.value === "Select Category") {
                    isValid = false;
                    field.classList.add('is-invalid');
                    const msg = document.createElement('span');
                    msg.className = 'error-msg';
                    msg.innerText = "Mandatory for SEO fixing!";
                    parent.appendChild(msg);
                }
            });

            if (!isValid) {
                e.preventDefault();
                const firstErr = form.querySelector('.error-msg');
                if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });
});
