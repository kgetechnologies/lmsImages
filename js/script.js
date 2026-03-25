window.initializeMenu = (currentUrl) => {
    // Set the active menu based on the current URL
    const menuItems = document.querySelectorAll("#menu .menu-item a");
    menuItems.forEach(item => {
        if (item.href === currentUrl) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
    });
};

window.toggleSubmenu = (submenuId) => {
    const submenu = document.getElementById(submenuId);
    submenu.style.display = submenu.style.display === "block" ? "none" : "block";
};

window.closeSidebar = () => {
    const sidebar = document.getElementById("sidebar");
    sidebar.style.display = "none";
};
window.setVideoUrl = (url) => {
    document.getElementById('youtubeFrame').src = url;
};

window.showModal = (modalId) => {
    const modal = new bootstrap.Modal(document.querySelector(modalId));
    modal.show();
};



window.initializeWatermarkAnimation = () => {
    setInterval(() => {
        const labelLogo = document.getElementById('watermarkLabelLogo');
        const studentInfo = document.getElementById('watermarkStudentInfo');

        if (labelLogo.classList.contains('d-none')) {
            labelLogo.classList.remove('d-none');
            studentInfo.classList.add('d-none');
        } else {
            labelLogo.classList.add('d-none');
            studentInfo.classList.remove('d-none');
        }
    }, 10000); // Switch every 10 seconds
};



window.renderChart = (labels, data) => {
    console.log("Labels received:", labels);
    console.log("Data received:", data);

    const canvas = document.getElementById('myChart');
    if (!canvas) {
        console.error("Canvas element with id 'myChart' not found.");
        return;
    }

    const ctx = canvas.getContext('2d');

    if (!labels || !Array.isArray(labels) || !data || !Array.isArray(data)) {
        console.error("Invalid data format. Labels and data should be arrays.");
        return;
    }

    // Destroy the existing chart instance if necessary
    if (window.myChartInstance) {
        window.myChartInstance.destroy();
    }

    // Create the chart
    try {
        window.myChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Total Sales',
                    data: data,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Order Date'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Total Amount ($)'
                        },
                        beginAtZero: true
                    }
                }
            }
        });
    } catch (error) {
        console.error("Error while rendering the chart:", error);
    }
};
    // This function could be used to handle the PDF preview in case you need more complex behavior.
    function openPdfPreview(pdfUrl) {
        var iframe = document.getElementById('pdfPreviewIframe');
    iframe.src = pdfUrl;

    // Open the modal (ensure the modal element exists)
    var modal = new bootstrap.Modal(document.getElementById('pdfPreviewModal'));
    modal.show();
    }

