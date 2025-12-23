chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0], closeOnClick;
    var btn = document.getElementById('showImages');

    function updateButton(paused) {
        if (paused) {
            btn.innerText = 'Hide Images'; // If paused (images shown), button should say Hide
            btn.className = 'hiding';
        } else {
            btn.innerText = 'Show Images'; // If running (images hidden), button should say Show
            btn.className = '';
        }
    }

    function showImages() {
        chrome.tabs.sendMessage(activeTab.id, { r: 'showImages' });
        // Assume successful toggle to shown state (paused)
        updateButton(true);
        // Also update the checkbox
        document.getElementById('pauseChk').checked = true;
    }

    function hideImages() {
        chrome.tabs.sendMessage(activeTab.id, { r: 'toggleImages' }); // toggleImages handles logic to unpause and hide
        // Assume successful toggle to hidden state (unpaused)
        updateButton(false);
         // Also update the checkbox
         document.getElementById('pauseChk').checked = false;
    }

    chrome.runtime.sendMessage({ r: 'getSettings', tab: activeTab }, function (settings) {
        document.getElementById('pauseChk').checked = settings.paused;
        updateButton(settings.paused);

        // Update Pin state (Pause For Tab)
        var pinBtn = document.getElementById('pauseTab');
        if (settings.pausedForTab) {
            pinBtn.classList.add('active');
        } else {
            pinBtn.classList.remove('active');
        }

        document.getElementById('excludeDomain').checked = settings.excluded;
        document.getElementById('excludeForTab').checked = settings.excludedForTab;
        document.getElementById('exclude-tab-wrap').style.display = 'block';
        document.querySelectorAll('i-add-exclude').forEach(x => x.innerText = settings.blackList ? 'Add' : 'Exclude');
        closeOnClick = settings.closeOnClick;
    });
    // Button onclick logic (replaces pauseChk.onclick)
    document.getElementById('showImages').onclick = function () {
        // Toggle based on current state derived from button text or hidden checkbox
        // If pauseChk is checked, it means we are PAUSED (images SHOWN). So we want to HIDE.
        if (document.getElementById('pauseChk').checked)
            hideImages();
        else
            showImages(); // Will Pause (Show)

        if (closeOnClick) close();
    };

    // Pin Button logic (replaces pauseTab.onclick)
    document.getElementById('pauseTab').onclick = function () {
        var pinBtn = this;
        var isPausedForTab = pinBtn.classList.contains('active');
        var newState = !isPausedForTab;

        chrome.runtime.sendMessage({ r: 'pauseForTab', tabId: activeTab.id, toggle: newState });
        
        if (newState) {
            pinBtn.classList.add('active');
            showImages(); // If we pause for tab, we show images
        } else {
            pinBtn.classList.remove('active');
            // If we unpause for tab, we might need to hide images (unless global pause is on)
            // But usually user wants to return to normal operation relative to global state
            if (!document.getElementById('pauseChk').checked) { 
                hideImages();
            }
        }
    };

    // Listen for settings updates (e.g. from keyboard shortcut)
    chrome.runtime.onMessage.addListener(function(request) {
        if (request.r == 'settingsUpdated' && request.settings) {
            document.getElementById('pauseChk').checked = request.settings.paused;
            updateButton(request.settings.paused);
        }
    });

});
document.getElementById('close').onclick = function () { close(); };
