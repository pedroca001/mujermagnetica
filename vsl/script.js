document.addEventListener('DOMContentLoaded', function () {

    // --- Viewer Counter Logic ---
    const viewerCountElement = document.getElementById('viewer-count-display');

    function updateViewerCount() {
        if (!viewerCountElement) return;

        // Get min/max from data attributes if available, else default
        let min = parseInt(viewerCountElement.getAttribute('data-min')) || 400;
        let max = parseInt(viewerCountElement.getAttribute('data-max')) || 700;

        const randomCount = Math.floor(Math.random() * (max - min + 1)) + min;
        viewerCountElement.textContent = randomCount;
    }

    // Update immediately and then every 10 seconds
    updateViewerCount();
    setInterval(updateViewerCount, 10000);


    // --- UTM Parameter Forwarding ---
    // This script captures UTM parameters from the current URL and appends them to all links on the page.
    function forwardUTMs() {
        const urlParams = new URLSearchParams(window.location.search);
        const links = document.querySelectorAll('a');

        if (Array.from(urlParams).length === 0) return; // No params to forward

        links.forEach(link => {
            try {
                let href = link.getAttribute('href');
                if (!href || href.startsWith('#') || href.startsWith('javascript:')) return;

                const url = new URL(href, window.location.origin); // Handle relative URLs

                // Append current params to the link's params
                for (const [key, value] of urlParams.entries()) {
                    url.searchParams.set(key, value);
                }

                link.setAttribute('href', url.toString());
            } catch (e) {
                console.error("Error processing link:", link, e);
            }
        });
    }

    forwardUTMs();


    // --- Content Protection ---

    // Disable Right Click
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        return false;
    });

    // Disable Copy
    document.addEventListener('copy', function (e) {
        e.preventDefault();
        return false;
    });

    // Disable Cut
    document.addEventListener('cut', function (e) {
        e.preventDefault();
        return false;
    });

    // Disable Drag (prevent dragging images etc)
    document.addEventListener('dragstart', function (e) {
        e.preventDefault();
        return false;
    });

    // Disable Key Shortcuts (Ctrl+C, Ctrl+U, etc - strict mode)
    document.addEventListener('keydown', function (e) {
        // Ctrl+C, Ctrl+X, Ctrl+U (view source), F12 (dev tools - hard to block reliably but we can try)
        if (e.ctrlKey && (e.key === 'c' || e.key === 'C' || e.key === 'x' || e.key === 'X' || e.key === 'u' || e.key === 'U')) {
            e.preventDefault();
            return false;
        }
    });

});
