/* ============================================================================
   CENVAR INSTANT ESTIMATE FUNNEL  —  now includes SOLAR
   ============================================================================
   Embed:  <div class="rfx-mount" data-service="roofing"></div>
           <script src="URL-OF-THIS-FILE" defer></script>
   data-service: roofing | windows | doors | siding | solar | hub

   BEFORE TESTING SOLAR: add "Solar" as an option on the estimator_service
   dropdown in HubSpot, or every solar submission drops that field.


   After committing, purge or pages keep the old file:
     https://purge.jsdelivr.net/gh/ddavis-ctrl/cenvar-estimator@main/estimator.js
   ============================================================================ */

(function () {
  "use strict";
  if (!document.getElementById("rfx-styles")) {
    var st = document.createElement("style");
    st.id = "rfx-styles"; st.textContent = `
/* Colors and fonts are driven by the BRAND block in the script below.
   Do not edit hex values in here — they are only fallbacks. */
.rfx{--rfx-ink:#1B2A33;--rfx-ink-2:#3A5566;--rfx-mute:#6B8494;--rfx-surface:#EDF0EE;
--rfx-card:#FFF;--rfx-line:#D3DAD9;--rfx-line-2:#B9C4C4;--rfx-accent:#C98A22;
--rfx-accent-deep:#9C6A15;--rfx-green:#3E7A5E;--rfx-red:#A33B2E;
--rfx-ink-hover:#101C24;--rfx-action:#1B2A33;--rfx-action-hover:#101C24;--rfx-on-action:#FFFFFF;--rfx-tint:#FBFAF7;--rfx-on-ink:#FFFFFF;
--rfx-scrim:rgba(27,42,51,.88);
--rfx-radius:10px;--rfx-radius-card:3px;--rfx-shadow:none;--rfx-shadow-lift:none;--rfx-selected:#056A38;
--rfx-body:"Source Sans 3",ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;
--rfx-display:"Archivo",ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;
font-family:var(--rfx-body);color:var(--rfx-ink);background:var(--rfx-surface);
line-height:1.5;-webkit-font-smoothing:antialiased;padding:28px 20px 40px;box-sizing:border-box}
.rfx *,.rfx *::before,.rfx *::after{box-sizing:border-box}
.rfx p,.rfx h2,.rfx h3{margin:0;padding:0}
.rfx-shell{max-width:640px;margin:0 auto}

.rfx-courses{display:flex;gap:3px;margin-bottom:30px}
.rfx-course{flex:1;height:7px;background:var(--rfx-line);border-radius:1px;position:relative;overflow:hidden}
.rfx-course::after{content:"";position:absolute;inset:0;background:var(--rfx-accent);
transform:translateX(-101%);transition:transform .42s cubic-bezier(.4,.05,.2,1)}
.rfx-course.is-filled::after{transform:translateX(0)}

.rfx-stage{min-height:300px}
.rfx-hero{position:relative;overflow:hidden;border-radius:var(--rfx-radius-card);
margin-bottom:20px;background:var(--rfx-line);aspect-ratio:var(--rfx-hero-ratio,21/9)}
.rfx-hero img{display:block;width:100%;height:100%;object-fit:cover;
opacity:0;transition:opacity .45s ease}
.rfx-hero img.rfx-loaded{opacity:1}
.rfx-hub-img{display:block;width:100%;aspect-ratio:16/9;object-fit:cover;
background:var(--rfx-line);border-radius:calc(var(--rfx-radius-card) - 2px);
margin-bottom:13px;opacity:0;transition:opacity .45s ease}
.rfx-hub-img.rfx-loaded{opacity:1}
/* Label and icon together. The icon is a mask using currentColor, so setting
   the colour here turns both red in one place. */
.rfx-kicker{display:flex;align-items:center;gap:7px;font-family:var(--rfx-display);
font-size:13px;font-weight:600;color:var(--rfx-accent);margin-bottom:10px}
/* Masked so the artwork inherits currentColor instead of staying white. */
.rfx-ico{display:inline-block;flex:none;background:currentColor;
-webkit-mask:var(--rfx-ico) center/contain no-repeat;mask:var(--rfx-ico) center/contain no-repeat}
.rfx-kicker .rfx-ico{width:17px;height:17px}
.rfx-hub-title{display:flex;align-items:center;gap:9px}
.rfx-hub-title .rfx-ico{width:22px;height:22px;color:var(--rfx-accent)}
.rfx-h .rfx-ico{width:26px;height:26px;vertical-align:-3px;margin-right:9px;color:var(--rfx-accent)}
.rfx-h{font-family:var(--rfx-display);font-size:clamp(26px,5.2vw,34px);font-weight:700;
letter-spacing:-.021em;line-height:1.13;margin-bottom:8px}
.rfx-sub{font-size:16px;color:var(--rfx-ink-2);max-width:46ch;margin-bottom:24px}

.rfx-options{display:grid;gap:9px}
.rfx-options.rfx-two{grid-template-columns:repeat(2,1fr)}
.rfx-options.rfx-three{grid-template-columns:repeat(3,1fr)}
@media(max-width:520px){.rfx-options.rfx-two,.rfx-options.rfx-three{grid-template-columns:1fr}}
.rfx-opt{display:flex;align-items:center;gap:14px;width:100%;text-align:left;
font-family:var(--rfx-body);font-size:16px;color:var(--rfx-ink);background:var(--rfx-card);
border:1px solid var(--rfx-line);border-left:4px solid var(--rfx-accent);border-radius:var(--rfx-radius-card);
padding:15px 16px;cursor:pointer;transition:border-color .14s ease,background .14s ease}
.rfx-opt:hover{border-color:var(--rfx-ink-2);border-left-color:var(--rfx-accent)}
.rfx-opt:focus-visible{outline:2px solid var(--rfx-ink);outline-offset:2px}
.rfx-opt.is-on{border-color:var(--rfx-selected);border-left-color:var(--rfx-selected);background:var(--rfx-tint)}
.rfx-opt-body{flex:1;min-width:0}
.rfx-opt-title{display:block;font-weight:600}
.rfx-opt-note{display:block;font-size:14px;color:var(--rfx-mute);margin-top:2px}
.rfx-opt-tick{width:19px;height:19px;flex:none;border:1px solid var(--rfx-line-2);border-radius:50%;position:relative}
.rfx-opt.is-on .rfx-opt-tick{border-color:var(--rfx-selected);background:var(--rfx-selected)}
.rfx-opt.is-on .rfx-opt-tick::after{content:"";position:absolute;left:6px;top:3px;width:4px;
height:8px;border:solid var(--rfx-on-ink);border-width:0 2px 2px 0;transform:rotate(42deg)}

.rfx-stepper{display:flex;align-items:center;gap:12px;background:var(--rfx-card);
border:1px solid var(--rfx-line);border-radius:var(--rfx-radius-card);padding:14px}
.rfx-step-btn{width:54px;height:54px;flex:none;font-family:var(--rfx-display);font-size:26px;
font-weight:600;color:var(--rfx-ink);background:var(--rfx-surface);border:1px solid var(--rfx-line-2);
border-radius:var(--rfx-radius);cursor:pointer;line-height:1}
.rfx-step-btn:hover:not([disabled]){border-color:var(--rfx-ink)}
.rfx-step-btn[disabled]{opacity:.3;cursor:not-allowed}
.rfx-step-btn:focus-visible{outline:2px solid var(--rfx-ink);outline-offset:2px}
.rfx-step-val{flex:1;text-align:center;font-family:var(--rfx-display);font-size:44px;
font-weight:700;letter-spacing:-.025em;line-height:1.1}
.rfx-step-cap{text-align:center;font-size:14px;color:var(--rfx-mute);margin-top:10px}
.rfx-quick{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px}
.rfx-quick button{font-family:var(--rfx-body);font-size:15px;color:var(--rfx-ink-2);
background:var(--rfx-card);border:1px solid var(--rfx-line-2);border-radius:var(--rfx-radius);
padding:9px 15px;cursor:pointer}
.rfx-quick button:hover{border-color:var(--rfx-ink)}

.rfx-field{margin-bottom:15px}
.rfx-field-label{display:block;font-size:14px;font-weight:600;color:var(--rfx-ink-2);margin-bottom:5px}
.rfx-input{width:100%;font-family:var(--rfx-body);font-size:16px;color:var(--rfx-ink);
background:var(--rfx-card);border:1px solid var(--rfx-line-2);border-radius:var(--rfx-radius);padding:13px 14px}
.rfx-input:focus{outline:2px solid var(--rfx-ink);outline-offset:-1px;border-color:var(--rfx-ink)}
.rfx-input.is-bad{border-color:var(--rfx-red)}
.rfx-err{font-size:14px;color:var(--rfx-red);margin-top:5px}

.rfx-ac gmp-place-autocomplete{width:100%;display:block}
.rfx-linkish{font:inherit;font-size:14px;color:var(--rfx-mute);background:none;border:0;
padding:0;margin-top:7px;text-decoration:underline;cursor:pointer}
.rfx-linkish:hover{color:var(--rfx-ink)}
.rfx-sat{position:relative;border:1px solid var(--rfx-line);border-radius:var(--rfx-radius-card);overflow:hidden;
background:var(--rfx-line);margin-top:14px;aspect-ratio:16/9}
.rfx-sat img{display:block;width:100%;height:100%;object-fit:cover}
.rfx-sat-tag{position:absolute;left:0;bottom:0;right:0;background:var(--rfx-scrim);color:var(--rfx-on-ink);
font-size:14px;padding:9px 12px}

/* --- dark price panel ---------------------------------------------------- */
.rfx-panel{background:var(--rfx-panel);color:var(--rfx-on-panel);
border-radius:var(--rfx-radius-card);padding:18px 20px;margin-bottom:14px}
.rfx-panel-head{display:flex;align-items:center;gap:11px;margin-bottom:15px}
.rfx-panel-thumb{width:46px;height:46px;flex:none;border-radius:8px;object-fit:cover;
background:var(--rfx-panel-mute)}
.rfx-panel-for{font-size:11px;color:var(--rfx-panel-mute)}
.rfx-panel-addr{font-size:13px;color:var(--rfx-on-panel);white-space:nowrap;
overflow:hidden;text-overflow:ellipsis}
.rfx-figs{display:flex;align-items:flex-start;justify-content:space-between;gap:10px}
.rfx-fig{display:flex;flex-direction:column;gap:3px}
.rfx-fig-hi{text-align:right}
.rfx-fig-total{font-family:var(--rfx-display);font-weight:800;
font-size:clamp(25px,6.6vw,34px);letter-spacing:-.035em;line-height:1.05}
.rfx-fig-mo{font-family:var(--rfx-display);font-weight:800;font-size:15px;
color:var(--rfx-pay);letter-spacing:-.01em;white-space:nowrap}
.rfx-figs-to{font-size:14px;color:var(--rfx-panel-mute);padding-top:9px}
.rfx-panel-rule{height:4px;width:64px;background:var(--rfx-accent);
border-radius:2px;margin-top:14px}
.rfx-stats{display:flex;gap:8px;margin-bottom:16px}
.rfx-stat{flex:1;background:var(--rfx-card);border:1px solid var(--rfx-line);
border-radius:var(--rfx-radius-card);padding:13px 8px;text-align:center}
.rfx-stat-n{font-family:var(--rfx-display);font-weight:800;font-size:19px;
color:var(--rfx-accent);letter-spacing:-.02em}
.rfx-stat-t{font-size:11px;color:var(--rfx-ink-2);margin-top:4px;line-height:1.35}
.rfx-range{background:var(--rfx-card);border:1px solid var(--rfx-line);border-radius:var(--rfx-radius-card);
padding:26px 24px 24px;margin-bottom:20px}
.rfx-range-nums{display:flex;align-items:baseline;justify-content:space-between;gap:12px;
font-family:var(--rfx-display);font-size:clamp(26px,6vw,38px);font-weight:700;letter-spacing:-.026em}
.rfx-range-dash{flex:none;color:var(--rfx-line-2);font-weight:500;font-size:.62em}
.rfx-range-bar{height:9px;margin-top:16px;border-radius:1px;
background:linear-gradient(90deg,var(--rfx-accent-deep),var(--rfx-accent))}
.rfx-range-cap{display:flex;justify-content:space-between;font-size:13px;color:var(--rfx-mute);margin-top:8px}
.rfx-break{margin-top:20px;padding-top:16px;border-top:1px solid var(--rfx-line)}
.rfx-break-row{display:flex;justify-content:space-between;gap:14px;padding:8px 0;font-size:15px}
.rfx-break-k{color:var(--rfx-ink-2)}
.rfx-break-v{font-family:var(--rfx-display);font-weight:600;white-space:nowrap}
.rfx-pay{text-align:center;font-size:16px;color:var(--rfx-ink);margin:-6px 0 6px}
.rfx-pay strong{font-family:var(--rfx-display);font-weight:800}
.rfx-disclosure{font-size:11px;line-height:1.5;color:var(--rfx-mute);text-align:center;
max-width:56ch;margin:0 auto 18px}
.rfx-note{background:var(--rfx-card);border-left:4px solid var(--rfx-accent);padding:15px 17px;
font-size:15px;color:var(--rfx-ink-2);margin-bottom:22px}
.rfx-recap{border-top:1px solid var(--rfx-line);margin-bottom:22px}
.rfx-recap-row{display:flex;justify-content:space-between;gap:16px;padding:11px 2px;
border-bottom:1px solid var(--rfx-line);font-size:15px}
.rfx-recap-k{color:var(--rfx-mute)}
.rfx-recap-v{font-weight:600;text-align:right}

.rfx-nav{display:flex;align-items:center;gap:12px;margin-top:26px}
.rfx-btn{font-family:var(--rfx-display);font-size:16px;font-weight:600;border-radius:var(--rfx-radius);
padding:15px 26px;cursor:pointer;border:1px solid transparent;text-decoration:none;
display:inline-block;text-align:center;transition:background .14s ease,opacity .14s ease}
.rfx-btn:focus-visible{outline:2px solid var(--rfx-ink);outline-offset:2px}
.rfx-btn-primary{flex:1;background:var(--rfx-action);color:var(--rfx-on-action)}
.rfx-btn-primary:hover{background:var(--rfx-action-hover)}
.rfx-btn-primary[disabled]{opacity:.34;cursor:not-allowed}
.rfx-btn-ghost{background:transparent;color:var(--rfx-ink-2);border-color:var(--rfx-line-2);padding:15px 20px}
.rfx-btn-ghost:hover{border-color:var(--rfx-ink-2)}
.rfx-btn-ghost[hidden]{display:none}
.rfx-fine{font-size:13px;color:var(--rfx-mute);margin-top:16px;max-width:52ch}
.rfx-center{text-align:center;margin-left:auto;margin-right:auto}

.rfx-hub{display:grid;grid-template-columns:repeat(2,1fr);gap:11px}
@media(max-width:520px){.rfx-hub{grid-template-columns:1fr}}
.rfx-hub-card{display:block;background:var(--rfx-card);border:1px solid var(--rfx-line);
border-left:4px solid var(--rfx-accent);border-radius:var(--rfx-radius-card);padding:20px;text-decoration:none;
color:var(--rfx-ink);transition:border-color .14s ease}
.rfx-hub-card:hover{border-color:var(--rfx-ink);border-left-color:var(--rfx-accent)}
.rfx-hub-title{display:block;font-family:var(--rfx-display);font-size:20px;font-weight:700;letter-spacing:-.015em}
.rfx-hub-note{display:block;font-size:14px;color:var(--rfx-mute);margin-top:4px}

.rfx-done-mark{width:46px;height:46px;border-radius:50%;background:var(--rfx-green);
position:relative;margin-bottom:18px}
.rfx-done-mark::after{content:"";position:absolute;left:17px;top:12px;width:9px;height:17px;
border:solid var(--rfx-on-ink);border-width:0 3px 3px 0;transform:rotate(42deg)}
/* --- motion ------------------------------------------------------------- */
/* One entrance per screen change, not per element. Answers the tap. */
.rfx-stage.rfx-in{animation:rfxIn .16s ease-out}
@keyframes rfxIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}

/* Confirms the tap immediately, before the 190ms auto-advance. */
.rfx-opt{transform:translateZ(0)}
.rfx-opt:active{transform:scale(.985)}
.rfx-opt.is-on .rfx-opt-tick::after{animation:rfxTick .18s cubic-bezier(.3,1.4,.5,1)}
@keyframes rfxTick{from{opacity:0;transform:rotate(42deg) scale(.4)}
                   to{opacity:1;transform:rotate(42deg) scale(1)}}

/* The payoff. Bar draws outward from the middle as the number counts up. */
.rfx-range-bar{transform-origin:50% 50%}
.rfx-range.rfx-reveal .rfx-range-bar{animation:rfxBar .62s cubic-bezier(.2,.7,.3,1)}
@keyframes rfxBar{from{transform:scaleX(0)}to{transform:scaleX(1)}}

/* --- optional shadows, off by default ------------------------------------ */
.rfx-opt,.rfx-stepper,.rfx-sat,.rfx-range,.rfx-hub-card{box-shadow:var(--rfx-shadow)}
.rfx-btn-primary{box-shadow:var(--rfx-shadow)}
.rfx-opt:hover,.rfx-hub-card:hover,.rfx-btn-primary:hover{box-shadow:var(--rfx-shadow-lift)}

@media(prefers-reduced-motion:reduce){
  .rfx *,.rfx *::after{transition:none!important;animation:none!important}
}
`;
    document.head.appendChild(st);
  }
})();

(function () {
  "use strict";

  // Captured synchronously. Used to place the funnel exactly where this embed
  // sits on the page when no mount div is present.
  const SELF = document.currentScript;

  /* =========================================================================
     STANDALONE_SERVICE
     -------------------------------------------------------------------------
     Only used when you paste this whole file into a single Embed element and
     there is no <div class="rfx-mount"> on the page.

       "auto"     work it out from the page URL using SETTINGS.pages below.
                  This lets the SAME paste work on all five pages.
       "roofing"  force one specific funnel.
       "hub"      force the service picker.
     ========================================================================= */
  const STANDALONE_SERVICE = "auto";


  /* =========================================================================
     0. BRAND  —  change these to match your brand. Nothing else needs editing.
     -------------------------------------------------------------------------
     Only `ink`, `accent`, and `surface` are really required. Anything you
     leave out is derived from those, so start with three values and add more
     only if you want finer control.

     ink      Primary buttons, headings, selected borders. Your darkest brand
              color. Needs to be dark enough for white text to sit on it.
     accent   Progress bar, price bar, the left edge of a selected card.
              Used for emphasis only, never for text, so it can be bright.
     surface  Page background behind the funnel. Keep it near-white or it
              will fight your Webflow page.
     ========================================================================= */
  const BRAND = {
    // Sampled from the live cenvarroofing.com header and CTA buttons.
    ink:     "#212121",   // header bar dark. Headings, body text, borders.
    action:  "#B42525",   // the red on every CTA. Primary buttons.
    accent:  "#B42525",   // progress bar, price bar, selected card edge.
    surface: "#E9E9E9",   // page background, matches the site exactly.
    card:    "#FFFFFF",

    // Note: the site red (#B42525) is darker than the logo red (#CE202F).
    // Swap accent to "#F8CB0E" (logo yellow) if you want the progress and
    // price bars to read as distinct from the buttons.

    // Optional overrides. Delete a line to have it derived instead.
    inkHover:    null,
    actionHover: null,
    accentDeep:  null,
    tint:        null,
    onInk:       "#FFFFFF",
    onAction:    "#FFFFFF",
    // Cenvar logo green. Used only to mark a chosen answer, so selection reads
    // as confirmation rather than as another call to action competing with the
    // red button. Change to null to fall back to the accent colour.
    selected:    "#056A38",
    // The price panel. Dark so the figure carries weight against the page.
    panel:       "#212121",
    onPanel:     "#FFFFFF",
    // Monthly payment, on the panel. Contrasting so the payment and the total
    // read as equally important rather than one being a footnote.
    payAccent:   "#F8CB0E",
    green:       "#056A38",
    red:         "#B42525",

    // Corner rounding. `radius` covers buttons and form fields.
    // `radiusCard` covers option cards and panels; raise it to match if you
    // want everything on the same curve.
    radius:     "10px",
    radiusCard: "10px",   // answer cards, panels, satellite frame, hub tiles

    // false keeps the funnel flat, matching cenvarroofing.com, which has no
    // shadows anywhere. true lifts the cards off the page. The shadow colour
    // is derived from `ink` so it reads as tinted rather than generic grey.
    shadows: false,

    logoUrl: "",
    logoAlt: "Cenvar Roofing & Exteriors",

    // "inherit" makes the funnel pick up whatever font the Webflow page already
    // loads, so it matches your site without naming a family. To force one
    // instead, set fontUrl to a Google Fonts URL and name the families here.
    fontUrl:     "",
    displayFont: "inherit",
    bodyFont:    "inherit"
  };

  /* --- Brand plumbing. You should not need to touch anything below here. --- */
  function hexToRgb(h) {
    const s = h.replace("#", "");
    const n = parseInt(s.length === 3 ? s.split("").map((c) => c + c).join("") : s, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function mix(hex, toward, t) {
    const a = hexToRgb(hex), b = hexToRgb(toward);
    return "#" + a.map((v, i) => Math.round(v + (b[i] - v) * t)
      .toString(16).padStart(2, "0")).join("");
  }
  // Relative luminance and contrast, per WCAG 2.1.
  function relLum(hex) {
    return hexToRgb(hex).map((v) => v / 255)
      .map((c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)))
      .reduce((a, c, i) => a + [0.2126, 0.7152, 0.0722][i] * c, 0);
  }
  function contrast(a, b) {
    const x = relLum(a), y = relLum(b);
    return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
  }
  // Lighten `hex` toward white as far as it can go while still clearing `need`
  // against every background it will sit on. Saturated brand colors lose
  // contrast much faster than neutrals, so this is solved rather than assumed.
  function lightenToLimit(hex, backgrounds, need) {
    let best = hex;
    for (let t = 0; t <= 0.6; t += 0.02) {
      const c = mix(hex, "#FFFFFF", t);
      if (backgrounds.every((bg) => contrast(c, bg) >= need)) best = c;
      else break;
    }
    return best;
  }

  function brandVars() {
    const B = BRAND, W = "#FFFFFF", K = "#000000";
    const card = B.card || W;
    const bgs = [card, B.surface];
    const action = B.action || B.ink;
    return {
      "--rfx-ink":         B.ink,
      "--rfx-ink-hover":   B.inkHover   || mix(B.ink, K, 0.28),
      "--rfx-mute":        B.mute       || lightenToLimit(B.ink, bgs, 4.5),
      "--rfx-ink-2":       B.ink2       || lightenToLimit(B.ink, bgs, 7.0),
      "--rfx-line":        B.line       || mix(B.ink, W, 0.82),
      "--rfx-line-2":      B.line2      || mix(B.ink, W, 0.70),
      "--rfx-action":      action,
      "--rfx-action-hover": B.actionHover || mix(action, K, 0.22),
      "--rfx-on-action":   B.onAction   || W,
      "--rfx-accent":      B.accent,
      "--rfx-accent-deep": B.accentDeep || mix(B.accent, K, 0.24),
      "--rfx-surface":     B.surface,
      "--rfx-card":        B.card       || W,
      "--rfx-selected":    B.selected   || B.accent,
      "--rfx-panel":       B.panel      || B.ink,
      "--rfx-on-panel":    B.onPanel    || "#FFFFFF",
      "--rfx-panel-mute":  mix(B.panel || B.ink, W, 0.48),
      "--rfx-pay":         B.payAccent  || B.accent,
      "--rfx-tint":        B.tint       || mix(B.selected || B.accent, W, 0.93),
      "--rfx-on-ink":      B.onInk      || W,
      "--rfx-scrim":       "rgba(" + hexToRgb(B.ink).join(",") + ",.88)",
      "--rfx-green":       B.green      || "#3E7A5E",
      "--rfx-red":         B.red        || "#A33B2E",
      "--rfx-shadow":      B.shadows
        ? "0 1px 2px rgba(" + hexToRgb(B.ink).join(",") + ",.07), " +
          "0 6px 16px rgba(" + hexToRgb(B.ink).join(",") + ",.08)"
        : "none",
      "--rfx-shadow-lift": B.shadows
        ? "0 2px 4px rgba(" + hexToRgb(B.ink).join(",") + ",.09), " +
          "0 10px 24px rgba(" + hexToRgb(B.ink).join(",") + ",.11)"
        : "none",
      "--rfx-radius":      B.radius     || "10px",
      "--rfx-radius-card": B.radiusCard || "3px",
      "--rfx-display":     B.displayFont,
      "--rfx-body":        B.bodyFont
    };
  }
  function applyBrand(el) {
    const v = brandVars();
    Object.keys(v).forEach((k) => el.style.setProperty(k, v[k]));
  }
  (function loadBrandFont() {
    if (!BRAND.fontUrl) return;
    if (document.querySelector('link[data-rfx-font]')) return;
    ["https://fonts.googleapis.com", "https://fonts.gstatic.com"].forEach((h) => {
      const p = document.createElement("link");
      p.rel = "preconnect"; p.href = h;
      if (h.indexOf("gstatic") > -1) p.crossOrigin = "";
      document.head.appendChild(p);
    });
    const l = document.createElement("link");
    l.rel = "stylesheet"; l.href = BRAND.fontUrl; l.setAttribute("data-rfx-font", "1");
    document.head.appendChild(l);
  })();

  /* =========================================================================
     1. SETTINGS  —  TODO items live here
     ========================================================================= */
  const SETTINGS = {
    hubspot: {
      portalId: "40800308",
      formGuid: "aada93c7-e9b3-4b90-8f98-13511d6c6ce3",
      properties: {
        firstName: "firstname", lastName: "lastname",
        email: "email", phone: "phone",
        address: "address", zip: "zip",
        // Prefixed so they are obviously this funnel's fields. The portal
        // already has several overlapping service/roof properties; adding
        // unprefixed ones would make that worse.
        service: "estimator_service",
        estimateLow: "estimator_low_estimate", estimateHigh: "estimator_high_estimate",
        details: "estimator_details"
      }
    },
    google: {
      // TODO. Enable Maps JavaScript API, Places API, Static Maps API.
      // Restrict the key by HTTP referrer to your Webflow domain.
      // Left blank, the address step becomes a plain text input.
      mapsKey: "AIzaSyB6zBRGSktgccadfgHSsPm4JNqTFQoejJY",
      satelliteZoom: 19,
      // Street View framing. Omitting heading makes Google point the camera at
      // the address from wherever the nearest photo was taken, which is what
      // you want. source=outdoor keeps it off indoor business panoramas.
      streetFov: 80,
      streetPitch: 8
    },
    pages: {
      roofing: "/lander-roofing-estimate",
      windows: "/lander-windows-estimate",
      doors:   "/lander-doors-estimate",
      siding:  "/lander-siding-estimate",
      solar:   "/lander-solar-estimate"   // TODO: create this page
    },
    // Pulled from cenvarroofing.com. Edit if any of it is stale.
    company: {
      name:      "Cenvar",
      // CallTrackingMetrics number. Used for every call link in the funnel so
      // estimator calls are attributable. Changing it here changes it
      // everywhere: the price-screen button and the submission-error message.
      phone:     "(888) 902-3501",
      phoneHref: "tel:8889023501",
      hours:     "",   // optional, e.g. "Mon to Fri, 8am to 5pm"

      // If you use CallTrackingMetrics dynamic number insertion, its script
      // scans the DOM at page load. The price screen renders later, so the
      // number below will NOT be swapped unless CTM is told to rescan. Put
      // that rescan call here and it runs each time a call button appears.
      // Leave null if you use one fixed tracking number, which is the default.
      // Example:  onCallRendered: function () { window.__ctm.tracker.scan(); }
      onCallRendered: null,

      // Shown under the price. This is the line that answers sticker shock.
      reassurance: "$0 down until the job is done. You don't pay until you're 100% satisfied.",
      // Sits under the price. Frames the range as a starting point and points
      // at the call, rather than apologising for not being exact.
      priceCaveat: "This is what work like yours typically costs. A free measurement " +
        "gives you the exact number, with no pressure to book.",
      // Default credibility line. Any service can override it with its own
      // `trustLine`. A manufacturer credential only belongs on the trade it
      // applies to, so Owens Corning lives on roofing and nowhere else.
      trustLine: "4.9 stars across 9,400+ reviews · BBB A+ rated",

      // Three tiles under the call button. Set to [] to hide the row.
      stats: [
        { n: "15,000+", t: "jobs completed" },
        { n: "9,400+",  t: "reviews" },
        { n: "2+",      t: "decades serving neighbors" }
      ]
    },

    // Header images. Upload to Webflow assets and paste the URLs into each
    // service's `image` below.
    //   "first"  banner on the address screen only. Questions stay full height,
    //            which matters on a phone. This is the default.
    //   "all"    banner on every screen of the funnel.
    //   "none"   no banners, even if URLs are set.
    imageOn: "first",
    imageRatio: "21 / 9",        // wide banner; "16 / 9" if you want it taller

    /* =======================================================================
       FINANCING  —  Service Finance Company
       -----------------------------------------------------------------------
       DISABLED until every field below is filled in from your SFC rate card.
       Leave `enabled` false and no payment line appears anywhere.

       This is built to quote a WELL QUALIFIED BUYER: best tier, longest term,
       lowest payment. That is a normal way to advertise, but it makes the
       disclosure obligatory rather than decorative.

       Under Regulation Z, stating a monthly payment is a "triggering term".
       Once a payment appears, the advertisement must also state the amount or
       percentage of any downpayment, the terms of repayment, and the annual
       percentage rate using that phrase. Get the exact wording from SFC's
       compliance team and paste it into `disclosure` below. Do not write it
       yourself and do not shorten theirs.
       ======================================================================= */
    /* =======================================================================
       FINANCING  —  Service Finance Company
       -----------------------------------------------------------------------
       Plans transcribed from the SFC residential rate sheet. `active` picks
       which one the funnel quotes. #4107 is the longest term and therefore
       the lowest monthly payment, which is the well-qualified-buyer framing.

       Payments use SFC's own payment factor rather than a calculated
       amortisation, so the funnel quotes exactly what your rate sheet does.

       SOLAR IS SEPARATE and stays off until those rates arrive.

       Regulation Z: a stated payment is a triggering term. The disclosure
       below is required, not decorative, and must come from SFC.
       ======================================================================= */
    financing: {
      enabled: true,

      plans: {
        // SFC confirmed 9.99 is both the interest rate and the APR: there are
        // no fees financed into the loan, so the two are identical. It is the
        // STARTING rate, meaning the best tier rather than what every buyer
        // gets, which is why the disclosure qualifies it.
        "4107": { label: "Plan #4107", rate: 9.99, apr: 9.99, months: 180,
                  factor: 0.0107, min: 3000, max: 100000, rateIsStarting: true },
        "4132": { label: "Plan #4132", rate: 9.99, months: 120, factor: 0.0132,
                  min: 3000, max: 100000 },
        "4202": { label: "Plan #4202", rate: 7.99, months: 60,  factor: 0.0202,
                  min: 1000, max: 100000 },
        // Deferred and same-as-cash plans have no meaningful monthly figure to
        // advertise, so they are here for reference only.
        "1006": { label: "Plan #1006", rate: null, months: 6,  factor: null,
                  min: 500,  max: 100000, note: "deferred interest" },
        "1018": { label: "Plan #1018", rate: null, months: 18, factor: null,
                  min: 1000, max: 100000, note: "deferred interest" },
        "2012": { label: "Plan #2012", rate: 0,    months: 12, factor: null,
                  min: 1000, max: 100000, note: "zero interest, same as cash" }
      },

      // Which plan each service quotes. null means no payment is shown.
      /* Every service quotes the 180 month plan. It is the longest term and
         therefore the lowest monthly payment, which is what we advertise.
         The shorter plans stay in `plans` for reference only. If you ever
         switch one, the disclosure follows automatically. */
      byService: {
        roofing: "4107", windows: "4107", doors: "4107", siding: "4107",
        solar:   null      // awaiting the solar rate sheet
      },

      downPayment: 0,

      // If SFC's dealer fee means financed jobs are priced above cash,
      // set this above 1.0 so payments come off the financed price.
      priceFactor: 1.0,

      /* REQUIRED once payments are shown. Send this to SFC for approval
         before launch; it is drafted, not certified.

         {months} and {rate} are filled from whichever plan is active, so the
         disclosure can never describe a different term to the one being
         quoted. Do not hard-code the numbers back in.

         OUTSTANDING: the rate sheet says "interest rate". Regulation Z
         requires the ANNUAL PERCENTAGE RATE. If SFC's fees make the APR
         higher than 9.99%, add an `apr` to the plan and this line will use
         it instead of the interest rate. */
      disclosure:
        "Estimated monthly payment is for well qualified buyers with approved " +
        "credit and assumes financing of the full estimated amount with $0 down, " +
        "repaid over {months} months at an annual percentage rate of {rate}%. That " +
        "is our lowest available rate; rates start there and increase based on " +
        "creditworthiness, so your payment may be higher. Payment shown is an " +
        "estimate based on a preliminary price range, not a final quote or an offer " +
        "of credit. Actual rate, term, and payment depend on creditworthiness, final " +
        "project cost, and lender approval. Financing provided by Service Finance " +
        "Company, LLC. Subject to credit approval. Minimum amount financed {min}."
    },

    bookingUrl: "",              // TODO: HubSpot meetings link
    tracking: { adsConversionId: null },   // TODO: e.g. "AW-123456789/AbC-D_efGh"
    roundTo: 50,

    // Internal QA only. true removes the contact step so the price shows
    // straight after the last question, and disables the HubSpot submission.
    // MUST stay false on the live site or you collect no leads.
    previewMode: false
  };

  /* =========================================================================
     2. PRICES  —  generated from Pricing_Ranges_For_Ad_Funnel workbook
        roofing  material|size|pitch                    -> [low, high]
        siding   material|size|stories                  -> [low, high]
        windows  material|condition                     -> [ [low,high] x50 ] by count
        doors    type|material|glass|surround|hardware   -> [low, high]
        openEnded lists keys whose top end is open ("+")
     ========================================================================= */
  const RATES = {"prices":{"siding":{"vinyl|u1500|one":[8382,15982],"vinyl|u1500|two":[10528,20003],"vinyl|u1500|three":[12588,22999],"vinyl|b1525|one":[9814,19975],"vinyl|b1525|two":[11898,25006],"vinyl|b1525|three":[14020,30021],"vinyl|b2535|one":[11923,23014],"vinyl|b2535|two":[15429,31007],"vinyl|b2535|three":[18218,35996],"vinyl|o3500|one":[14024,26019],"vinyl|o3500|two":[18911,35975],"vinyl|o3500|three":[22428,42022],"insulated|u1500|one":[10793,25624],"insulated|u1500|two":[13519,32017],"insulated|u1500|three":[16214,36820],"insulated|b1525|one":[12590,32003],"insulated|b1525|two":[15284,40019],"insulated|b1525|three":[17996,47986],"insulated|b2535|one":[15311,36803],"insulated|b2535|two":[19779,49587],"insulated|b2535|three":[23418,57607],"insulated|o3500|one":[17994,41573],"insulated|o3500|two":[24278,57576],"insulated|o3500|three":[28823,67210]},"windows":{"vinyl|none":[[584,1221],[1218,2391],[1791,3598],[2410,4809],[2990,5975],[3629,7213],[4225,8396],[4810,9605],[5371,10826],[6001,11986],[6584,13177],[7173,14393],[7812,15605],[8398,16798],[9019,18008],[9627,19188],[10216,20388],[10807,21573],[11410,22779],[12002,24007],[12592,25174],[13226,26404],[13784,27626],[14429,28779],[15027,30013],[15570,31195],[16225,32374],[16819,33596],[17419,34780],[18027,35995],[18626,37207],[19211,38379],[19817,39579],[20425,40806],[21009,41972],[21601,43184],[22191,44415],[22775,45604],[23385,46815],[24030,47999],[24619,49190],[25203,50406],[25812,51598],[26381,52775],[26984,53970],[27613,55198],[28198,56386],[28799,57589],[29410,58784],[30018,60008]],"vinyl|wear":[[673,1221],[1277,2499],[1955,3733],[2598,5020],[3274,6221],[3884,7481],[4531,8743],[5221,10017],[5845,11221],[6472,12509],[7170,13752],[7775,14990],[8458,16271],[9113,17494],[9743,18729],[10371,20001],[11061,21280],[11730,22494],[12346,23758],[12987,24991],[13661,26254],[14316,27499],[14938,28775],[15622,29994],[16223,31256],[16924,32504],[17578,33737],[18187,35023],[18828,36267],[19506,37496],[20151,38734],[20771,40012],[21468,41220],[22119,42483],[22763,43724],[23372,44970],[24022,46233],[24717,47488],[25339,48759],[26025,49970],[26647,51245],[27298,52490],[27933,53756],[28614,54970],[29230,56240],[29901,57503],[30567,58733],[31217,59984],[31820,61268],[32496,62477]],"vinyl|rot":[[682,1308],[1420,2595],[2101,3897],[2787,5175],[3491,6530],[4198,7806],[4899,9109],[5570,10415],[6273,11677],[7019,13003],[7707,14304],[8420,15616],[9097,16925],[9824,18221],[10501,19501],[11198,20775],[11880,22120],[12579,23424],[13283,24717],[13999,26030],[14682,27290],[15397,28617],[16101,29911],[16819,31194],[17529,32511],[18192,33830],[18876,35123],[19580,36422],[20298,37689],[20998,39003],[21677,40295],[22373,41594],[23130,42889],[23811,44195],[24480,45508],[25179,46811],[25928,48087],[26572,49393],[27328,50685],[28009,52012],[28730,53298],[29391,54611],[30109,55886],[30791,57227],[31473,58525],[32228,59804],[32928,61109],[33571,62393],[34273,63726],[34985,65012]],"woodclad|none":[[1012,2020],[2024,4018],[3018,5990],[4012,7978],[4995,10003],[6013,11972],[6974,13991],[7980,16015],[8984,18022],[10023,19991],[10989,22030],[12028,23979],[13011,25988],[13995,27984],[14994,29975],[16009,32004],[16986,34003],[18029,36002],[19024,37992],[19979,40017],[20977,41982],[21979,44027],[22984,45984],[23977,47990],[24989,50022],[25990,51985],[26977,54001],[27976,55972],[28993,58005],[30013,60008],[30979,61987],[32006,64020],[33029,65986],[33977,67980],[35012,69996],[36026,72027],[37016,73991],[38015,75985],[38983,77989],[39997,80019],[40976,81980],[41994,84021],[42991,85991],[44010,88015],[45022,89978],[45999,91994],[46987,93974],[48021,95987],[49016,97998],[50025,99989]],"woodclad|wear":[[1070,2079],[2076,4089],[3168,6140],[4187,8229],[5229,10253],[6308,12289],[7327,14347],[8376,16404],[9455,18451],[10507,20475],[11575,22524],[12574,24582],[13641,26638],[14688,28695],[15774,30769],[16787,32789],[17861,34820],[18924,36922],[19968,38933],[21009,40997],[22072,43071],[23075,45104],[24157,47143],[25222,49208],[26224,51232],[27314,53297],[28378,55330],[29386,57371],[30435,59475],[31493,61530],[32548,63562],[33583,65589],[34666,67641],[35701,69729],[36730,71742],[37810,73826],[38841,75829],[39903,77897],[40942,79949],[42004,81980],[43051,84061],[44082,86086],[45136,88144],[46224,90218],[47261,92261],[48322,94271],[49374,96354],[50398,98397],[51458,100456],[52489,102487]],"woodclad|rot":[[1118,2122],[2194,4205],[3285,6312],[4392,8428],[5503,10477],[6604,12628],[7712,14717],[8813,16809],[9896,18928],[10999,21023],[12109,23082],[13207,25201],[14303,27298],[15393,29425],[16470,31501],[17615,33573],[18676,35677],[19794,37777],[20910,39923],[21994,41988],[23074,44085],[24178,46187],[25293,48316],[26395,50425],[27470,52473],[28623,54621],[29693,56683],[30813,58828],[31870,60879],[32974,63025],[34091,65117],[35194,67202],[36285,69316],[37412,71377],[38497,73529],[39616,75577],[40717,77696],[41784,79827],[42928,81924],[43998,83998],[45117,86112],[46223,88174],[47291,90295],[48423,92408],[49484,94528],[50585,96575],[51708,98679],[52778,100813],[53912,102897],[55019,105002]]},"doors":{"single|steel|none|no|standard":[1879,2382],"single|steel|none|no|premium":[2691,3176],"single|steel|none|one|standard":[4104,4582],"single|steel|none|one|premium":[4884,5401],"single|steel|none|both|standard":[5115,5583],"single|steel|none|both|premium":[5878,6392],"single|steel|half|no|standard":[3189,3698],"single|steel|half|no|premium":[4003,4494],"single|steel|half|one|standard":[5429,5906],"single|steel|half|one|premium":[6213,6680],"single|steel|half|both|standard":[6424,6926],"single|steel|half|both|premium":[7217,7730],"single|steel|full|no|standard":[4070,4593],"single|steel|full|no|premium":[4873,5426],"single|steel|full|one|standard":[6313,6820],"single|steel|full|one|premium":[7096,7624],"single|steel|full|both|standard":[7283,7804],"single|steel|full|both|premium":[8103,8572],"single|fiberglass|none|no|standard":[3319,3807],"single|fiberglass|none|no|premium":[4071,4625],"single|fiberglass|none|one|standard":[5524,6026],"single|fiberglass|none|one|premium":[6280,6790],"single|fiberglass|none|both|standard":[6516,6985],"single|fiberglass|none|both|premium":[7293,7829],"single|fiberglass|half|no|standard":[4593,5112],"single|fiberglass|half|no|premium":[5404,5887],"single|fiberglass|half|one|standard":[6774,7290],"single|fiberglass|half|one|premium":[7593,8126],"single|fiberglass|half|both|standard":[7822,8308],"single|fiberglass|half|both|premium":[8592,9078],"single|fiberglass|full|no|standard":[5491,5974],"single|fiberglass|full|no|premium":[6288,6772],"single|fiberglass|full|one|standard":[7725,8178],"single|fiberglass|full|one|premium":[8518,9001],"single|fiberglass|full|both|standard":[8704,9201],"single|fiberglass|full|both|premium":[9472,10010],"double|steel|none|no|standard":[3991,5172],"double|steel|none|no|premium":[5798,6982],"double|steel|none|one|standard":[8180,9381],"double|steel|none|one|premium":[9990,11228],"double|steel|none|both|standard":[10013,11218],"double|steel|none|both|premium":[11824,12986],"double|steel|half|no|standard":[6828,7986],"double|steel|half|no|premium":[8597,9793],"double|steel|half|one|standard":[11006,12177],"double|steel|half|one|premium":[12776,14025],"double|steel|half|both|standard":[12818,13988],"double|steel|half|both|premium":[14602,15779],"double|steel|full|no|standard":[8196,9398],"double|steel|full|no|premium":[10016,11196],"double|steel|full|one|standard":[12415,13602],"double|steel|full|one|premium":[14188,15383],"double|steel|full|both|standard":[14189,15408],"double|steel|full|both|premium":[15972,17177],"double|fiberglass|none|no|standard":[6827,7970],"double|fiberglass|none|no|premium":[8602,9782],"double|fiberglass|none|one|standard":[11020,12170],"double|fiberglass|none|one|premium":[12779,13994],"double|fiberglass|none|both|standard":[12806,14006],"double|fiberglass|none|both|premium":[14618,15786],"double|fiberglass|half|no|standard":[9629,10802],"double|fiberglass|half|no|premium":[11393,12627],"double|fiberglass|half|one|standard":[13809,14972],"double|fiberglass|half|one|premium":[15612,16794],"double|fiberglass|half|both|standard":[15594,16816],"double|fiberglass|half|both|premium":[17405,18590],"double|fiberglass|full|no|standard":[10993,12184],"double|fiberglass|full|no|premium":[12784,13994],"double|fiberglass|full|one|standard":[15217,16421],"double|fiberglass|full|one|premium":[17001,18209],"double|fiberglass|full|both|standard":[17012,18226],"double|fiberglass|full|both|premium":[18784,20017],"sliding|stdseries|p2|stdcfg|standard":[2494,3424],"sliding|stdseries|p2|complex|standard":[4005,4915],"sliding|stdseries|p2|stdcfg|premium":[3202,4082],"sliding|stdseries|p2|complex|premium":[4720,5571],"sliding|premseries|p2|stdcfg|standard":[3913,4778],"sliding|premseries|p2|complex|standard":[5425,6276],"sliding|premseries|p2|stdcfg|premium":[4622,5525],"sliding|premseries|p2|complex|premium":[6117,7006],"sliding|stdseries|p3|stdcfg|standard":[4327,5189],"sliding|stdseries|p3|complex|standard":[5807,6673],"sliding|stdseries|p3|stdcfg|premium":[5021,5930],"sliding|stdseries|p3|complex|premium":[6518,7386],"sliding|premseries|p3|stdcfg|standard":[5672,6609],"sliding|premseries|p3|complex|standard":[7178,8114],"sliding|premseries|p3|stdcfg|premium":[6421,7279],"sliding|premseries|p3|complex|premium":[7888,8781],"sliding|stdseries|p4|stdcfg|standard":[5509,6430],"sliding|stdseries|p4|complex|standard":[6999,7883],"sliding|stdseries|p4|stdcfg|premium":[6218,7120],"sliding|stdseries|p4|complex|premium":[7705,8612],"sliding|premseries|p4|stdcfg|standard":[6904,7826],"sliding|premseries|p4|complex|standard":[8402,9329],"sliding|premseries|p4|stdcfg|premium":[7614,8480],"sliding|premseries|p4|complex|premium":[9101,10001]},"roofing":{"shingle|s1015|normal":[4652,8416],"shingle|s1015|steep":[5577,10520],"shingle|s1520|normal":[6972,11180],"shingle|s1520|steep":[8372,13992],"shingle|s2030|normal":[9311,16772],"shingle|s2030|steep":[11140,21023],"shingle|s3040|normal":[13977,22423],"shingle|s3040|steep":[16716,28004],"corrugated|s1015|normal":[7139,11425],"corrugated|s1015|steep":[8603,14254],"corrugated|s1520|normal":[10717,15194],"corrugated|s1520|steep":[12858,18990],"corrugated|s2030|normal":[14316,22786],"corrugated|s2030|steep":[17159,28471],"corrugated|s3040|normal":[21448,30421],"corrugated|s3040|steep":[25741,38008],"standing|s1015|normal":[9016,15625],"standing|s1015|steep":[10794,19519],"standing|s1520|normal":[13518,20801],"standing|s1520|steep":[16174,25970],"standing|s2030|normal":[18021,31228],"standing|s2030|steep":[21580,39018],"standing|s3040|normal":[27028,41588],"standing|s3040|steep":[32417,51981]}},"openEnded":{"siding":["vinyl|o3500|one","vinyl|o3500|two","vinyl|o3500|three","insulated|o3500|one","insulated|o3500|two","insulated|o3500|three"],"roofing":["shingle|s3040|normal","shingle|s3040|steep","corrugated|s3040|normal","corrugated|s3040|steep","standing|s3040|normal","standing|s3040|steep"]}};
  const PRICES = RATES.prices;
  const OPEN = {};
  Object.keys(RATES.openEnded || {}).forEach((k) => {
    OPEN[k] = new Set(RATES.openEnded[k]);
  });

  /* =========================================================================
     3. SERVICES
     ========================================================================= */
  const ENTRY_QUESTIONS = [
    { id: "material", heading: "What material?", cols: 1, options: [
      { v: "fiberglass", t: "Fiberglass", n: "Wood look, will not warp or dent" },
      { v: "steel",      t: "Steel",      n: "Durable, best value" },
      { v: "unsure",     t: "Not sure",   n: "We will show you both" } ] },
    { id: "glass", heading: "How much glass?", cols: 1, options: [
      { v: "none",     t: "No glass" },
      { v: "half",     t: "Half glass" },
      { v: "full",     t: "Full glass" },
      { v: "small",    t: "Small decorative glass" },
      { v: "fulldeco", t: "Full decorative glass" } ] },
    { id: "surround", heading: "Transom or sidelight?", cols: 1, options: [
      { v: "no",        t: "Neither" },
      { v: "transom",   t: "Transom",   n: "Window above the door" },
      { v: "sidelight", t: "Sidelight", n: "Window beside the door" },
      { v: "both",      t: "Both" } ] },
    { id: "hardware", heading: "What type of hardware would you like?", cols: 2, options: [
      { v: "standard", t: "Standard" },
      { v: "premium",  t: "Premium", n: "Heavier finish, better lockset" } ] }
  ];

  // Sliding doors no longer ask about the opening, so the price assumes one.
  // "stdcfg" is the sheet's Standard Configuration: the door goes back into the
  // existing opening, which covers most replacements. "complex" is Premium /
  // Complex and runs roughly $1,500 higher on a two-panel.
  //   "stdcfg"  quote the common case, adjust upward on site if the opening changes
  //   "complex" quote high so the site visit only ever brings the number down
  //   "span"    show the full range from standard low to complex high
  const SLIDING_CONFIG = "stdcfg";

  const SLIDING_QUESTIONS = [
    { id: "panels", heading: "How many panels?", cols: 1, options: [
      { v: "p2", t: "Two panels",  n: "Standard size, one slides" },
      { v: "p3", t: "Three panels", n: "Wider opening" },
      { v: "p4", t: "Four panels or oversized" } ] },
    { id: "series", heading: "Which series?", cols: 2, options: [
      { v: "stdseries",  t: "Standard", n: "Our core line" },
      // Labelled Luxury, not Premium, so it is not confused with Premium
      // hardware two questions later. The pricing key is unchanged.
      { v: "premseries", t: "Luxury",   n: "Heavier frame, better glass package" } ] },
    { id: "hardware", heading: "What type of hardware would you like?", cols: 2, options: [
      { v: "standard", t: "Standard" },
      { v: "premium",  t: "Premium" } ] }
  ];

  function span(list) {
    return { low: Math.min.apply(null, list.map((x) => x[0])),
             high: Math.max.apply(null, list.map((x) => x[1])) };
  }

  /* =========================================================================
     SOLAR PRICING
     -------------------------------------------------------------------------
     Unlike the other four trades, solar is calculated rather than looked up.
     Bill -> annual kWh -> system size -> price per watt. Every assumption is
     here; change one and every solar quote moves.

     NOTE ON INCENTIVES: the 30% federal residential credit (IRC 25D) ended on
     31 Dec 2025. Homeowners buying with cash or a loan get nothing federally,
     so no credit is netted off and none should be mentioned in the copy.
     ========================================================================= */
  const SOLAR = {
    /* -----------------------------------------------------------------------
       Fitted from 101 real Cenvar jobs, segmented by mount and battery.
       Cost is linear in system size: a dollars-per-kW slope plus a fixed
       amount for permitting, design and mobilisation that does not scale.

         roof    $2,523/kW + $4,456     R2 0.87   (80 jobs)
         ground  $3,122/kW +   $473     R2 0.92   ( 9 jobs, treat as provisional)

       The band multipliers capture roughly 70% of past jobs. Widen them to
       catch more, at the cost of a range customers find less useful.
    ----------------------------------------------------------------------- */
    fit: {
      roof:   { perKw: 2523, fixed: 4456, lo: 0.86, hi: 1.11 },
      ground: { perKw: 3122, fixed: 473,  lo: 0.83, hi: 1.12 }
    },

    /* Bill to system size, fitted on the same 101 jobs:
         kW = 0.0316 x bill + 3.47      R2 0.49
       The R2 is low because two households with the same bill routinely buy
       very different systems. That is real customer choice, not measurement
       error, and it is why the quote band cannot be narrow. */
    size: { perDollar: 0.0316, base: 3.47 },

    /* The sizing curve is an average across roofs that were sunny and shaded
       alike, so shade is applied as a symmetric nudge around it rather than a
       one-way derate. A one-way derate on top of an averaged curve would bias
       every quote upward. */
    shade: { full: 0.96, partial: 1.12 },

    cap: { roof: 25, ground: 25 },

    /* FranklinWH aPower 2, installed. Confirmed against three jobs: remove
       these amounts and the remaining solar lands inside the roof band. */
    battery: { none: 0, kwh15: 17500, kwh30: 30000 },

    /* Midpoint of each bill bucket. Virginia households average $146-$177 a
       month at 15-17 cents per kWh, which is why the second bucket is flagged
       as typical on screen. */
    bill: { u100: 75, b100: 137, b175: 212, b250: 300, o350: 475 },

    /* Direct-size path, for customers who already know what they want. */
    kwRange: { min: 4, max: 30, start: 10, step: 1 },
    wattsPerPanel: 450
  };

  const SERVICES = {
    roofing: {
      label: "Roofing", hubNote: "Shingle, corrugated, or standing seam",
      intro: "Get your roof price in about a minute",
      trustLine: "Owens Corning Platinum Preferred · 4.9 stars across 9,400+ reviews",
      // "street" uses Street View and falls back to satellite where Google
      // has no imagery. "satellite" always uses the overhead view.
      view: "satellite",   // overhead shows the roof planes and dormers
      // Inlined as a CSS mask, so the icon takes the colour of the text
      // beside it rather than being locked to white. ~4KB, no hosting needed.
      icon: "data:image/png;base64,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",
      // TODO: upload roofing-banner.jpg and roofing-tile.jpg to Webflow assets,
      // then paste the two asset URLs here.
      image: "https://cdn.prod.website-files.com/64244447fb8d73d5af3e8ce8/6a96f1e7e0cbe7cbea5b5d59_Funnel%20Pics.jpg", hubImage: "https://cdn.prod.website-files.com/64244447fb8d73d5af3e8ce8/6a96f1e54563089fded6ef7e_Funnel%20Pics%20No%20Watermark.jpg", imageAlt: "A completed Cenvar shingle roof",
      questions: [
        { id: "material", heading: "What type of roof would you like a price on?", cols: 1, options: [
          { v: "shingle",   t: "Asphalt shingles" },
          { v: "corrugated", t: "Corrugated metal" },
          { v: "standing",  t: "Standing seam metal" },
          { v: "unsure",    t: "Not sure yet", n: "We will price all three" } ] },
        { id: "size", heading: "How big is your home?", cols: 1, options: [
          { v: "s1015", t: "Up to 1,500 sq ft" },
          { v: "s1520", t: "1,500 to 2,000 sq ft" },
          { v: "s2030", t: "2,000 to 3,000 sq ft" },
          { v: "s3040", t: "3,000 sq ft and up" } ] },
        // This note is what defines the boundary for the customer, and the
        // answer moves the price by roughly 18%. Keep both sides worded as a
        // pair so there is no gap between them.
        { id: "pitch", heading: "How steep is your roof?", cols: 1, options: [
          { v: "normal", t: "Not very steep", n: "You could walk up it without sliding" },
          { v: "steep",  t: "Very steep",     n: "Too steep to walk on safely" } ] }
      ],
      price(a) {
        const label = { shingle: "Asphalt shingle", corrugated: "Corrugated metal", standing: "Standing seam" };
        const key = (m) => m + "|" + a.size + "|" + a.pitch;
        if (a.material === "unsure") {
          const rows = ["shingle", "corrugated", "standing"].map((m) => ({
            label: label[m], low: PRICES.roofing[key(m)][0], high: PRICES.roofing[key(m)][1],
            plus: OPEN.roofing && OPEN.roofing.has(key(m))
          }));
          const s = span(rows.map((r) => [r.low, r.high]));
          return { low: s.low, high: s.high, plus: rows.some((r) => r.plus), breakdown: rows };
        }
        const b = PRICES.roofing[key(a.material)];
        return { low: b[0], high: b[1], plus: OPEN.roofing && OPEN.roofing.has(key(a.material)) };
      }
    },

    windows: {
      label: "Windows", hubNote: "Priced per window, 1 to 50",
      intro: "Get your window price in about a minute",
      // "street" uses Street View and falls back to satellite where Google
      // has no imagery. "satellite" always uses the overhead view.
      view: "street",   // the front elevation is where the windows are
      // Inlined as a CSS mask, so the icon takes the colour of the text
      // beside it rather than being locked to white. ~4KB, no hosting needed.
      icon: "data:image/png;base64,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",
      // TODO: upload windows-banner.jpg and windows-tile.jpg to Webflow assets,
      // then paste the two asset URLs here.
      image: "https://cdn.prod.website-files.com/64244447fb8d73d5af3e8ce8/6a96f1e535a8959f8bd46c8c_Funnel%20Pics-4.jpg", hubImage: "https://cdn.prod.website-files.com/64244447fb8d73d5af3e8ce8/6a96f1e7e0cbe7cbea5b5d98_Funnel%20Pics%20No%20Watermark-4.jpg", imageAlt: "Black-framed windows on a modern home",
      questions: [
        { id: "count", type: "stepper", heading: "How many windows?", min: 1, max: 50, start: 8,
          caption: "A close count is fine. We measure exactly on site.",
          quick: [4, 8, 12, 20] },
        { id: "material", heading: "What frame material?", cols: 1, options: [
          { v: "vinyl",    t: "Vinyl",           n: "Best value" },
          { v: "woodclad", t: "Wood-clad vinyl", n: "Premium look" },
          { v: "unsure",   t: "Not sure yet",    n: "We will show you both" } ] },
        { id: "condition", heading: "How are the existing frames?", cols: 1, options: [
          { v: "none", t: "Solid",                 n: "Just old glass or sashes" },
          { v: "wear", t: "Some wear" },
          { v: "rot",  t: "Visible rot or damage" } ] }
      ],
      price(a) {
        const i = a.count - 1;
        const label = { vinyl: "Vinyl", woodclad: "Wood-clad vinyl" };
        if (a.material === "unsure") {
          const rows = ["vinyl", "woodclad"].map((m) => {
            const b = PRICES.windows[m + "|" + a.condition][i];
            return { label: label[m], low: b[0], high: b[1] };
          });
          const s = span(rows.map((r) => [r.low, r.high]));
          return { low: s.low, high: s.high, breakdown: rows };
        }
        const b = PRICES.windows[a.material + "|" + a.condition][i];
        return { low: b[0], high: b[1] };
      }
    },

    doors: {
      label: "Doors", hubNote: "Entry, double, and patio doors",
      intro: "Get your door price in about a minute",
      // "street" uses Street View and falls back to satellite where Google
      // has no imagery. "satellite" always uses the overhead view.
      view: "street",   // the entry door faces the street
      // Inlined as a CSS mask, so the icon takes the colour of the text
      // beside it rather than being locked to white. ~4KB, no hosting needed.
      icon: "data:image/png;base64,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",
      // TODO: upload doors-banner.jpg and doors-tile.jpg to Webflow assets,
      // then paste the two asset URLs here.
      image: "https://cdn.prod.website-files.com/64244447fb8d73d5af3e8ce8/6a96f1e5e520901f07f64c8d_Funnel%20Pics-3.jpg", hubImage: "https://cdn.prod.website-files.com/64244447fb8d73d5af3e8ce8/6a96f1e4341fccd5fb1c81bc_Funnel%20Pics%20No%20Watermark-3.jpg", imageAlt: "Black double entry doors on a covered porch",

      // Customers can configure up to MULTI.max doors in one go.
      //
      // repeatDoorFactor is a PRICING ADJUSTMENT, not a promotion. Labour does
      // not repeat in full once the crew is on site, so quoting several doors
      // at their individual list prices overstates the real job. Every door
      // after the most expensive one is multiplied by this factor.
      //
      // Nothing about this is shown to the customer. They see one accurate
      // total and, if they configured more than one door, a per-door split of
      // that total. No discount is mentioned or implied anywhere.
      MULTI: { max: 6, repeatDoorFactor: 0.70 },

      questionsFor(a) {
        const M = this.MULTI, out = [];
        // Only number the doors once there is more than one; a single-door
        // quote should not say "Door 1" for no reason.
        const multi = !!a["d1_type"];
        for (let i = 0; i < M.max; i++) {
          const p = "d" + i + "_";
          const nth = (i === 0 && !multi) ? "" : "Door " + (i + 1);

          out.push({
            id: p + "type", kicker: nth, cols: 1,
            heading: i === 0 ? "What type of door?" : "What type is the next door?",
            options: [
              { v: "single",  t: "Single door" },
              { v: "double",  t: "Double door" },
              { v: "sliding", t: "Sliding patio door" } ]
          });
          if (!a[p + "type"]) return out;

          const branch = a[p + "type"] === "sliding" ? SLIDING_QUESTIONS : ENTRY_QUESTIONS;
          branch.forEach((q) => out.push(Object.assign({}, q, { id: p + q.id, kicker: nth })));
          if (!branch.every((q) => a[p + q.id] != null)) return out;

          if (i < M.max - 1) {
            out.push({
              id: p + "more", kicker: nth, cols: 2, nav: true,
              heading: i === 0 ? "Replacing any other doors?"
                               : "Any more doors after that?",
              options: [
                { v: "yes", t: "Yes, add another" },
                { v: "no",  t: "No, that is everything" } ]
            });
            if (a[p + "more"] !== "yes") return out;
          }
        }
        return out;
      },

      // Price one configured door from the workbook. Returns [low, high].
      priceOne(c) {
        if (!c.type) return null;
        if (c.type === "sliding") {
          const key = (cfg) =>
            "sliding|" + c.series + "|" + c.panels + "|" + cfg + "|" + c.hardware;
          if (SLIDING_CONFIG === "span") {
            const a = PRICES.doors[key("stdcfg")], b = PRICES.doors[key("complex")];
            return a && b ? [Math.min(a[0], b[0]), Math.max(a[1], b[1])] : null;
          }
          return PRICES.doors[key(SLIDING_CONFIG)] || null;
        }
        const sur = c.surround === "no" ? "no" : c.surround === "both" ? "both" : "one";
        const mats = c.material === "unsure" ? ["steel", "fiberglass"] : [c.material];

        // The workbook only prices three glass levels, but the funnel offers
        // five. GLASS_MODE decides how the five are priced.
        //
        //   "scaled"  five tiers spread evenly between the No Glass row and the
        //             Full Glass row. No Glass is cheapest, Full decorative is
        //             most expensive, nothing falls outside the workbook range.
        //             Half glass and Full glass no longer sit on their own rows.
        //
        //   "sheet"   No, Half and Full glass use their exact workbook rows.
        //             The two decorative tiers continue upward using the same
        //             step, so they price ABOVE the Full Glass row.
        //
        const GLASS_MODE = "scaled";
        const GLASS_TIERS = ["none", "half", "full", "small", "fulldeco"];

        const row = (m, g) =>
          PRICES.doors[c.type + "|" + m + "|" + g + "|" + sur + "|" + c.hardware];

        function band(m, g) {
          const i = GLASS_TIERS.indexOf(g);
          if (i < 0) return row(m, g) || null;
          const lo = row(m, "none"), hi = row(m, "full");
          if (!lo || !hi) return null;

          if (GLASS_MODE === "sheet") {
            if (i <= 2) return row(m, GLASS_TIERS[i]);
            // continue past full glass using the half-to-full step
            const half = row(m, "half");
            const step = [hi[0] - half[0], hi[1] - half[1]];
            const n = i - 2;
            return [hi[0] + step[0] * n, hi[1] + step[1] * n];
          }

          const t = i / (GLASS_TIERS.length - 1);
          return [lo[0] + (hi[0] - lo[0]) * t, lo[1] + (hi[1] - lo[1]) * t];
        }

        const all = mats.map((m) => band(m, c.glass)).filter(Boolean);
        if (!all.length) return null;
        return [Math.min.apply(null, all.map((x) => x[0])),
                Math.max.apply(null, all.map((x) => x[1]))];
      },

      // Pull the per-door answer sets back out of the flat answers object.
      doorsFrom(a) {
        const out = [];
        for (let i = 0; i < this.MULTI.max; i++) {
          const p = "d" + i + "_";
          if (!a[p + "type"]) break;
          const c = { type: a[p + "type"] };
          ["material", "glass", "surround", "hardware", "panels", "series"]
            .forEach((k) => { if (a[p + k] != null) c[k] = a[p + k]; });
          out.push(c);
        }
        return out;
      },

      price(a) {
        const M = this.MULTI;
        const TYPE = { single: "Single door", double: "Double door",
                       sliding: "Sliding patio door" };
        const MAT = { steel: "steel", fiberglass: "fiberglass", unsure: "material TBC" };
        const PANELS = { p2: "2 panel", p3: "3 panel", p4: "4 panel" };
        const describe = (c) => TYPE[c.type] +
          (c.type === "sliding" ? ", " + (PANELS[c.panels] || "")
                                : ", " + (MAT[c.material] || ""));
        const priced = this.doorsFrom(a)
          .map((c) => ({ c: c, b: this.priceOne(c) }))
          .filter((x) => x.b);
        if (!priced.length) return null;
        if (priced.length === 1) {
          return { low: priced[0].b[0], high: priced[0].b[1] };
        }

        // Work out the adjusted job total: the most expensive door at full
        // price, every other door at repeatDoorFactor.
        const order = priced.slice().sort((x, y) => y.b[1] - x.b[1]);
        const f = M.repeatDoorFactor;
        let low = 0, high = 0, listLow = 0, listHigh = 0;
        order.forEach((x, n) => {
          const k = n === 0 ? 1 : f;
          low += x.b[0] * k; high += x.b[1] * k;
          listLow += x.b[0];  listHigh += x.b[1];
        });

        // Then spread that total back across the doors in proportion to their
        // list price. Two identical doors show two identical numbers, so
        // nothing on screen looks like an unexplained markdown.
        const rows = order.map((x) => ({
          label: describe(x.c),
          low:  listLow  ? low  * (x.b[0] / listLow)  : 0,
          high: listHigh ? high * (x.b[1] / listHigh) : 0
        }));
        return { low: low, high: high, breakdown: rows };
      }
    },

    solar: {
      label: "Solar", hubNote: "Roof and ground mounted systems",
      intro: "Get your solar price in about a minute",
      view: "satellite",
      image: "", hubImage: "", imageAlt: "A Cenvar solar installation",

      questionsFor(a) {
        const q = [{
          id: "bill", heading: "What is your average monthly electric bill?", cols: 1,
          caption: "Most Virginia homes pay $146 to $177 a month, at 15 to 17 cents " +
                   "per kilowatt hour. Summer bills run higher, so a yearly average " +
                   "is best if you have one.",
          options: [
            { v: "u100", t: "Under $100" },
            { v: "b100", t: "$100 to $175", n: "Where most Virginia homes land" },
            { v: "b175", t: "$175 to $250" },
            { v: "b250", t: "$250 to $350" },
            { v: "o350", t: "Over $350" },
            { v: "known", t: "I already know what size system I want",
              n: "Skip ahead and enter the kilowatts" } ]
        }];
        if (!a.bill) return q;

        if (a.bill === "known") {
          q.push({ id: "kw", type: "stepper", heading: "How big a system?",
            min: SOLAR.kwRange.min, max: SOLAR.kwRange.max,
            start: SOLAR.kwRange.start, step: SOLAR.kwRange.step, unit: "kW",
            caption: "Panels are about " + SOLAR.wattsPerPanel + " watts each, so a " +
                     "10 kW system is roughly " +
                     Math.round(10000 / SOLAR.wattsPerPanel) + " panels.",
            quick: [6, 10, 15, 20] });
        }

        q.push({ id: "mount", heading: "Where would the panels go?", cols: 1, options: [
          { v: "roof",   t: "On my roof" },
          { v: "ground", t: "On the ground", n: "You have open land to use" },
          { v: "unsure", t: "Not sure yet", n: "We will price both" } ] });
        if (!a.mount) return q;

        // Shade only affects a roof array, and only when sizing from a bill.
        if (a.mount !== "ground" && a.bill !== "known") {
          q.push({ id: "shade", heading: "How much sun does your roof get?", cols: 1, options: [
            { v: "full",    t: "Full sun most of the day" },
            { v: "partial", t: "Partial shade", n: "Trees or a neighbouring roof" } ] });
        }
        if (a.mount !== "ground") {
          q.push({ id: "roofAge", heading: "How old is your roof?", cols: 1, options: [
            { v: "u10",    t: "Under 10 years" },
            { v: "b1020",  t: "10 to 20 years" },
            { v: "o20",    t: "Over 20 years", n: "Worth replacing before panels go on" },
            { v: "unsure", t: "Not sure" } ] });
        }
        q.push({ id: "battery", heading: "Add battery backup?", cols: 1,
          caption: "A battery keeps your home running when the grid goes down. " +
                   "It is a significant addition to the cost.",
          options: [
            { v: "none",  t: "No battery" },
            { v: "kwh15", t: "15 kWh", n: "Runs essentials through an outage" },
            { v: "kwh30", t: "30 kWh", n: "Covers more of the home for longer" } ] });
        return q;
      },

      sizeFor(a, mount) {
        if (a.bill === "known") return Math.min(Number(a.kw) || SOLAR.kwRange.start,
                                                SOLAR.cap[mount]);
        const bill = SOLAR.bill[a.bill];
        if (!bill) return 0;
        let kw = SOLAR.size.perDollar * bill + SOLAR.size.base;
        if (mount === "roof") kw *= SOLAR.shade[a.shade || "full"];
        return Math.min(kw, SOLAR.cap[mount]);
      },

      price(a) {
        if (!a.bill || !a.mount || !a.battery) return null;
        if (a.bill === "known" && !a.kw) return null;
        const adder = SOLAR.battery[a.battery] || 0;

        const line = (mount) => {
          const f = SOLAR.fit[mount];
          const kw = this.sizeFor(a, mount);
          const mid = f.perKw * kw + f.fixed;
          return {
            label: mount === "roof" ? "Roof mounted" : "Ground mounted",
            kw: kw,
            low:  mid * f.lo + adder,
            high: mid * f.hi + adder
          };
        };

        const note = a.bill === "known"
          ? ""
          : "Sized from your bill. The exact system depends on your roof, " +
            "which we confirm on site.";

        if (a.mount === "unsure") {
          const rows = [line("roof"), line("ground")];
          return {
            low: Math.min(rows[0].low, rows[1].low),
            high: Math.max(rows[0].high, rows[1].high),
            breakdown: rows.map((r) => ({ label: r.label, low: r.low, high: r.high })),
            note: note
          };
        }
        const r = line(a.mount);
        return { low: r.low, high: r.high, note: note };
      }
    },

    siding: {
      label: "Siding", hubNote: "Vinyl and insulated vinyl",
      intro: "Get your siding price in about a minute",
      // "street" uses Street View and falls back to satellite where Google
      // has no imagery. "satellite" always uses the overhead view.
      view: "street",   // siding is judged from the ground, not from above
      // Inlined as a CSS mask, so the icon takes the colour of the text
      // beside it rather than being locked to white. ~4KB, no hosting needed.
      icon: "data:image/png;base64,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",
      // TODO: upload siding-banner.jpg and siding-tile.jpg to Webflow assets,
      // then paste the two asset URLs here.
      image: "https://cdn.prod.website-files.com/64244447fb8d73d5af3e8ce8/6a96f1e54a1bebd1177fb856_Funnel%20Pics-2.jpg", hubImage: "https://cdn.prod.website-files.com/64244447fb8d73d5af3e8ce8/6a96f1e515523e8aedf1a95a_Funnel%20Pics%20No%20Watermark-2.jpg", imageAlt: "Cedar shake siding on a gable end",
      questions: [
        { id: "material", heading: "What siding material?", cols: 1, options: [
          { v: "vinyl",     t: "Vinyl",           n: "Best value" },
          { v: "insulated", t: "Insulated vinyl", n: "Adds R-value and rigidity" },
          { v: "unsure",    t: "Not sure yet",    n: "We will show you both" } ] },
        { id: "size", heading: "How many square feet is your home?", cols: 1, options: [
          { v: "u1500", t: "Under 1,500 sq ft" },
          { v: "b1525", t: "1,500 to 2,500 sq ft" },
          { v: "b2535", t: "2,500 to 3,500 sq ft" },
          { v: "o3500", t: "Over 3,500 sq ft" } ] },
        { id: "stories", heading: "How many stories?", cols: 3, options: [
          { v: "one",   t: "One" },
          { v: "two",   t: "Two" },
          { v: "three", t: "Three or more" } ] }
      ],
      price(a) {
        const label = { vinyl: "Vinyl", insulated: "Insulated vinyl" };
        const key = (m) => m + "|" + a.size + "|" + a.stories;
        if (a.material === "unsure") {
          const rows = ["vinyl", "insulated"].map((m) => ({
            label: label[m], low: PRICES.siding[key(m)][0], high: PRICES.siding[key(m)][1],
            plus: OPEN.siding && OPEN.siding.has(key(m))
          }));
          const s = span(rows.map((r) => [r.low, r.high]));
          return { low: s.low, high: s.high, plus: rows.some((r) => r.plus), breakdown: rows };
        }
        const b = PRICES.siding[key(a.material)];
        return { low: b[0], high: b[1], plus: OPEN.siding && OPEN.siding.has(key(a.material)) };
      }
    }
  };

  /* =========================================================================
     4. HELPERS
     ========================================================================= */
  const round = (n) => Math.round(n / SETTINGS.roundTo) * SETTINGS.roundTo;
  const money = (n) => "$" + round(n).toLocaleString("en-US");
  // Monthly payments round to the dollar. Using the $50 rounding meant $241
  // displayed as $250, which is both wrong and needlessly generous-looking.
  const moneyExact = (n) => "$" + Math.round(n).toLocaleString("en-US");
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const cookie = (n) => {
    const m = document.cookie.match("(^|;)\\s*" + n + "\\s*=\\s*([^;]+)");
    return m ? m.pop() : "";
  };
  // Standard amortising payment. Returns null when financing is off, the
  // figures are missing, or the amount falls outside what SFC will lend.
  function planFor(serviceId) {
    const F = SETTINGS.financing;
    if (!F || !F.enabled) return null;
    const key = F.byService ? F.byService[serviceId] : null;
    if (!key) return null;
    const p = F.plans ? F.plans[key] : null;
    return (p && p.factor) ? p : null;   // no factor, no advertisable payment
  }

  // SFC quotes from a payment factor, so the funnel does too. Returns null
  // when the amount falls outside what this plan will lend.
  function monthlyPayment(amount, serviceId) {
    const F = SETTINGS.financing;
    const p = planFor(serviceId);
    if (!p) return null;
    const principal = amount * (F.priceFactor || 1) - (F.downPayment || 0);
    if (principal < p.min || principal > p.max) return null;
    return principal * p.factor;
  }

  function track(name, params) {
    try {
      if (typeof window.gtag === "function") window.gtag("event", name, params || {});
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(Object.assign({ event: name }, params || {}));
    } catch (e) {}
  }

  let mapsPromise = null;
  function loadMaps() {
    const key = SETTINGS.google.mapsKey;
    if (!key) return Promise.reject(new Error("no maps key"));
    if (mapsPromise) return mapsPromise;
    mapsPromise = new Promise((res, rej) => {
      if (window.google && window.google.maps && window.google.maps.importLibrary) return res();
      const cb = "rfxMapsReady";
      if (document.querySelector("script[data-rfx-maps]")) {
        // another instance is already loading it; poll briefly
        let n = 0;
        const t = setInterval(() => {
          if (window.google && window.google.maps && window.google.maps.importLibrary) {
            clearInterval(t); res();
          } else if (++n > 100) { clearInterval(t); rej(new Error("maps timeout")); }
        }, 100);
        return;
      }
      window[cb] = () => res();
      const s = document.createElement("script");
      // v=weekly and loading=async are required for google.maps.importLibrary,
      // which is how the current Places widget is loaded.
      s.src = "https://maps.googleapis.com/maps/api/js?key=" + encodeURIComponent(key) +
        "&v=weekly&loading=async&callback=" + cb;
      s.async = true;
      s.setAttribute("data-rfx-maps", "1");
      s.onerror = () => rej(new Error("maps failed to load"));
      document.head.appendChild(s);
    });
    return mapsPromise;
  }

  // return_error_code makes Google send a 404 when it has no photo of this
  // spot, instead of the grey "no imagery available" tile. That 404 is what
  // triggers the fall back to satellite below.
  const streetViewUrl = (lat, lng) =>
    "https://maps.googleapis.com/maps/api/streetview?size=640x360&scale=2" +
    "&location=" + lat + "," + lng +
    "&fov=" + SETTINGS.google.streetFov + "&pitch=" + SETTINGS.google.streetPitch +
    "&source=outdoor&return_error_code=true" +
    "&key=" + encodeURIComponent(SETTINGS.google.mapsKey);

  const satelliteUrl = (lat, lng) =>
    "https://maps.googleapis.com/maps/api/staticmap?center=" + lat + "," + lng +
    "&zoom=" + SETTINGS.google.satelliteZoom + "&size=640x360&scale=2&maptype=satellite" +
    "&markers=color:0x" + BRAND.accent.replace("#", "") + "%7C" + lat + "," + lng +
    "&key=" + encodeURIComponent(SETTINGS.google.mapsKey);

  /* =========================================================================
     5. FUNNEL
     ========================================================================= */
  function mountFunnel(root, serviceId) {
    const C = SETTINGS.company;
    const S = SERVICES[serviceId];
    if (!S) return;

    const state = {
      answers: {}, place: { address: "", zip: "", lat: null, lng: null },
      contact: {}, index: 0, result: null, sent: false
    };

    const questions = () => S.questionsFor ? S.questionsFor(state.answers) : S.questions;
    const totalSteps = () => 1 + questions().length + (PREVIEW ? 1 : 2);

    root.classList.add("rfx");
    applyBrand(root);
    root.innerHTML =
      '<div class="rfx-shell">' +
        '<div class="rfx-courses" role="progressbar" aria-label="Progress"></div>' +
        '<div class="rfx-stage"></div>' +
        '<div class="rfx-nav">' +
          '<button type="button" class="rfx-btn rfx-btn-ghost rfx-back">Back</button>' +
          '<button type="button" class="rfx-btn rfx-btn-primary rfx-next">Continue</button>' +
        '</div>' +
      '</div>';

    const q = (sel) => root.querySelector(sel);
    const courses = q(".rfx-courses"), stage = q(".rfx-stage"), nav = q(".rfx-nav");
    const backBtn = q(".rfx-back"), nextBtn = q(".rfx-next");

    function paintCourses() {
      const n = totalSteps();
      if (courses.children.length !== n) {
        courses.innerHTML = Array.from({ length: n }).map(() => '<div class="rfx-course"></div>').join("");
      }
      Array.from(courses.children).forEach((el, i) => el.classList.toggle("is-filled", i <= state.index));
      courses.setAttribute("aria-valuenow", String(state.index + 1));
      courses.setAttribute("aria-valuemax", String(n));
    }

    const PREVIEW = SETTINGS.previewMode === true;

    function kind() {
      const qs = questions();
      if (state.index === 0) return "address";
      if (state.index <= qs.length) return "question";
      if (!PREVIEW && state.index === qs.length + 1) return "contact";
      return "price";
    }

    function render() {
      const k = kind();
      paintCourses();
      backBtn.hidden = state.index === 0 || k === "price";
      nav.style.display = k === "price" ? "none" : "";
      if (k === "address")  renderAddress();
      if (k === "question") renderQuestion(questions()[state.index - 1]);
      if (k === "contact")  renderContact();
      if (k === "price")    renderPrice();

      wireImages();

      // Restart the entrance animation on each screen change.
      stage.classList.remove("rfx-in");
      void stage.offsetWidth;
      stage.classList.add("rfx-in");
      track("estimator_step", { service: serviceId, step_index: state.index + 1, step_kind: k });
    }

    /* --- Address ---------------------------------------------------------
       Three modes:
         search   type and pick from Google's suggestions
         confirm  show the photo and have them verify it is their home
         manual   structured fields, no Google at all
       Manual is reachable on purpose (the photo is wrong) and automatically
       (Google failed to load). Either way the funnel never dead-ends, so an
       outage costs a satellite image, not a lead.
    --------------------------------------------------------------------- */
    function renderAddress() {
      const P = state.place;
      if (PREVIEW && !P.address && !P.mode) {
        P.address = "123 Sample St, Lynchburg, VA 24501";
      }
      if (!P.mode) P.mode = "search";
      nextBtn.textContent = "Continue";

      // Photo sits directly under the heading, above the explainer line.
      const photo = P.lat
        ? '<div class="rfx-sat-wrap"></div>'
        : '<div class="rfx-sat-wrap"></div>';

      const sub =
        P.mode === "confirm"
          ? 'Take a look. Is this the home you want priced?'
          : P.mode === "manual"
            ? 'Enter the address and we will take it from there.'
            : esc(S.intro) + '. Start typing and pick your address from the list.';

      let body = "";
      if (P.mode === "manual") {
        body =
          '<div class="rfx-field">' +
            '<label class="rfx-field-label" for="rfxSt_' + serviceId + '">Street address</label>' +
            '<input class="rfx-input rfx-m-street" id="rfxSt_' + serviceId + '" type="text" ' +
            'autocomplete="street-address" placeholder="123 Main St" value="' + esc(P.street || "") + '">' +
          '</div>' +
          '<div class="rfx-grid-2">' +
            '<div class="rfx-field">' +
              '<label class="rfx-field-label" for="rfxCity_' + serviceId + '">City</label>' +
              '<input class="rfx-input rfx-m-city" id="rfxCity_' + serviceId + '" type="text" ' +
              'autocomplete="address-level2" value="' + esc(P.city || "") + '">' +
            '</div>' +
            '<div class="rfx-field">' +
              '<label class="rfx-field-label" for="rfxZip_' + serviceId + '">ZIP code</label>' +
              '<input class="rfx-input rfx-m-zip" id="rfxZip_' + serviceId + '" type="text" ' +
              'inputmode="numeric" maxlength="5" autocomplete="postal-code" value="' + esc(P.zip || "") + '">' +
            '</div>' +
          '</div>' +
          '<p class="rfx-manual"><button type="button" class="rfx-linkish rfx-back-search">' +
          'Search for my address instead</button></p>';
      } else if (P.mode === "confirm") {
        body =
          '<div class="rfx-options" id="rfxConfirm_' + serviceId + '">' +
            '<button type="button" class="rfx-opt' + (P.confirmed ? " is-on" : "") + '" data-v="yes">' +
              '<span class="rfx-opt-tick"></span><span class="rfx-opt-body">' +
              '<span class="rfx-opt-title">Yes, that is my home</span></span></button>' +
            '<button type="button" class="rfx-opt" data-v="no">' +
              '<span class="rfx-opt-tick"></span><span class="rfx-opt-body">' +
              '<span class="rfx-opt-title">No, let me type the address</span>' +
              '<span class="rfx-opt-note">Wrong house, or no photo available</span></span></button>' +
          '</div>';
      } else {
        body =
          '<div class="rfx-field">' +
            '<label class="rfx-field-label" for="rfxAddr_' + serviceId + '">Street address</label>' +
            '<div class="rfx-ac"><input class="rfx-input rfx-addr" id="rfxAddr_' + serviceId +
            '" type="text" autocomplete="off" placeholder="123 Main St" value="' +
            esc(P.address || "") + '"></div>' +
            '<p class="rfx-manual" hidden><button type="button" class="rfx-linkish rfx-go-manual">' +
            'Enter your address manually instead</button></p>' +
          '</div>';
      }

      // Once we have a photo of their actual house, drop the stock banner.
      // Two large images stacked is too much, and theirs is the interesting one.
      stage.innerHTML = (P.lat ? "" : heroMark("address")) +
        '<p class="rfx-kicker">' + iconMark() + esc(S.label) + '</p>' +
        '<h2 class="rfx-h">Where is your home?</h2>' +
        photo +
        '<p class="rfx-sub">' + sub + '</p>' +
        body;

      const wrap = q(".rfx-sat-wrap");

      function drawPhoto() {
        if (!P.lat) { wrap.innerHTML = ""; return; }
        const lat = P.lat, lng = P.lng;
        const street = S.view === "street";
        const first = street ? streetViewUrl(lat, lng) : satelliteUrl(lat, lng);
        const alt = (street ? "Street view of " : "Satellite view of ") + P.address;
        wrap.innerHTML = '<div class="rfx-sat"><img alt="' + esc(alt) + '" src="' + first +
          '"><div class="rfx-sat-tag">' + esc(P.address) + '</div></div>';
        const img = wrap.querySelector("img");
        img.addEventListener("error", function () {
          if (street && !img.dataset.fellBack) {
            img.dataset.fellBack = "1";
            img.alt = "Satellite view of " + P.address;
            img.src = satelliteUrl(lat, lng);
            return;
          }
          const box = wrap.querySelector(".rfx-sat");
          if (box) box.remove();
        });
      }
      drawPhoto();

      function toManual(reason) {
        P.mode = "manual";
        P.lat = null; P.lng = null; P.confirmed = false;

        if (reason === "rejected") {
          // They said the photo is not their home, so everything Google gave
          // us is wrong, including the postal code. Start clean rather than
          // letting a wrong ZIP ride along with a corrected street.
          P.address = ""; P.street = ""; P.city = ""; P.zip = "";
        } else if (P.address && !P.street) {
          // Came here before selecting anything: keep whatever was typed.
          P.street = P.address; P.zip = "";
        }
        render();
      }

      function accept(addr, lat, lng, zip, city) {
        P.address = addr || "";
        P.lat = lat; P.lng = lng;
        P.zip = zip || ""; P.city = city || "";
        P.confirmed = false;
        P.mode = "confirm";
        render();
      }

      /* --- manual mode --- */
      if (P.mode === "manual") {
        const st = q(".rfx-m-street"), ci = q(".rfx-m-city"), zp = q(".rfx-m-zip");
        const sync = () => {
          P.street = st.value.trim();
          P.city   = ci.value.trim();
          P.zip    = zp.value.trim();
          P.address = [P.street, P.city].filter(Boolean).join(", ") +
                      (P.zip ? " " + P.zip : "");
          nextBtn.disabled = !(P.street.length >= 5 && /^\d{5}$/.test(P.zip));
        };
        [st, ci, zp].forEach((el) => el.addEventListener("input", sync));
        q(".rfx-back-search").addEventListener("click", () => {
          P.mode = "search"; P.confirmed = false; render();
        });
        sync();
        return;
      }

      /* --- confirm mode --- */
      if (P.mode === "confirm") {
        const box = q("#rfxConfirm_" + serviceId);
        box.addEventListener("click", (e) => {
          const b = e.target.closest(".rfx-opt");
          if (!b) return;
          if (b.dataset.v === "no") { toManual("rejected"); return; }
          P.confirmed = true;
          Array.from(box.children).forEach((c) => c.classList.toggle("is-on", c === b));
          nextBtn.disabled = false;
        });
        nextBtn.disabled = !P.confirmed;
        return;
      }

      /* --- search mode --- */
      const slot = q(".rfx-ac");
      const input = slot.querySelector("input");
      const manualWrap = q(".rfx-manual");
      q(".rfx-go-manual").addEventListener("click", () => toManual("chose"));

      input.addEventListener("input", (e) => {
        P.address = e.target.value;
        nextBtn.disabled = true;   // a typed string is not a confirmed address
      });
      nextBtn.disabled = true;

      loadMaps().then(() => google.maps.importLibrary("places")).then((places) => {
        if (places.PlaceAutocompleteElement) {
          const ac = new places.PlaceAutocompleteElement({
            includedRegionCodes: ["us"],
            includedPrimaryTypes: ["street_address", "premise", "subpremise"]
          });
          ac.style.width = "100%";
          slot.innerHTML = "";
          slot.appendChild(ac);
          manualWrap.hidden = false;
          ac.addEventListener("gmp-select", (ev) => {
            const pred = ev.placePrediction;
            if (!pred) return;
            const place = pred.toPlace();
            place.fetchFields({ fields: ["formattedAddress", "location", "addressComponents"] })
              .then(() => {
                const loc = place.location;
                const lat = typeof loc.lat === "function" ? loc.lat() : loc.lat;
                const lng = typeof loc.lng === "function" ? loc.lng() : loc.lng;
                const comps = place.addressComponents || [];
                const pick = (type) => {
                  const c = comps.filter((x) => (x.types || []).indexOf(type) > -1)[0];
                  return c ? (c.shortText || c.longText) : "";
                };
                accept(place.formattedAddress, lat, lng, pick("postal_code"), pick("locality"));
              })
              .catch(() => toManual("failed"));
          });

        } else if (places.Autocomplete) {
          const ac = new places.Autocomplete(input, {
            types: ["address"], componentRestrictions: { country: "us" },
            fields: ["formatted_address", "address_components", "geometry"]
          });
          manualWrap.hidden = false;
          ac.addListener("place_changed", () => {
            const p = ac.getPlace();
            if (!p || !p.geometry) return;
            const pick = (type) => {
              const c = (p.address_components || []).filter((x) => x.types.indexOf(type) > -1)[0];
              return c ? c.short_name : "";
            };
            accept(p.formatted_address || input.value,
              p.geometry.location.lat(), p.geometry.location.lng(),
              pick("postal_code"), pick("locality"));
          });
        } else {
          toManual("failed");
        }
      }).catch(() => {
        // No key, blocked key, offline, or Google down. Go straight to the
        // manual form rather than leaving a search box that cannot search.
        toManual("failed");
      });
    }

    /* --- Question --- */
    function renderQuestion(qq) {
      nextBtn.textContent = "Continue";
      const head = heroMark("question") +
        '<p class="rfx-kicker">' + iconMark() + esc(qq.kicker || S.label) + '</p>' +
        '<h2 class="rfx-h">' + esc(qq.heading) + '</h2><div style="height:16px"></div>';

      if (qq.type === "stepper") {
        if (state.answers[qq.id] == null) state.answers[qq.id] = qq.start;
        stage.innerHTML = head +
          '<div class="rfx-stepper">' +
            '<button type="button" class="rfx-step-btn rfx-minus" aria-label="Fewer">&minus;</button>' +
            '<div class="rfx-step-val" aria-live="polite">' + state.answers[qq.id] + '</div>' +
            '<button type="button" class="rfx-step-btn rfx-plus" aria-label="More">+</button>' +
          '</div>' +
          '<p class="rfx-step-cap">' + esc(qq.caption || "") + '</p>' +
          '<div class="rfx-quick">' + (qq.quick || []).map((n) =>
            '<button type="button" data-n="' + n + '">' + n + " " +
            esc(qq.unit || "windows") + '</button>').join("") + '</div>';

        const out = q(".rfx-step-val"), minus = q(".rfx-minus"), plus = q(".rfx-plus");
        const paint = () => {
          out.textContent = state.answers[qq.id] + (qq.unit ? " " + qq.unit : "");
          minus.disabled = state.answers[qq.id] <= qq.min;
          plus.disabled = state.answers[qq.id] >= qq.max;
        };
        const set = (n) => { state.answers[qq.id] = Math.min(qq.max, Math.max(qq.min, n)); paint(); };
        const stepBy = qq.step || 1;
        minus.addEventListener("click", () => set(state.answers[qq.id] - stepBy));
        plus.addEventListener("click", () => set(state.answers[qq.id] + stepBy));
        q(".rfx-quick").addEventListener("click", (e) => {
          const b = e.target.closest("button[data-n]");
          if (b) set(Number(b.dataset.n));
        });
        paint();
        nextBtn.disabled = false;
        return;
      }

      const cls = qq.cols === 3 ? " rfx-three" : qq.cols === 2 ? " rfx-two" : "";
      const cap = qq.caption
        ? '<p class="rfx-sub" style="margin-top:-8px">' + esc(qq.caption) + '</p>' : "";
      stage.innerHTML = head + cap + '<div class="rfx-options' + cls + '">' +
        qq.options.map((o) =>
          '<button type="button" class="rfx-opt' + (state.answers[qq.id] === o.v ? " is-on" : "") +
          '" data-v="' + o.v + '"><span class="rfx-opt-tick"></span><span class="rfx-opt-body">' +
          '<span class="rfx-opt-title">' + esc(o.t) + '</span>' +
          (o.n ? '<span class="rfx-opt-note">' + esc(o.n) + '</span>' : "") +
          '</span></button>').join("") + '</div>';

      const box = q(".rfx-options");
      box.addEventListener("click", (e) => {
        const b = e.target.closest(".rfx-opt");
        if (!b) return;
        const prev = state.answers[qq.id];
        state.answers[qq.id] = b.dataset.v;
        // Changing a door's type invalidates that door's remaining answers and
        // every door configured after it.
        const m = /^d(\d+)_type$/.exec(qq.id);
        if (m && prev && prev !== b.dataset.v) {
          const from = Number(m[1]);
          Object.keys(state.answers).forEach((k) => {
            const mm = /^d(\d+)_(.+)$/.exec(k);
            if (!mm) return;
            const i = Number(mm[1]);
            if (i > from || (i === from && mm[2] !== "type")) delete state.answers[k];
          });
        }
        Array.from(box.children).forEach((c) => c.classList.toggle("is-on", c === b));
        nextBtn.disabled = false;
      });
      nextBtn.disabled = state.answers[qq.id] == null;
    }

    /* --- Contact --- */
    const FIELDS = [
      { k: "fullName", label: "Full name", type: "text" },
      { k: "email",    label: "Email",     type: "email" },
      { k: "phone",    label: "Phone",     type: "tel" }
    ];

    function renderContact() {
      nextBtn.textContent = "See my price";
      stage.innerHTML =
        '<p class="rfx-kicker">' + iconMark() + esc(S.label) + '</p>' +
        '<h2 class="rfx-h">Almost there</h2>' +
        '<p class="rfx-sub">Your price is ready. Tell us who we\'re quoting and we\'ll ' +
        'show it on the next screen.</p>' +
        FIELDS.map((f) =>
          '<div class="rfx-field"><label class="rfx-field-label" for="rfx_' + serviceId + "_" + f.k +
          '">' + f.label + '</label><input class="rfx-input" id="rfx_' + serviceId + "_" + f.k +
          '" type="' + f.type + '" value="' + esc(state.contact[f.k] || "") + '"' +
          (f.k === "phone" ? ' inputmode="tel"' : "") + '>' +
          '<p class="rfx-err" id="rfxErr_' + serviceId + "_" + f.k + '" hidden></p></div>').join("") +
        '<p class="rfx-fine rfx-form-err" hidden style="color:var(--rfx-red)"></p>';

      FIELDS.forEach((f) => {
        q("#rfx_" + serviceId + "_" + f.k)
          .addEventListener("input", (e) => { state.contact[f.k] = e.target.value; });
      });
      nextBtn.disabled = false;
    }

    function validate() {
      let ok = true;
      FIELDS.forEach((f) => {
        const el = q("#rfx_" + serviceId + "_" + f.k), err = q("#rfxErr_" + serviceId + "_" + f.k);
        const v = (state.contact[f.k] || "").trim();
        let msg = "";
        if (!v) msg = f.label + " is required.";
        else if (f.k === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) msg = "Check the email address.";
        else if (f.k === "phone" && v.replace(/\D/g, "").length < 10) msg = "Enter a 10 digit phone number.";
        else if (f.k === "fullName" && v.split(/\s+/).length < 2) msg = "First and last name, please.";
        err.hidden = !msg; err.textContent = msg;
        el.classList.toggle("is-bad", !!msg);
        if (msg) ok = false;
      });
      return ok;
    }

    // "Door 2 · What material?" rather than three identical "What material?" rows.
    function questionLabel(qq) {
      return (qq.kicker && qq.kicker !== S.label) ? qq.kicker + " · " + qq.heading : qq.heading;
    }

    function answerText(qq) {
      if (qq.type === "stepper") return String(state.answers[qq.id]) + (qq.unit ? " " + qq.unit : "");
      const o = (qq.options || []).find((x) => x.v === state.answers[qq.id]);
      return o ? o.t : "—";
    }

    /* --- Submit --- */
    function submitLead() {
      const P = SETTINGS.hubspot.properties, c = state.contact, r = state.result;
      const parts = c.fullName.trim().split(/\s+/);
      const doorCount = S.doorsFrom ? S.doorsFrom(state.answers).length : 0;
      const details = questions().filter((qq) => !qq.nav)
        .map((qq) => questionLabel(qq) + " " + answerText(qq)).join("\n") +
        // Internal note so a rep knows why the total is below the sum of the
        // individual door prices. Never shown to the customer.
        (doorCount > 1 ? "\nPriced as a " + doorCount + " door job" : "") +
        (state.place.address ? "\nAddress: " + state.place.address : "") +
        (r ? "\nEstimate: " + money(r.low) + " to " + money(r.high) + (r.plus ? "+" : "")
           : "\nEstimate: not priced online, needs a call");

      const attrSrc = (function () {
        const svc = S.label || "Estimator";
        const qs = (window.location.search || "").toLowerCase();
        const u = (re) => re.test(qs);
        const meta = u(/[?&]fbclid=/) || !!cookie("_fbc") ||
          u(/[?&]utm_source=(facebook|fb|meta|instagram|ig)(&|$)/) || u(/[?&]utm_medium=[^&]*paid.?social/);
        const gads = u(/[?&](gclid|gbraid|wbraid)=/) || !!cookie("_gcl_aw") ||
          (u(/[?&]utm_source=(google|adwords)(&|$)/) && u(/[?&]utm_medium=[^&]*(cpc|ppc|paid)/));
        const bing = u(/[?&]msclkid=/) || u(/[?&]utm_source=(bing|microsoft)(&|$)/);
        const channel = meta ? "Meta" : gads ? "Google Ads" : bing ? "Bing Paid Ads" : null;
        return channel ? channel + " - Cenvar Estimator - " + svc : "";
      })();

      const pairs = [
        [P.firstName, parts[0]], [P.lastName, parts.slice(1).join(" ")],
        [P.email, c.email], [P.phone, c.phone],
        [P.address, state.place.address], [P.zip, state.place.zip],
        [P.service, S.label],
        [P.estimateLow, r ? String(round(r.low)) : ""],
        [P.estimateHigh, r ? String(round(r.high)) : ""],
        [P.details, details],
        [P.attributionSource, attrSrc]
      ].filter((p) => p[0] && p[1]);


      // If the GUID is not configured yet, do not strand the customer on a
      // failed send. Warn in the console and let them through to the price.
      if (PREVIEW) {
        console.log("[estimator] preview mode, nothing sent. Payload:", pairs);
        return Promise.resolve(false);
      }
      if (!SETTINGS.hubspot.formGuid || SETTINGS.hubspot.formGuid.indexOf("TODO") === 0) {
        console.warn("[estimator] No HubSpot form GUID set. Lead NOT sent. Payload:", pairs);
        return Promise.resolve(false);
      }

      return fetch("https://api.hsforms.com/submissions/v3/integration/submit/" +
        SETTINGS.hubspot.portalId + "/" + SETTINGS.hubspot.formGuid, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields: pairs.map((p) => ({ objectTypeId: "0-1", name: p[0], value: p[1] })),
          context: { hutk: cookie("hubspotutk") || undefined,
                     pageUri: window.location.href, pageName: document.title }
        })
      }).then((res) => { if (!res.ok) throw new Error(res.status); return true; });
    }

    /* --- Price --- */
    // Banner above the question. Returns "" when there is no URL, so a service
    // without an image simply has no banner rather than an empty grey box.
    function iconMark(cls) {
      return S.icon ? '<span class="rfx-ico' + (cls ? " " + cls : "") +
        '" style="--rfx-ico:url(' + S.icon + ')" aria-hidden="true"></span>' : "";
    }

    function heroMark(kind) {
      const mode = SETTINGS.imageOn;
      if (!S.image || mode === "none") return "";
      if (mode === "first" && kind !== "address") return "";
      return '<div class="rfx-hero" style="--rfx-hero-ratio:' +
        (SETTINGS.imageRatio || "21 / 9") + '"><img src="' + S.image +
        '" alt="' + esc(S.imageAlt || "") + '" loading="lazy" decoding="async"></div>';
    }

    // Fade in once decoded so a slow image does not flash in half-drawn.
    function wireImages(root2) {
      Array.prototype.forEach.call(
        (root2 || stage).querySelectorAll(".rfx-hero img, .rfx-hub-img"), (img) => {
          if (img.complete && img.naturalWidth) { img.classList.add("rfx-loaded"); return; }
          img.addEventListener("load", () => img.classList.add("rfx-loaded"));
          img.addEventListener("error", () => {
            const h = img.closest(".rfx-hero");
            if (h) h.remove(); else img.remove();
          });
        });
    }

    function logoMark() {
      return BRAND.logoUrl
        ? '<img src="' + BRAND.logoUrl + '" alt="' + esc(BRAND.logoAlt || "") +
          '" style="height:44px;width:auto;display:block;margin-bottom:18px">'
        : "";
    }

    // The call button is the conversion. A booking widget adds a step; picking
    // up the phone is the step. The number is in the label so it still works on
    // desktop, where a tel: link often does nothing.
    function ctaBlock() {
      return '<a class="rfx-btn rfx-btn-primary rfx-call" style="width:100%" href="' +
        C.phoneHref + '">Call ' + esc(C.phone) + ' to schedule</a>' +
        (C.hours ? '<p class="rfx-fine rfx-center">' + esc(C.hours) + '</p>' : "") +
        '<p class="rfx-fine rfx-center">Rather we reach out? Someone will call you ' +
        'within one business day.</p>' +
        (SETTINGS.bookingUrl
          ? '<p class="rfx-center" style="margin-top:12px"><a class="rfx-linkish" href="' +
            SETTINGS.bookingUrl + '">Or pick a time online</a></p>' : "");
    }

    // Counts the two figures up and draws the bar outward. Skipped entirely
    // when the person has asked for reduced motion.
    function revealPrice() {
      const box = q(".rfx-range");
      if (!box) return;
      const reduce = window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;
      box.classList.add("rfx-reveal");

      const nums = Array.prototype.slice.call(box.querySelectorAll(".rfx-num"));
      const targets = nums.map((el) => Number(el.dataset.to) || 0);

      // The markup already holds the final figure so that a browser with no JS,
      // or one that skips the animation, shows the right number. Set the
      // starting value synchronously here, before the first paint, or the final
      // figure flashes and then jumps backwards.
      const FROM = 0.55;
      nums.forEach((el, i) => {
        el.textContent = money(targets[i] * FROM) + (el.dataset.suffix || "");
      });

      const t0 = performance.now(), dur = 620;
      function frame(now) {
        const p = Math.min(1, (now - t0) / dur);
        const e = 1 - Math.pow(1 - p, 3);
        nums.forEach((el, i) => {
          const v = targets[i] * (FROM + (1 - FROM) * e);
          el.textContent = money(p < 1 ? v : targets[i]) + (el.dataset.suffix || "");
        });
        if (p < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }

    function wireCall() {
      const b = q(".rfx-call");
      if (!b) return;
      if (typeof C.onCallRendered === "function") {
        try { C.onCallRendered(b); } catch (e) { /* never break the screen */ }
      }
      b.addEventListener("click", () => {
        const r = state.result;
        track("estimator_call_click", {
          service: serviceId,
          value: r ? Math.round((r.low + r.high) / 2) : 0,
          currency: "USD"
        });
      });
    }

    // "or about $327 to $413 a month" plus the required disclosure.
    // Renders nothing unless financing is configured AND this service is on
    // the list AND the amount is inside SFC's lending limits.
    // The payment figures now sit on the panel beside their totals, so this
    // renders only the Regulation Z disclosure that must accompany them.
    // Fills {months}, {rate} and {min} from the plan actually being quoted,
    // so the disclosure and the payment can never drift apart.
    function disclosureBlock() {
      const F = SETTINGS.financing;
      const p = planFor(serviceId);
      if (!F.disclosure) {
        return '<p class="rfx-disclosure" style="color:var(--rfx-red)">DISCLOSURE ' +
          'MISSING. Add SETTINGS.financing.disclosure before this goes live.</p>';
      }
      const text = F.disclosure
        .replace(/\{months\}/g, p ? p.months : "")
        .replace(/\{rate\}/g, p ? (p.apr != null ? p.apr : p.rate) : "")
        .replace(/\{min\}/g, p ? "$" + p.min.toLocaleString("en-US") : "");
      return '<p class="rfx-disclosure">' + esc(text) + '</p>';
    }

    function renderPrice() {
      // In preview there is no contact step, so the price is worked out here.
      if (PREVIEW) state.result = S.price(state.answers);
      const r = state.result;
      const recap = '<div class="rfx-recap">' +
        (state.place.address ? '<div class="rfx-recap-row"><span class="rfx-recap-k">Home</span>' +
          '<span class="rfx-recap-v">' + esc(state.place.address) + '</span></div>' : "") +
        questions().filter((qq) => !qq.nav)
          .map((qq) => '<div class="rfx-recap-row"><span class="rfx-recap-k">' +
          esc(questionLabel(qq)) + '</span><span class="rfx-recap-v">' + esc(answerText(qq)) +
          '</span></div>').join("") + '</div>';

      const cta = ctaBlock();

      if (!r) {
        stage.innerHTML = '<div class="rfx-done-mark"></div>' +
          '<h2 class="rfx-h">We will price this by hand</h2>' +
          '<p class="rfx-sub">What you described does not fit a standard price, which usually ' +
          'means there is a better option than the catalog answer. Someone will call within ' +
          'one business day.</p>' + recap + cta;
        wireCall();
        return;
      }

      const plus = r.plus ? "+" : "";
      const breakdown = r.breakdown
        ? '<div class="rfx-break">' + r.breakdown.map((b) =>
            '<div class="rfx-break-row"><span class="rfx-break-k">' + esc(b.label) + '</span>' +
            '<span class="rfx-break-v">' + money(b.low) + ' – ' + money(b.high) +
            (b.plus ? "+" : "") + '</span></div>').join("") + '</div>'
        : "";

      // Monthly payment sits directly under its own total, in the contrasting
      // colour, so the payment and the price carry comparable weight.
      // Both ends must be financeable. Showing a payment on the high end of a
      // quote whose low end is below the loan minimum would be misleading.
      const payLow = monthlyPayment(r.low, serviceId);
      const payHigh = monthlyPayment(r.high, serviceId);
      const showPay = !!(payLow && payHigh);
      const mo = (v) => showPay && v
        ? '<span class="rfx-fig-mo">' + moneyExact(v) + '/mo</span>' : "";

      // Small photo of their own home, reusing whatever we already fetched.
      const thumb = state.place.lat
        ? '<img class="rfx-panel-thumb" alt="" src="' +
          (S.view === "street" ? streetViewUrl(state.place.lat, state.place.lng)
                               : satelliteUrl(state.place.lat, state.place.lng)) + '">'
        : "";

      const statRow = (C.stats && C.stats.length)
        ? '<div class="rfx-stats">' + C.stats.map((s) =>
            '<div class="rfx-stat"><div class="rfx-stat-n">' + esc(s.n) + '</div>' +
            '<div class="rfx-stat-t">' + esc(s.t) + '</div></div>').join("") + '</div>'
        : "";

      stage.innerHTML = logoMark() +
        '<p class="rfx-kicker">' + iconMark() + esc(S.label) + '</p>' +
        '<h2 class="rfx-h">Your ' + esc(S.label.toLowerCase()) + ' estimate</h2>' +

        '<div class="rfx-panel">' +
          (state.place.address
            ? '<div class="rfx-panel-head">' + thumb +
              '<div style="min-width:0"><div class="rfx-panel-for">Your estimate for</div>' +
              '<div class="rfx-panel-addr">' + esc(state.place.address) + '</div></div></div>'
            : "") +
          '<div class="rfx-figs">' +
            '<span class="rfx-fig">' +
              '<span class="rfx-fig-total rfx-num" data-to="' + Math.round(r.low) + '">' +
              money(r.low) + '</span>' + mo(payLow) +
            '</span>' +
            '<span class="rfx-figs-to">to</span>' +
            '<span class="rfx-fig rfx-fig-hi">' +
              '<span class="rfx-fig-total rfx-num" data-to="' + Math.round(r.high) +
              '" data-suffix="' + plus + '">' + money(r.high) + plus + '</span>' +
              mo(payHigh) +
            '</span>' +
          '</div>' +
          '<div class="rfx-panel-rule"></div>' +
        '</div>' +

        (breakdown ? '<div class="rfx-range">' + breakdown + '</div>' : "") +
        (showPay ? disclosureBlock() : "") +
        (r.note ? '<div class="rfx-note">' + esc(r.note) + '</div>' : "") + recap +
        '<div class="rfx-note"><strong>' + esc(C.reassurance) + '</strong> ' +
        esc(C.priceCaveat) + '</div>' + cta + statRow +
        (function () {
          const line = S.trustLine || C.trustLine;
          return line ? '<p class="rfx-fine rfx-center">' + esc(line) + '</p>' : "";
        })();
      revealPrice();
      wireCall();
    }

    /* --- Nav --- */
    function goNext() {
      if (kind() === "contact") {
        if (!validate() || state.sent) return;
        state.result = S.price(state.answers);
        nextBtn.disabled = true; nextBtn.textContent = "Sending…";
        q(".rfx-form-err").hidden = true;
        submitLead().then(() => {
          state.sent = true;
          const mid = state.result ? Math.round((state.result.low + state.result.high) / 2) : 0;
          track("generate_lead", { service: serviceId, value: mid, currency: "USD" });
          if (SETTINGS.tracking.adsConversionId && typeof window.gtag === "function") {
            window.gtag("event", "conversion", {
              send_to: SETTINGS.tracking.adsConversionId, value: mid, currency: "USD" });
          }
          state.index++; render();
          window.scrollTo({ top: root.offsetTop - 20, behavior: "smooth" });
        }).catch(() => {
          nextBtn.disabled = false; nextBtn.textContent = "See my price";
          const e = q(".rfx-form-err");
          e.hidden = false;
          e.textContent = "That did not go through. Check your connection and try again, " +
            "or call us at " + C.phone + " and we will take it down over the phone.";
        });
        return;
      }
      if (state.index < totalSteps() - 1) {
        state.index++; render();
        window.scrollTo({ top: root.offsetTop - 20, behavior: "smooth" });
      }
    }

    nextBtn.addEventListener("click", goNext);
    backBtn.addEventListener("click", () => { if (state.index > 0) { state.index--; render(); } });

    render();
    track("estimator_start", { service: serviceId });
  }

  /* =========================================================================
     6. HUB
     ========================================================================= */
  function mountHub(root) {
    root.classList.add("rfx");
    applyBrand(root);
    root.innerHTML = '<div class="rfx-shell">' +
      '<h2 class="rfx-h">What can we price out for you?</h2>' +
      '<p class="rfx-sub">Pick a project and answer a few questions. Most people have a ' +
      'number in under a minute.</p><div class="rfx-hub">' +
      Object.keys(SERVICES).map((id) => {
        const s = SERVICES[id];
        const src = s.hubImage || s.image;
        const img = (src && SETTINGS.imageOn !== "none")
          ? '<img class="rfx-hub-img" src="' + src + '" alt="' +
            esc(s.imageAlt || "") + '" loading="lazy" decoding="async">' : "";
        return '<a class="rfx-hub-card" href="' + (SETTINGS.pages[id] || "#") +
          '" data-id="' + id + '">' + img +
          '<span class="rfx-hub-title">' +
          (s.icon ? '<span class="rfx-ico" style="--rfx-ico:url(' + s.icon +
                    ')" aria-hidden="true"></span>' : "") +
          esc(s.label) + '</span>' +
          '<span class="rfx-hub-note">' + esc(s.hubNote) + '</span></a>';
      }).join("") +
      '</div></div>';
    Array.prototype.forEach.call(root.querySelectorAll(".rfx-hub-img"), (img) => {
      if (img.complete && img.naturalWidth) { img.classList.add("rfx-loaded"); return; }
      img.addEventListener("load", () => img.classList.add("rfx-loaded"));
      img.addEventListener("error", () => img.remove());
    });

    root.querySelector(".rfx-hub").addEventListener("click", (e) => {
      const a = e.target.closest(".rfx-hub-card");
      if (a) track("estimator_hub_click", { service: a.dataset.id });
    });
    track("estimator_hub_view", {});
  }

  /* =========================================================================
     7. BOOT
     ========================================================================= */
  // Which funnel is this page? Matched against SETTINGS.pages first, then
  // against these stems appearing anywhere in the path.
  const PATH_STEMS = {
    roofing: ["roofing", "roof"],
    windows: ["window"],
    doors:   ["door"],
    siding:  ["siding"],
    solar:   ["solar"]
  };

  function detectService() {
    if (STANDALONE_SERVICE !== "auto") return STANDALONE_SERVICE;
    const path = String(window.location.pathname || "")
      .replace(/\/+$/, "").toLowerCase();

    // Exact slug match wins.
    const exact = Object.keys(SETTINGS.pages).filter((k) => {
      const slug = String(SETTINGS.pages[k] || "").replace(/\/+$/, "").toLowerCase();
      return slug && slug !== "/" && path === slug;
    })[0];
    if (exact) return exact;

    // Otherwise look for the service name in the path.
    const loose = Object.keys(PATH_STEMS).filter((k) =>
      PATH_STEMS[k].some((stem) => path.indexOf(stem) > -1))[0];
    return loose || "hub";
  }

  function mountOne(el) {
    if (el.dataset.rfxReady) return;
    el.dataset.rfxReady = "1";
    if (el.dataset.service === "hub") mountHub(el);
    else if (SERVICES[el.dataset.service]) mountFunnel(el, el.dataset.service);
    else el.dataset.rfxReady = "";   // unknown service, leave it alone
  }

  function boot() {
    // Install A: mount divs on the page (script lives in Footer Code).
    const mounts = document.querySelectorAll(".rfx-mount");
    if (mounts.length) {
      Array.prototype.forEach.call(mounts, mountOne);
      return;
    }

    // Install B: the whole file pasted into one Embed element. Create a mount
    // right where the embed sits so it lands in the page flow, not at the end.
    const service = detectService();
    if (document.querySelector('.rfx-mount[data-service="' + service + '"]')) return;

    const el = document.createElement("div");
    el.className = "rfx-mount";
    el.setAttribute("data-service", service);

    const anchor = (SELF && SELF.parentNode) ? SELF : null;
    if (anchor) anchor.parentNode.insertBefore(el, anchor);
    else document.body.appendChild(el);

    mountOne(el);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
