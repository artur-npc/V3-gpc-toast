// Lightweight helpers for the GPC toast manual test harness.
// Shows the current GPC signal state and counts page loads within the browser session,
// so a tester can verify whether the GPC toast re-fires on every navigation/reload.

(function () {
  // --- GPC signal status ---
  var statusEl = document.getElementById('gpc-status');
  if (statusEl) {
    var gpc = navigator.globalPrivacyControl;
    var simulated = sessionStorage.getItem('simulateGpc') === '1';
    if (gpc === true) {
      statusEl.textContent = simulated
        ? 'ON (simulated via ?gpc=1)'
        : 'ON (navigator.globalPrivacyControl === true)';
      statusEl.classList.add('gpc-on');
    } else if (gpc === false) {
      statusEl.textContent = 'OFF (navigator.globalPrivacyControl === false)';
      statusEl.classList.add('gpc-off');
    } else {
      statusEl.textContent = 'not exposed (enable a GPC extension / browser flag)';
      statusEl.classList.add('gpc-off');
    }
  }

  // --- Page-load counter (per browser session) ---
  var countEl = document.getElementById('load-count');
  if (countEl) {
    var loads = parseInt(sessionStorage.getItem('gpcPageLoads') || '0', 10) + 1;
    sessionStorage.setItem('gpcPageLoads', String(loads));
    countEl.textContent = String(loads);
  }
})();
