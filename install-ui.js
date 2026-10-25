export const isStandalone = () =>
  matchMedia("(display-mode: standalone)").matches ||
  navigator.standalone === true;
export function installNudge(canPrompt) {
  let dismissed = false;
  try {
    dismissed =
      sessionStorage.getItem("arabic-journey-install-dismissed") === "yes";
  } catch {}
  if (isStandalone() || dismissed) return "";
  return `<aside class="install-nudge no-print" aria-label="Install Arabic Journey"><span class="install-app-icon" aria-hidden="true">ع</span><div><strong>Your daily Arabic, one tap away.</strong><p>Add Arabic Journey to your home screen. Keep downloaded lessons and progress available offline.</p></div><button class="btn btn-primary" data-action="install">${canPrompt ? "Install app" : "Add to Home Screen"}</button><button class="nudge-dismiss" data-dismiss-install aria-label="Dismiss installation banner">×</button></aside>`;
}
export function openInstallGuide() {
  document.getElementById("install-guide")?.remove();
  const ios =
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const android = /Android/.test(navigator.userAgent);
  const d = document.createElement("dialog");
  d.id = "install-guide";
  d.setAttribute("aria-labelledby", "install-title");
  d.innerHTML = `<button class="dialog-close btn btn-quiet" aria-label="Close installation guide">×</button><span class="eyebrow">A LITTLE CLOSER TO YOUR DAILY ROUTINE</span><h2 id="install-title">Make room for Arabic.</h2><p>Installation is handled by your browser. This does not download an APK or an App Store app.</p>${ios ? `<h3>On iPhone or iPad</h3><ol><li>Open this website in <b>Safari</b>.</li><li>Tap the <b>Share</b> button.</li><li>Choose <b>Add to Home Screen</b> (it may be under More).</li><li>Tap <b>Add</b>, then launch Arabic Journey from the new icon.</li></ol>` : android ? `<h3>On Android</h3><ol><li>Open this website in <b>Chrome</b> or another browser supporting installed web apps.</li><li>Open the browser’s <b>⋮ menu</b>.</li><li>Choose <b>Install app</b> or <b>Add to Home screen</b> when available.</li><li>Confirm the browser’s installation dialog.</li></ol>` : `<h3>On this computer</h3><p>In a supported browser such as Chrome or Edge, use the install icon in the address bar or the browser menu’s <b>Install app</b> option.</p><details><summary>Installing on a phone?</summary><p>Android: Chrome menu → Install app or Add to Home screen.</p><p>iPhone/iPad: Safari → Share → Add to Home Screen → Add.</p></details>`}<p class="muted">No install option yet? Keep the site open while the offline download finishes, then reload. Some browsers and in-app browsers do not offer installation; open the link in your main browser instead.</p><button class="btn btn-primary guide-done">Got it</button>`;
  document.body.append(d);
  d.showModal();
  const close = () => {
    d.close();
    d.remove();
    document.querySelector('[data-action="install"]')?.focus();
  };
  d.querySelector(".dialog-close").onclick = close;
  d.querySelector(".guide-done").onclick = close;
  d.addEventListener("click", (e) => {
    if (e.target === d) {
      const r = d.getBoundingClientRect();
      if (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      )
        close();
    }
  });
  d.addEventListener("cancel", () => {
    setTimeout(() => d.remove(), 0);
  });
}
