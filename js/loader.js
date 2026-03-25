<div id="loading-overlay" style="
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    display: flex; align-items: center; justify-content: center;
    background: rgba(255,255,255,0.9);
    z-index: 9999;">
    <h2>Loading...</h2>
</div>

<script>
(function () {
    const overlay = document.getElementById('loading-overlay');

    function showLoader() {
        if (overlay) overlay.style.display = 'flex';
    }

    function hideLoader() {
        if (overlay) overlay.style.display = 'none';
    }

    // Page load: keep loader visible until Blazor is ready
    Blazor.start().then(() => {
        hideLoader();

        // Hook into Blazor navigation events
        const navManager = Blazor.defaultReconnectionHandler?._reconnectionDisplay?.navigationManager;
        if (navManager && navManager.listenForNavigation) {
            navManager.listenForNavigation((uri, state) => {
                showLoader();
                setTimeout(hideLoader, 500); // hide after short delay
            });
        }
    });
})();
</script>
