# V3 GPC Toast Test Site

Minimal static multi-page website for manually reproducing and verifying the GPC toast
notification behavior tracked in **EUD-6110** ("GPC toast notification is shown on every
page load") against the Usercentrics CMP **V3** sandbox build.

## Configuration

| Setting | Value |
|---|---|
| Settings ID | `cqNAsnaCNNTg5s` |
| Loader | `https://web.cmp.usercentrics-sandbox.eu/ui/pr/1497/loader.js` |
| Sandbox | `data-sandbox="1"` |

The CMP is embedded on every page via:

```html
<script
  id="usercentrics-cmp"
  src="https://web.cmp.usercentrics-sandbox.eu/ui/pr/1497/loader.js"
  data-settings-id="cqNAsnaCNNTg5s"
  data-sandbox="1"
></script>
```

## Pages

- `index.html` — Home
- `products.html` — Products
- `about.html` — About
- `contact.html` — Contact

Each page shows the current GPC signal state (`navigator.globalPrivacyControl`) and a
per-session page-load counter (`test-helpers.js`) to help track whether the toast re-fires.

## Run locally

Any static server works, e.g.:

```bash
python3 -m http.server 8090
# then open http://localhost:8090/
```

## Enabling the GPC signal

The toast only appears when the browser actually sends GPC
(`navigator.globalPrivacyControl === true`). No browser sends it by default.

Either enable it natively/via extension:

- **Firefox**: `about:config` → `privacy.globalprivacycontrol.enabled = true`
- **Brave**: Settings → Privacy → "Tell sites not to sell or share my data"
- **Chrome**: requires an extension (OptMeowt, DuckDuckGo, Privacy Badger)

…or use the built-in **simulation** (any browser): append **`?gpc=1`** to the URL
(e.g. `index.html?gpc=1`). It sets `navigator.globalPrivacyControl = true` before the CMP
loader runs and persists for the browser session. Clear it with `?gpc=0`.

## Test flow

1. Enable GPC (native/extension) or open the site with `?gpc=1`. The status line on the
   page should read **GPC signal: ON**.
2. Open the site in a fresh profile — the GPC "honored" toast should appear **once**.
3. Navigate across Home → Products → About → Contact and reload pages.
4. **Expected (post-fix):** the toast does **not** reappear on every page load.
