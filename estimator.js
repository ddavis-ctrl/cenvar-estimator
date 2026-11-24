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
/* The funnel sets its own base text colour. Without this every rule that
   does not name a colour inherits from the host page, so a Webflow section
   with white text turned the headings, option titles and price figures white
   on our light grey. Setting it here means the widget never depends on what
   it is dropped into. */
.rfx-shell{max-width:640px;margin:0 auto;color:var(--rfx-ink);
font-family:var(--rfx-body);text-align:left}

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
.rfx-opt.rfx-opt-sub{padding:10px 16px;font-size:15px;opacity:.7;border-left-color:var(--rfx-line-2)}
.rfx-opt.rfx-opt-sub .rfx-opt-title{font-weight:500}
.rfx-opt.rfx-opt-sub .rfx-opt-note{font-size:13px}
.rfx-opt.rfx-opt-sub:hover,.rfx-opt.rfx-opt-sub.is-on{opacity:1}
.rfx-opt.rfx-opt-sub.is-on{border-left-color:var(--rfx-selected)}
/* Product photo on an answer card. Both shots are the same window at the
   same angle so the only visible difference is the material. */
/* Square variant, for material textures rather than product shots. */
.rfx-opt-img.is-square{width:62px;height:62px;object-fit:cover}
@media(max-width:380px){.rfx-opt-img.is-square{width:52px;height:52px}}
.rfx-opt-img{width:52px;height:78px;flex:none;object-fit:contain;border-radius:8px;
background:#fff;border:1px solid var(--rfx-line)}
@media(max-width:380px){.rfx-opt-img{width:42px;height:63px}}
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
/* --- gated price preview -------------------------------------------------
   The figures are the REAL ones. Two blur techniques are stacked on purpose:
   the filter property is the crisp one, and transparent text with a coloured
   shadow is the fallback, because a browser that silently ignores filter
   would otherwise render the price in full. Belt and braces on the one
   element whose whole job is to not be readable. */
.rfx-teaser{background:var(--rfx-panel);color:var(--rfx-on-panel);
border-radius:var(--rfx-radius-card);padding:18px 20px;margin-bottom:20px;
position:relative;overflow:hidden}
.rfx-teaser .rfx-panel-head{margin-bottom:13px}
.rfx-teaser-figs{display:flex;align-items:flex-start;justify-content:space-between;
gap:10px;user-select:none}
.rfx-blur{color:transparent!important;text-shadow:0 0 13px rgba(255,255,255,.72);
filter:blur(7px);-webkit-filter:blur(7px)}
.rfx-teaser-mo .rfx-blur{text-shadow:0 0 9px rgba(248,203,14,.75);filter:blur(5px);-webkit-filter:blur(5px)}
.rfx-lock{position:absolute;inset:0;display:flex;flex-direction:column;
align-items:center;justify-content:center;gap:7px;text-align:center;
background:linear-gradient(180deg,rgba(33,33,33,.18),rgba(33,33,33,.44))}
.rfx-lock svg{width:21px;height:21px;display:block}
.rfx-lock b{font-family:var(--rfx-display);font-weight:800;font-size:16px;
letter-spacing:-.01em}
.rfx-lock span{font-size:12.5px;color:var(--rfx-panel-mute);max-width:32ch;line-height:1.45}
/* --- the payment tile, raised off the dark panel ---------------------------
   Same construction as the option cards on the question screens: a top
   highlight, a dark bottom rim and a drop shadow, so it reads as sitting
   above the surface rather than printed on it. Tuned for a dark background,
   where the highlight has to carry most of the lift. */
.rfx-paytile{background:linear-gradient(180deg,#36444C 0%,#283138 62%,#20272C 100%);
border-radius:calc(var(--rfx-radius-card) - 1px);padding:15px 17px 13px;
box-shadow:inset 0 1px 0 rgba(255,255,255,.22),
           inset 0 -2px 0 rgba(0,0,0,.34),
           0 6px 16px rgba(0,0,0,.34),0 2px 4px rgba(0,0,0,.26)}
.rfx-paytile .rfx-figs{margin:0}
.rfx-permonth-row{display:flex;align-items:baseline;justify-content:space-between;
gap:12px;margin-top:7px}
.rfx-permonth{font-size:13px;color:var(--rfx-panel-mute)}
.rfx-sysprice{font-size:12.5px;font-style:italic;color:var(--rfx-panel-mute);
text-align:right}

/* --- cash and lease, as real buttons on the dark panel ------------------- */
.rfx-panel-alt{display:flex;gap:9px;margin-top:13px}
.rfx-jump{flex:1;font-family:var(--rfx-body);font-size:13.5px;font-weight:700;
color:#fff;border:0;border-radius:var(--rfx-radius);padding:11px 8px;cursor:pointer;
text-decoration:none;white-space:nowrap;
box-shadow:inset 0 1px 0 rgba(255,255,255,.30),
           inset 0 -2px 0 rgba(0,0,0,.28),
           0 4px 10px rgba(0,0,0,.30),0 1px 2px rgba(0,0,0,.22);
transition:transform .12s ease,box-shadow .12s ease}
.rfx-jump-cash{background:linear-gradient(180deg,#0A8347 0%,#056A38 62%,#045A2F 100%)}
.rfx-jump-lease{background:linear-gradient(180deg,#CE3030 0%,#B42525 62%,#9C1F1F 100%)}
.rfx-jump:hover{transform:translateY(-1px);
box-shadow:inset 0 1px 0 rgba(255,255,255,.34),
           inset 0 -2px 0 rgba(0,0,0,.28),
           0 7px 16px rgba(0,0,0,.36),0 2px 4px rgba(0,0,0,.24)}
.rfx-jump:active{transform:translateY(1px);
box-shadow:inset 0 3px 7px rgba(0,0,0,.34),0 1px 2px rgba(0,0,0,.2)}

/* --- the $0 down line, now directly above the call button ---------------- */
/* --- seasonal promotion -------------------------------------------------
   Built like the payment tile: a top highlight, a dark bottom rim and a drop
   shadow. Brand red with the existing gold as the accent, which reads as
   seasonal without costuming the page. */
.rfx-promo{position:relative;overflow:hidden;text-align:center;
margin:0 0 18px;padding:18px 18px 19px;border-radius:var(--rfx-radius-card);
background:linear-gradient(180deg,#C93030 0%,#B42525 58%,#981C1C 100%);
box-shadow:inset 0 1px 0 rgba(255,255,255,.34),
           inset 0 -2px 0 rgba(0,0,0,.26),
           0 6px 16px rgba(27,42,51,.26),0 2px 4px rgba(27,42,51,.18)}
.rfx-promo-head{position:relative;z-index:2;display:inline-block;line-height:1.3}
/* The headline is the shout; the dates are the qualifier. Caps and a clear
   size gap between them so the hierarchy reads at a glance. */
.rfx-promo-tag{font-family:var(--rfx-display);font-size:29px;font-weight:800;
line-height:1.05;letter-spacing:.005em;text-transform:uppercase;color:#fff;
text-shadow:0 2px 3px rgba(0,0,0,.3)}
.rfx-promo-dates{font-family:var(--rfx-display);font-size:16px;font-weight:700;
letter-spacing:.02em;color:var(--rfx-pay-accent);
text-shadow:0 1px 2px rgba(0,0,0,.28);white-space:nowrap}
@media(max-width:420px){
  .rfx-promo{padding:15px 14px 16px}
  .rfx-promo-tag{font-size:24px}
  .rfx-promo-dates{font-size:14.5px;display:block}
}

/* Wide-bar variant. The headline stacks over full-width artwork, so the
   dates get their own line and the bars carry the offer. */
.rfx-promo-bars .rfx-promo-tag{display:block}
.rfx-promo-bars .rfx-promo-dates{display:block;margin-top:1px}
/* Side by side on one line, which is what the artwork was drawn for. */
.rfx-promo-bars .rfx-promo-chips{flex-direction:row;gap:8px;margin-top:11px}
.rfx-promo-bar{display:block;flex:1;min-width:0;width:100%;height:auto;
border-radius:9px;border:1.5px solid rgba(255,255,255,.5);
box-shadow:0 3px 9px rgba(0,0,0,.3)}

/* Single square icon beside the headline, for windows and doors. */
.rfx-promo-row{display:flex;align-items:center;justify-content:space-between;
gap:14px;text-align:left}
.rfx-promo-row .rfx-promo-head{flex:1;min-width:0;display:block}
.rfx-promo-row .rfx-promo-tag{display:block}
.rfx-promo-row .rfx-promo-dates{display:block;margin-top:1px}
.rfx-promo-row .rfx-promo-chips{flex:none;margin-top:0;width:auto}
@media(max-width:340px){
  .rfx-promo-row{flex-direction:column;align-items:center;text-align:center;gap:9px}
}

/* Wide artwork on the final screen, also side by side. */
.rfx-promo-opts-wide{gap:8px}
.rfx-promo-opt.is-wide{width:auto;max-width:none;flex:1;min-width:0}

/* Santa. A lane of his own at the top of the banner, so the headline is
   never covered. One pass every 15 seconds: visible for about thirteen,
   away for the rest.

   Position is driven by left and top, which are relative to the banner.
   Viewport units would have moved the landing point with the window size.

   Speed is matched across every junction. The cruise runs at 9% of the
   banner per second and the deceleration begins at exactly that speed; the
   acceleration ends at 24%/s and the climb-out continues at exactly that.
   The beziers are chosen so the slopes line up:
     decelerate  cubic-bezier(.33,.66,.66,1)   starts at 2x its average, ends at 0
     accelerate  cubic-bezier(.34,0,.66,.32)   starts at 0, ends at 2x its average
   Anything else and the speed visibly steps at the boundary. */
.rfx-promo{padding-top:40px}
@media(max-width:420px){.rfx-promo{padding-top:34px}}
.rfx-sleigh{position:absolute;left:-16%;top:-2px;z-index:3;width:84px;color:#fff;
opacity:.9;pointer-events:none;
animation:rfx-sleigh 15s linear infinite}
.rfx-sleigh svg{display:block;width:100%;height:auto;
filter:drop-shadow(0 2px 3px rgba(0,0,0,.3))}
@media(max-width:420px){.rfx-sleigh{width:68px}}
@keyframes rfx-sleigh{
  /* enter and cruise, steady */
  0%      {left:-16%;top:-2px;transform:rotate(-5deg);opacity:0;
           animation-timing-function:linear}
  4%      {opacity:.9;animation-timing-function:linear}
  26.67%  {left:20%;top:1px;transform:rotate(-3deg);
           animation-timing-function:cubic-bezier(.33,.66,.66,1)}
  /* glide down and brake to a stop on the headline */
  40%     {left:29%;top:7px;transform:rotate(0deg);
           animation-timing-function:linear}
  /* parked, nothing moves */
  53.33%  {left:29%;top:7px;transform:rotate(0deg);
           animation-timing-function:cubic-bezier(.34,0,.66,.32)}
  /* pull away from rest, building to cruising speed */
  70%     {left:59%;top:-4px;transform:rotate(-5deg);
           animation-timing-function:linear}
  /* steady climb out */
  86%     {left:116.6%;top:-22px;transform:rotate(-7deg);opacity:.9;
           animation-timing-function:linear}
  86.01%  {opacity:0}
  100%    {left:116.6%;top:-22px;transform:rotate(-7deg);opacity:0}
}
@media(prefers-reduced-motion:reduce){.rfx-sleigh{display:none}}

/* Falling snow. Six flakes on staggered delays, each drifting as it falls.
   White at low opacity so it reads behind the headline rather than through
   it, and the whole layer is hidden for anyone who has asked for less
   motion. */
.rfx-snow{position:absolute;inset:0;z-index:1;pointer-events:none}
.rfx-snow i{position:absolute;top:-14px;display:block;border-radius:50%;
background:#fff;opacity:0;animation:rfx-fall linear infinite}
@keyframes rfx-fall{
  0%{transform:translate3d(0,-14px,0) rotate(0deg);opacity:0}
  12%{opacity:.75}
  88%{opacity:.6}
  100%{transform:translate3d(var(--dx,10px),120px,0) rotate(220deg);opacity:0}
}
.rfx-snow .f1{left:8%;width:7px;height:7px;--dx:14px;animation-duration:7.5s;animation-delay:0s}
.rfx-snow .f2{left:26%;width:5px;height:5px;--dx:-11px;animation-duration:9s;animation-delay:1.6s}
.rfx-snow .f3{left:45%;width:8px;height:8px;--dx:9px;animation-duration:6.8s;animation-delay:3.1s}
.rfx-snow .f4{left:63%;width:5px;height:5px;--dx:-14px;animation-duration:8.4s;animation-delay:.8s}
.rfx-snow .f5{left:79%;width:7px;height:7px;--dx:12px;animation-duration:7.9s;animation-delay:4.2s}
.rfx-snow .f6{left:92%;width:6px;height:6px;--dx:-9px;animation-duration:8.8s;animation-delay:2.4s}
@media(prefers-reduced-motion:reduce){.rfx-snow{display:none}}
.rfx-promo-short{position:relative;z-index:2;display:block;margin-top:5px;
font-size:13.5px;font-style:italic;color:rgba(255,255,255,.92);line-height:1.4;
text-shadow:0 1px 2px rgba(0,0,0,.28)}
@media(max-width:420px){.rfx-promo-short{font-size:12.5px}}

/* The two roofing choices, side by side with an "or" between them. */
.rfx-promo-opts{display:flex;align-items:center;justify-content:center;
gap:11px;margin-top:11px}

/* One tile: text on the left, image on the right. */
.rfx-promo-aside{display:flex;align-items:center;gap:13px}
.rfx-promo-aside .rfx-promo-body{flex:1;min-width:0}
.rfx-promo-aside .rfx-promo-body p{margin:0}
.rfx-promo-opts-one{flex:none;margin-top:0}
.rfx-promo-opts-one .rfx-promo-opt{width:96px;max-width:none}
@media(max-width:360px){
  .rfx-promo-aside{flex-direction:column;align-items:flex-start;gap:10px}
  .rfx-promo-opts-one{align-self:center}
}
.rfx-promo-opt{flex:none;width:104px;max-width:38%;border-radius:var(--rfx-radius);
overflow:hidden;border:1px solid var(--rfx-line-2);
box-shadow:inset 0 1px 0 rgba(255,255,255,.5),0 2px 6px rgba(27,42,51,.14)}
.rfx-promo-opt img{display:block;width:100%;height:auto}
.rfx-promo-or{flex:none;font-family:var(--rfx-display);font-size:12px;font-weight:700;
text-transform:uppercase;letter-spacing:.06em;color:var(--rfx-mute)}
@media(max-width:380px){.rfx-promo-opt{width:88px}}

/* Banner thumbnails. Small on purpose: a cue that there is something to
   choose between, not a second announcement. */
.rfx-promo-chips{position:relative;z-index:2;display:flex;justify-content:center;
align-items:center;gap:9px;margin-top:9px;width:100%}
.rfx-promo-chip-or{font-family:var(--rfx-display);font-size:12px;font-weight:800;
text-transform:uppercase;letter-spacing:.07em;color:rgba(255,255,255,.85);
text-shadow:0 1px 2px rgba(0,0,0,.3)}
/* Matched to the tile on the final screen, so the same artwork is the same
   size in both places. */
.rfx-promo-chip{display:block;width:96px;height:96px;border-radius:9px;
object-fit:cover;border:1.5px solid rgba(255,255,255,.55);
box-shadow:0 3px 9px rgba(0,0,0,.3)}
@media(max-width:420px){.rfx-promo-chip{width:80px;height:80px}}
.rfx-promo-note{border-radius:var(--rfx-radius-card);padding:13px 15px;
margin-bottom:12px;background:var(--rfx-card);
border:1px solid var(--rfx-line-2);border-left:4px solid var(--rfx-accent);
box-shadow:inset 0 2px 0 rgba(255,255,255,var(--d-hi)),
           0 2px 6px rgba(27,42,51,.09)}
.rfx-promo-note .rfx-promo-tag{display:block;font-size:13px;color:var(--rfx-accent);
margin-bottom:4px}
.rfx-promo-note p{font-size:13.5px;line-height:1.5;color:var(--rfx-ink-2);margin:0}
.rfx-reassure{font-size:14.5px;font-weight:700;color:var(--rfx-ink);text-align:center;
line-height:1.45;margin:0 0 11px}
.rfx-save{background:var(--rfx-card);border:1px solid var(--rfx-line);
border-radius:var(--rfx-radius-card);padding:16px 18px;margin-bottom:20px}
.rfx-save-h{font-size:11px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;
color:var(--rfx-mute);margin-bottom:10px}
.rfx-save-h-lead{font-family:var(--rfx-display);font-size:16px;font-weight:800;
letter-spacing:-.005em;text-transform:none;color:var(--rfx-accent);margin-bottom:13px}
.rfx-save-row{display:flex;justify-content:space-between;gap:14px;padding:7px 0;
font-size:15px;color:var(--rfx-ink-2);border-bottom:1px solid var(--rfx-line)}
.rfx-save-row strong{font-family:var(--rfx-display);font-weight:700;color:var(--rfx-ink);
white-space:nowrap}
.rfx-save-net strong{color:var(--rfx-accent)}
/* Ahead or behind, coloured to match the cash button and the accent red. */
.rfx-up{color:#056A38}
.rfx-down{color:var(--rfx-accent)}
/* A quiet question mark, sized to stay out of the way but still tappable. */
.rfx-help{display:inline-flex;align-items:center;justify-content:center;
width:15px;height:15px;margin-left:5px;vertical-align:1px;
font-family:var(--rfx-body);font-size:10px;font-weight:700;line-height:1;
color:var(--rfx-mute);background:var(--rfx-surface);
border:1px solid var(--rfx-line-2);border-radius:50%;cursor:pointer;padding:0}
.rfx-help:hover{color:var(--rfx-ink);border-color:var(--rfx-ink-2)}
.rfx-help-bub{display:block;margin:7px 0 2px;padding:10px 12px;
font-size:12.5px;line-height:1.5;color:var(--rfx-ink-2);
background:var(--rfx-surface);border:1px solid var(--rfx-line-2);
border-radius:var(--rfx-radius);max-width:46ch}
.rfx-help-bub[hidden]{display:none}
.rfx-save-big{border-bottom:0;padding-top:12px}
.rfx-save-big strong{font-size:20px;letter-spacing:-.02em}
.rfx-ways{display:flex;gap:6px;margin-bottom:12px}
/* The tabs carry the same colours as the buttons up on the price panel, so
   the green and red mean the same thing in both places. Unselected tabs are
   outlined in their colour; the selected one fills. */
.rfx-way{flex:1;font-family:var(--rfx-body);font-size:13.5px;font-weight:600;
background:var(--rfx-card);border:1.5px solid var(--rfx-line-2);color:var(--rfx-ink-2);
border-radius:var(--rfx-radius);padding:9px 6px;cursor:pointer;white-space:nowrap;
transition:background .12s ease,color .12s ease,border-color .12s ease}
.rfx-way[data-way="loan"]{border-color:#5A6A6A;color:var(--rfx-ink-2)}
.rfx-way[data-way="cash"]{border-color:#056A38;color:#04562E}
.rfx-way[data-way="lease"]{border-color:#B42525;color:#991F1F}
.rfx-way:hover{filter:brightness(.97)}
.rfx-way.is-on{color:#fff;border-color:transparent;
box-shadow:inset 0 1px 0 rgba(255,255,255,.28),inset 0 -2px 0 rgba(0,0,0,.26),
           0 3px 8px rgba(27,42,51,.22)}
.rfx-way[data-way="loan"].is-on{background:linear-gradient(180deg,#3A4750 0%,#262F35 62%,#1C2328 100%)}
.rfx-way[data-way="cash"].is-on{background:linear-gradient(180deg,#0A8347 0%,#056A38 62%,#045A2F 100%)}
.rfx-way[data-way="lease"].is-on{background:linear-gradient(180deg,#CE3030 0%,#B42525 62%,#9C1F1F 100%)}
.rfx-way-note{font-size:12.5px;line-height:1.5;color:var(--rfx-mute);margin-top:10px}
.rfx-way-note strong{color:var(--rfx-ink-2)}
.rfx-work-toggle{width:100%;font-family:var(--rfx-body);font-size:14px;font-weight:600;
color:var(--rfx-ink-2);background:var(--rfx-surface);border:1px solid var(--rfx-line-2);
border-radius:var(--rfx-radius);padding:11px;margin-top:12px;cursor:pointer}
.rfx-work-toggle:hover{border-color:var(--rfx-ink-2);color:var(--rfx-ink)}
.rfx-work{margin-top:14px;padding-top:14px;border-top:1px solid var(--rfx-line)}
.rfx-work[hidden]{display:none}
.rfx-work-h{font-size:11px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;
color:var(--rfx-mute);margin-bottom:8px}
.rfx-work-row{display:flex;justify-content:space-between;gap:14px;padding:5px 0;
font-size:14px;color:var(--rfx-ink-2)}
.rfx-work-row strong{font-weight:600;color:var(--rfx-ink);white-space:nowrap}
.rfx-scn{display:flex;gap:7px;margin-bottom:9px}
.rfx-scn-btn{flex:1;font-family:var(--rfx-body);font-size:14px;color:var(--rfx-ink-2);
background:var(--rfx-card);border:1px solid var(--rfx-line-2);
border-radius:var(--rfx-radius);padding:9px;cursor:pointer}
.rfx-scn-btn.is-on{border-color:var(--rfx-selected);background:var(--rfx-tint);
color:var(--rfx-ink);font-weight:600}
.rfx-work-note{font-size:13px;color:var(--rfx-ink-2);margin-bottom:10px}
.rfx-work-src{font-size:11.5px;line-height:1.5;color:var(--rfx-mute)}
.rfx-save-fine{font-size:11.5px;line-height:1.5;color:var(--rfx-mute);margin-top:10px}
.rfx-prior{border:1px solid var(--rfx-line);border-radius:var(--rfx-radius-card);
padding:14px 16px;margin:18px 0 0;background:var(--rfx-card)}
.rfx-prior-h{font-size:11px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;
color:var(--rfx-mute);margin-bottom:8px}
.rfx-prior-row{display:flex;justify-content:space-between;gap:14px;padding:6px 0;font-size:14px}
.rfx-prior-k{color:var(--rfx-ink-2);min-width:0}
.rfx-prior-v{font-family:var(--rfx-display);font-weight:600;white-space:nowrap}
.rfx-fix{font-size:14px;color:var(--rfx-ink-2);margin:-6px 0 14px}
.rfx-fix-btn{font:inherit;font-weight:700;color:var(--rfx-selected);background:none;
border:0;padding:0;text-decoration:underline;cursor:pointer}
.rfx-fix-btn:hover{color:var(--rfx-ink)}

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
/* The wrapper is full width and centres its children with flex, so nothing
   depends on auto margins resolving, which is what kept failing before. */
.rfx-disc{display:flex;flex-direction:column;align-items:center;
text-align:center;margin:0 0 18px}
.rfx-disc-terms{font-size:12px;color:var(--rfx-ink-2);margin:0 0 6px;font-weight:600}
.rfx-disc-toggle{font-family:var(--rfx-body);font-size:12px;color:var(--rfx-ink-2);
background:none;border:0;padding:2px 4px;cursor:pointer;text-decoration:underline;
text-underline-offset:3px}
.rfx-disc-toggle:hover{color:var(--rfx-ink)}
.rfx-disclosure{font-size:10.5px;font-style:italic;line-height:1.5;
color:var(--rfx-mute);text-align:center;max-width:62ch;margin:9px 0 0}
.rfx-disclosure[hidden]{display:none}
/* Sits under the trust line, quieter than it: a credential people check
   rather than read. */
.rfx-license{font-size:11.5px;color:var(--rfx-mute);text-align:center;
letter-spacing:.02em;margin:5px 0 0}
.rfx-note-lead{display:block;font-size:16px;font-weight:700;color:var(--rfx-ink);
line-height:1.4}
.rfx-note-sub{display:block;font-size:13.5px;color:var(--rfx-ink-2);line-height:1.5;
margin-top:5px}
.rfx-note{background:var(--rfx-card);border-left:4px solid var(--rfx-accent);padding:15px 17px;
font-size:15px;color:var(--rfx-ink-2);margin-bottom:22px}
.rfx-recap{border-top:1px solid var(--rfx-line);margin-bottom:22px}
/* The answers they gave, as a compact raised tile rather than a long list. */
.rfx-recap-tile{border-top:0;border-radius:var(--rfx-radius-card);padding:11px 14px;
margin-bottom:18px;
background:linear-gradient(180deg,var(--rfx-card) 0%,
  color-mix(in srgb,var(--rfx-card) 55%,var(--rfx-card-grad-end)) 72%,
  var(--rfx-card-grad-end) 100%);
border:1px solid var(--rfx-line-2);
box-shadow:inset 0 2px 0 rgba(255,255,255,var(--d-hi)),
           inset 0 -2px 0 rgba(27,42,51,var(--d-rim)),
           0 2px 6px rgba(27,42,51,.09)}
.rfx-recap-tile .rfx-recap-row{padding:5px 0;font-size:13px;border:0}
.rfx-recap-tile .rfx-recap-row + .rfx-recap-row{border-top:1px solid var(--rfx-line)}
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

/* --- dimension -----------------------------------------------------------
   The funnel is a tool embedded on the site rather than another page of it,
   so it carries depth the flat site does not.

   Only the GRADIENT sits behind text; highlight, rim and shadow live at the
   edges. So the gradient holds light through the text and dives only in the
   last 28% where the rim is, and its bottom stop is fed to the contrast
   solver in brandVars(). Spending the depth budget on the edges instead of
   the fill is what keeps small text legible.

   Tuned values: gradient 22, highlight 1.00, rim 0.14, shadow 1.25, radius
   20px. Change --d-sh to scale every shadow layer and the hover lift at once.
-------------------------------------------------------------------------- */
.rfx{--d-hi:1;--d-rim:.14;--d-sh:1.25}
.rfx-opt,.rfx-range,.rfx-note,.rfx-prior,.rfx-stepper,.rfx-hub-card,.rfx-stat{
background-image:linear-gradient(180deg,var(--rfx-card) 0%,
  color-mix(in srgb,var(--rfx-card) 55%,var(--rfx-card-grad-end)) 72%,
  var(--rfx-card-grad-end) 100%);
box-shadow:inset 0 2px 0 rgba(255,255,255,var(--d-hi)),
           inset 0 -2px 0 rgba(27,42,51,var(--d-rim)),
           0 calc(2px*var(--d-sh)) calc(3px*var(--d-sh)) rgba(27,42,51,calc(.06*var(--d-sh))),
           0 calc(8px*var(--d-sh)) calc(18px*var(--d-sh)) rgba(27,42,51,calc(.10*var(--d-sh))),
           0 calc(20px*var(--d-sh)) calc(44px*var(--d-sh)) rgba(27,42,51,calc(.11*var(--d-sh)))}
.rfx-opt,.rfx-btn,.rfx-hub-card{transition:transform .14s cubic-bezier(.2,.7,.3,1),
  box-shadow .14s ease,border-color .14s ease}
.rfx-opt:hover,.rfx-hub-card:hover{transform:translateY(-3px)}
.rfx-opt:active{transform:translateY(2px);
  box-shadow:inset 0 2px 5px rgba(27,42,51,.16),0 1px 2px rgba(27,42,51,.10)}
.rfx-btn-primary{background-image:linear-gradient(180deg,
  color-mix(in srgb,var(--rfx-action) 86%,#FFF) 0%,var(--rfx-action) 100%);
box-shadow:inset 0 2px 0 rgba(255,255,255,.30),inset 0 -2px 0 rgba(0,0,0,.26),
           0 calc(3px*var(--d-sh)) calc(5px*var(--d-sh)) rgba(27,42,51,.17),
           0 calc(10px*var(--d-sh)) calc(22px*var(--d-sh)) rgba(27,42,51,.22)}
.rfx-btn-primary:hover{transform:translateY(-3px)}
.rfx-btn-primary:active{transform:translateY(2px);
  box-shadow:inset 0 3px 7px rgba(0,0,0,.34),0 1px 2px rgba(27,42,51,.14)}
/* MUST carry both classes and sit after .rfx-btn-primary. At equal specificity
   the later rule wins, and a bare .rfx-btn-ghost here renders dark ink on the
   dark primary gradient. */
.rfx-btn.rfx-btn-ghost{color:var(--rfx-ink);font-weight:600;
background-image:linear-gradient(180deg,var(--rfx-card) 0%,
  color-mix(in srgb,var(--rfx-card) 55%,var(--rfx-card-grad-end)) 72%,
  var(--rfx-card-grad-end) 100%);
border:1px solid var(--rfx-line-2);
box-shadow:inset 0 2px 0 rgba(255,255,255,var(--d-hi)),
           inset 0 -2px 0 rgba(27,42,51,var(--d-rim)),
           0 calc(2px*var(--d-sh)) calc(3px*var(--d-sh)) rgba(27,42,51,.06),
           0 calc(8px*var(--d-sh)) calc(18px*var(--d-sh)) rgba(27,42,51,.09)}
.rfx-btn.rfx-btn-ghost:hover{transform:translateY(-3px);border-color:var(--rfx-ink)}
.rfx-btn.rfx-btn-ghost:active{transform:translateY(2px);
  box-shadow:inset 0 2px 5px rgba(27,42,51,.16)}
.rfx-range-bar{border-radius:99px;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.45),inset 0 -1px 0 rgba(0,0,0,.12)}
/* Browsers without color-mix get a flat card rather than a broken gradient. */
@supports not (background:color-mix(in srgb,#000 50%,#FFF)){
  .rfx-opt,.rfx-range,.rfx-note,.rfx-prior,.rfx-stepper,.rfx-hub-card,.rfx-stat,
  .rfx-btn.rfx-btn-ghost{background-image:none}
}

/* --- price sizing --------------------------------------------------------
   These keyed off vw, i.e. the viewport, while the shell is capped at 640px.
   On a wide screen that resolves to the maximum regardless of how narrow the
   card actually is, and Outfit is wider than the old fallback, so the two
   figures overran. Container units tie the size to the card. The vw clamp
   stays as the fallback. */
.rfx-range,.rfx-panel{container-type:inline-size}
@supports (font-size:1cqi){
  .rfx-range-nums{font-size:clamp(23px,6.4cqi,34px)}
  .rfx-fig-total{font-size:clamp(22px,6.1cqi,32px)}
}
.rfx-range-nums{min-width:0}
.rfx-range-nums span,.rfx-fig-total{white-space:nowrap}
/* Outfit sets a touch wide at display sizes. */
.rfx-range-nums,.rfx-h,.rfx-fig-total,.rfx-step-val{letter-spacing:-.022em}
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
    radius:     "20px",
    radiusCard: "20px",   // answer cards, panels, satellite frame, hub tiles

    /* Bottom stop of the card gradient. It is a real background that text sits
       on, so it is fed into the contrast solver below alongside card and
       surface. Darken it and `mute` lightens less, automatically. */
    cardGradEnd: "#DCE3E6",

    // false keeps the funnel flat, matching cenvarroofing.com, which has no
    // shadows anywhere. true lifts the cards off the page. The shadow colour
    // is derived from `ink` so it reads as tinted rather than generic grey.
    shadows: false,

    logoUrl: "",
    logoAlt: "Cenvar Roofing & Exteriors",

    // "inherit" makes the funnel pick up whatever font the Webflow page already
    // loads, so it matches your site without naming a family. To force one
    // instead, set fontUrl to a Google Fonts URL and name the families here.
    /* The funnel used to inherit the Webflow page font. It is now its own
       thing: a tool embedded on the site rather than another page of it.
       loadBrandFont() injects this link with preconnects, so there is nothing
       to add on the Webflow side. */
    fontUrl:     "https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800" +
                 "&family=Figtree:wght@400;500;600;700&display=swap",
    displayFont: "'Outfit', ui-sans-serif, system-ui, -apple-system, sans-serif",
    bodyFont:    "'Figtree', ui-sans-serif, system-ui, -apple-system, sans-serif"
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
    /* The card gradient's bottom stop is darker than the card, and small text
       sits on it, so it belongs in the set the contrast solver works against.
       Without it `mute` clears 4.5:1 on white and fails on the gradient. */
    const bgs = [card, B.surface, B.cardGradEnd || card];
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
      "--rfx-card-grad-end": B.cardGradEnd || (B.card || W),
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
  /* =========================================================================
     SEASONAL PROMOTION
     -------------------------------------------------------------------------
     Announced, never applied. The quote is a range and "20% off labour" is
     not 20% off the total, so discounting the figure on screen would state a
     number nobody can honour. The banner tells them an offer exists and the
     rep works out the actual saving.

     DATE GATED. It appears on its own on 27 November and stops on 1 February,
     so nobody has to remember to pull it down. Dates are read in the
     visitor's own timezone, which is close enough for a promotion.

     Siding and solar carry no offer, so they get no banner.
     ========================================================================= */
  // The 20% artwork is shared by three services, so it is stored once rather
  // than inlined three times.
  /* Wide 4:1 artwork for the banner on the first screen. The square versions
     below are still used on the final screen, where the block is narrower. */
  const PROMO_LABOR_BAR = "data:image/webp;base64,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";
  const PROMO_WARRANTY_BAR = "data:image/webp;base64,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";

  const PROMO_LABOR_IMG = "data:image/webp;base64,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";

  const PROMO = {
    enabled: true,
    start: "2026-11-27",          // Black Friday
    end:   "2027-01-31",          // inclusive, runs into the new year
    label: "Seasonal Special!",
    dates: "Black Friday - Jan 31st",
    /* Short line for the banner. Roofing shows its two images instead, which
       already carry this wording, so only services without images use it. */
    shortByService: {
      roofing: "20% off labor, or a free lifetime workmanship warranty",
      windows: "20% off labor",
      doors:   "20% off labor"
    },

    /* Roofing is the only offer with a choice, so it is the only one that
       gets the two tiles. Inlined, so there is nothing to host. */
    /* What the banner shows. Wide bars, full width, stacked when there are
       two. Separate from optionsByService because the final screen is a
       narrower block and wants the square crops. */
    barsByService: {
      roofing: [
        { alt: "20% off labor", img: PROMO_LABOR_BAR },
        { alt: "Free lifetime workmanship warranty", img: PROMO_WARRANTY_BAR }
      ],
      // Windows and doors keep the square icon beside the headline, as before.
      // A 4:1 bar cannot sit in that narrow right-hand slot.
    },

    optionsByService: {
      roofing: [
        { alt: "20% off labor", img: PROMO_LABOR_IMG },
        { alt: "Free lifetime workmanship warranty", img: "data:image/webp;base64,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" }
      ],
      // One offer, so one tile, and it sits beside the text rather than under
      // it. NOTE: this artwork has a shingle roof behind it. Fine as a
      // placeholder, but a window or door version would suit these landers.
      windows: [{ alt: "20% off labor", img: PROMO_LABOR_IMG }],
      doors:   [{ alt: "20% off labor", img: PROMO_LABOR_IMG }]
    },

    byService: {
      roofing: "Sign a roof replacement contract between Black Friday and " +
               "January 31 and take your choice of 20% off labor, or a free " +
               "lifetime workmanship warranty.",
      windows: "Sign a window or door replacement contract between Black Friday " +
               "and January 31 and take 20% off labor.",
      doors:   "Sign a window or door replacement contract between Black Friday " +
               "and January 31 and take 20% off labor."
    }
  };

  // True only inside the window, and only for a service with an offer.
  function promoFor(serviceId) {
    if (!PROMO.enabled || !PROMO.byService[serviceId]) return null;
    const now = new Date();
    const today = now.getFullYear() + "-" +
      String(now.getMonth() + 1).padStart(2, "0") + "-" +
      String(now.getDate()).padStart(2, "0");
    if (today < PROMO.start || today > PROMO.end) return null;
    return PROMO.byService[serviceId];
  }

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
        details: "estimator_details",
        attributionSource: "attribution_source"
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
      solar:   "/lander-solar-estimate"
    },
    // Pulled from cenvarroofing.com. Edit if any of it is stale.
    company: {
      name:      "Cenvar",
      // CallTrackingMetrics number. Used for every call link in the funnel so
      // estimator calls are attributable. Changing it here changes it
      // everywhere: the price-screen button and the submission-error message.
      // Default for roofing, windows, doors and siding. A service can carry
      // its own number with `phone` and `phoneHref`, which solar does since
      // it runs on a separate site and a separate ad account.
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
      // Any service can override it with its own `reassurance` and
      // `priceCaveat` — solar does, because "satisfied" is a subjective
      // standard the solar team deliberately avoids, and because solar is a
      // site assessment rather than a measurement.
      reassurance: "$0 down until the job is done. You don't pay until you're 100% satisfied.",
      // Sits under the price. Frames the range as a starting point and points
      // at the call, rather than apologising for not being exact.
      priceCaveat: "This is what work like yours typically costs. A free measurement " +
        "gives you the exact number, with no pressure to book.",
      // Default credibility line. Any service can override it with its own
      // `trustLine`. A manufacturer credential only belongs on the trade it
      // applies to, so Owens Corning lives on roofing and nowhere else.
      trustLine: "4.9 stars across 9,400+ reviews · BBB A+ rated",

      /* Shown on the price screen under the trust line. Which one appears is
         decided by the ZIP the customer already gave us: Virginia runs to
         24658 and West Virginia occupies 24701 to 26886, so the two ranges do
         not overlap. If the ZIP is missing or falls outside both, we show
         both numbers rather than guess, because a Virginia-only line is wrong
         for a West Virginia homeowner and vice versa. */
      license:   "VA Contractors License #2705192604",
      licenseWv: "WV Contractors License #WV065759",

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
        "4107": { label: "Plan #4107", lender: "Service Finance Company, LLC",
                  rate: 9.99, apr: 9.99, months: 180,
                  factor: 0.0107, min: 3000, max: 100000, rateIsStarting: true },

        /* ----------------------------------------------------------------
           SOLAR — Atmos, residential solar, Virginia.
           Best FICO tier (801-850) on the longest term, which is the lowest
           monthly payment: 20 years at 7.59%. That tier lends to $125,000.
           Lower tiers pay more and borrow less, which is why the disclosure
           says rates start here rather than presenting this as the rate.

           factor 0.0081111 is the true amortising factor for 7.59% over 240
           months, computed rather than taken off the sheet, since Atmos
           publishes rates rather than factors.

           OUTSTANDING — THE 3% FEE. The sheet is headed "3% Fee Amortizing
           Loans". If Atmos takes that fee out of the dealer proceeds, which
           is the usual structure, the customer's APR is 7.59% and the
           disclosure below is correct, but Cenvar nets 97% of every financed
           job. If instead the fee is financed into the customer's loan, their
           APR is closer to 8.00% and `apr` must be set to that. Confirm with
           Kyle before this goes live.
           ---------------------------------------------------------------- */
        /* Atmos adds its 3% fee ON TOP of the cash contract price to get the
           loan principal. Two consequences, both handled here:

           1. `feeFactor` grosses the quote up before the payment is worked
              out. Quoting off the cash price alone understates every payment.

           2. That fee is a finance charge the customer pays, so the APR is
              NOT the note rate. 7.59% over 240 months is 7.98% APR; 6.58%
              over 144 is 7.15%. The disclosure states `apr`, which is what
              Regulation Z requires. Stating the note rate would be false.

           `min` and `max` apply to the LOAN, so after the gross-up the usable
           cash range is roughly $9,709 to $121,359. */
        "atmos20": { label: "Atmos 20 year", lender: "Atmos Financial",
                     rate: 7.59, apr: 7.98, months: 240,
                     factor: 0.0081111, feeFactor: 1.03,
                     min: 10000, max: 125000, rateIsStarting: true },

        "atmos12": { label: "Atmos 12 year", lender: "Atmos Financial",
                     rate: 6.58, apr: 7.15, months: 144,
                     factor: 0.0100613, feeFactor: 1.03,
                     min: 10000, max: 125000, rateIsStarting: true },
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
        solar:   "atmos20"   // different lender, different sheet
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
        "project cost, and lender approval. The amount financed may include a " +
        "lender fee added to the contract price. Financing provided by " +
        "{lender}. Subject to credit approval. Minimum amount financed {min}."
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
      { v: "none",     t: "No glass",               imgSquare: true, img: "data:image/webp;base64,UklGRpgAAABXRUJQVlA4IIwAAADwCACdASqAAIAAPp1Gnkolo6KhqogAsBOJaW7dACQGiUUpzw4oagXcpDaOTgyERKFyUhtHJwZCIlC5KQ2jk4MhEShclCtbXZAa6vk6xtOFMAD+9TrNupengJ2QAKoXCsnsbLZ28FJfsQQcHrkVkH+9ugAAAACYatLlIR/UxOegzkkZz6/bshEnZYcAAA==" },
      { v: "half",     t: "Half glass",             imgSquare: true, img: "data:image/webp;base64,UklGRkQBAABXRUJQVlA4IDgBAAAQEACdASqAAIAAPp1EnUilpCMhLpwY6LATiWkAFs1Cy53CYzP0GOIoOS/iE7jxSfllONKrCO53DSvPBHcBwYfVG+th0bOyledDIHXVhF4ILkcjsWXWj6u1Rz+wQKeKt9AV1HDQ2rmfWjdfJobCYoYjU6X2SPEQj8OxjH1XBsLEssRjL3KnXeZDsAD+9TsvyyU4o+xi41rqZpJjGjTagB/awfcR2Nb5HmoqJfiIHMv6b9T1HvvhsqO3LcGJkcxT/FKICgWYcz/vzNp0ojdYuQdOveRwoOCL7s3yuU3wPS+K46FpWVeC6FZMwxdbshTsYaQVfUFdM5jyNf5hXb6nmBAbF5ygqMMjNs2HQMZV55yAs9OJpJg0qc+PUoYrDf8LS7lXH2m8EO8GptbzyhSXZFD6RjtxRvYgAAA=" },
      { v: "full",     t: "Full glass",             imgSquare: true, img: "data:image/webp;base64,UklGRhIBAABXRUJQVlA4IAYBAACwDwCdASqAAIAAPp1CnEklo6MhLZ2ZSLATiWkAAFlEZXbNbo7kjv/vnOTejHCGqSdIwkWNiqiJMzTCthFmQrNlK/RjgmEh02dRSuUL7KZS9i0JpIz2OHvfPmyxaOxZ7CKNpuhZEMiCcXC1N+mv74n8aL9ZQkMKtqL29BhIDGVTQkxK09DY8AD+9Tqdx03wYmUxM/D0QwmJlpQcpoxAYYPuI7Gt8jx1MIlZp67Ndeehi/e0A1MaEdpF6B8ZK1nQaNm5XfNMqAxsXCAwd6MT1I280ot72JHCmpAfkIPI75OkckHG145AoZSFEPagAAB3oN9NxK390Vlt+o+GGND6RjtxRvYgAAAA" },
      { v: "small",    t: "Small decorative glass", imgSquare: true, img: "data:image/webp;base64,UklGRi4BAABXRUJQVlA4ICIBAADwDgCdASqAAIAAPp1Am0klo6KhLZxpSLATiWkcAAGU9jLq/6BnFiojVvWjGxBmIa7OkD3a57mgOiHYBb4/ufoOhf4qPWRxjX7i6tDFysH012VzC5iuvXkeTK5u/8Xv53PDCuvL+ue5iEA5jRRwgEVYh/Lr6B7/9nfeRPuHmnsQAAD+9Ttb1ZPdTQaFORnljQCqr8eFiXCyNCM3BQNSK7GiGN8jP/ifBTlLa5QtuZ1cBcA5/RTQfL8jsbtj518FvwDXArwCVOQQuJpRMhr9+CF/Tjuxz2Rdxu8ENxg2zVGo6rAJHQO1EDU0ZR5rmMNWL80nyf7PsEElxP1SfJhqlrsrQhz9X5nU3m1OA8DiJqA7xide3wDzSpVgCWJL4uT/uwAAAA==" },
      { v: "fulldeco", t: "Full decorative glass",  imgSquare: true, img: "data:image/webp;base64,UklGRpIBAABXRUJQVlA4IIYBAABQDwCdASqAAIAAPp1CnEklo6MhLJ1poLATiWkAAFFfdCxBW6J4arlaAGOzYPGuHA21WX28El3ZJSt5lTGdyEty/LBidCvzfZjonc++1AAzLzQIkaP6DIo6NXTzM/+K2wxIDXgNKqfF5dfPpdKlFDCyyR84vfnw+gvzKa7yGseIEHygAAD+9Tqdx03wYmUxM/D0QwmJlpQqJXYYSEzhN1Uwb7NgJE3qWZAJaoLS2zktBF9xIsFrFcyJqxHD++v2nqkX+MWemhU5yuIud3MOxPc1FQUnpNOENGSB+JFxeuCpcbB0AvS44uAJteQo51lp1USYhXR+sX9dKLfrZdqpZYdfpJV9bK9LOzvNapEpWM+bDht39fHXz7VsA37kfaVQP2BKzhPbJfF6rZwzOesHNytTtUo/s66RI+6UWXj/ENSB4uRvbRoRBKDATNlJF6tyT2gifv2yOmMQhM1B+phl1PnVmKNlcRifPDgspQAkg4t9E9PkUSJfsDZkp2cHkik46+4rbQBUAAA=" } ] },
    { id: "surround", heading: "Transom or sidelight?", cols: 1, options: [
      { v: "no",        t: "Neither" },
      { v: "transom",   t: "Transom",   n: "Window above the door",
        imgSquare: true, img: "data:image/webp;base64,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" },
      { v: "sidelight", t: "Sidelight", n: "Window beside the door",
        imgSquare: true, img: "data:image/webp;base64,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" },
      { v: "both",      t: "Both",      n: "Window above and beside",
        imgSquare: true, img: "data:image/webp;base64,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" } ] },
    { id: "hardware", heading: "What type of hardware would you like?", cols: 2, options: [
      { v: "standard", t: "Standard", imgSquare: true, img: "data:image/webp;base64,UklGRrYFAABXRUJQVlA4IKoFAABQHwCdASqAAIAAPplAmUglpCKhMXX72LATCWVpyKjx3Z+BTV7YaxELMzuADA/nsgfi8pDYEaF0VBASA1MpZa2GCNeQMyZtMmAZfnbAzhuRo/DhaJ+MrTizO2C9p4qjupUITYGVvEzGMJF3+qkhWMvb4tA2YTCp/zBci2HDTOsVVTQUO1FeD5HyWOJviDh9akDIX/+1zYBFwhBtmdWWYr8CCspNaHW7BhFi5XaCCbPvquVtqiN5z8sVdLXyXEZ9FdRylnslvWm1FzA4QXFihBwDnRvWR3Fr1WOvhVq04rHVGh1pCxfgpFSCp8IHrmpF+CdxNKQiL9fb2oEqgZ4PmK0LtMw8AP3Lzms/9/Bh6NfsgcCopV7fmKLVERqvu/EJTQ19aMGgngRGnBzkVOHrnksK0/7YwkKCpN25QN5EzS7wpByuDGfRlMvo8DUxEHQVXByeV4X+KQ8Gc/XxEHbfcs7gLcWsHA018vgXJ4RqBzlVDdDR0Mx89/eOQokUvI6NpeDbz8kG0n033pxnX0ytg3u92rdDzSLTE+zeY4X7utEsnfMwxqYbYOCigekWKbO+zMLdZyYPHRq9F2Twyk4gesSQ1vaZW0kD45Vk65nk7xiU2yIEbPqe+8KjbtQKMimgjREpgHD/ly8w565Hnmg5a3CucFCu4IR3nfWLmywdAMdv0vCZ51dYiPLwJahhb5O3HaeDh1uSsJPOH/AQh3aP16TakpCZKkIpgj/yRo46hK4NWMS9pzsII6+3bXGJgfkaOtgFOqCuRGtOHYQimwNOueaLFY887ka3TS0nVWsWD1Uj/UtCDI8ir8zTxvG6gDk26pgYQ4hi7ZxhXl0fo3sEEO0i1EUBvxZ8xTBn7b3oF/o4e/F3y56fZ11rOyR3ZDOzM5ehsALP7BICHqbg6EbjWksTTAoHMZnFA+b6MayREmJIjJK3NkGhEnTySVt7i1MsAFu2UDPvbw13tYJOCLcK3csqNH/DT3+ZL1RNuI8GoBn7JP+TPTiS1MyU3y1vEFMuoGdAQyDg9MG3qDkWVaG+NI4LhGpEMWY1iDr2XD/b4fzROUk92PoRjlQNKgtd8VNV0LgfLEpczQVwGsabCdTnhZzH51Wa8ntxeQP3wynxk3yirQuS2zAicM1k6uSZ84VfUja49puCoyK95plZ2tnb2JQkrv/EtCpm5WPftl8Mo5tXUAqw/t5aJlIyU+//k8r8X+0X/IKE8ALkF6XCsr49zwdsL9YkkNHDyaWvoGN3nJO2hSbgrh1SWF5g54Dvxc/Pkjl9WQ1aIfzezFzI1dYzEWPUlXGVQafBYgAAGxwlVq+GSAuw4ldaCm4I/IVEmdaZpraZIkkcLKuYMFOmf6ZbbvdCHDpEYwKaKHb/6G6E/3dwmS5WRiFiZxcsORPm7SOZriXwjoOOvVlEbDzqDA+hU/OaulMkaGxfijFW4e42ROTWG8h0ySGgjqTyzO4ufiQEfACJZeBcugPTrdMFA1kuLoVsogneOxhqYhX3heiLY+YZy/Es1IHAb+t27B9NDSSoPh30KjIRMQsT/LSYh4TxmMvdkb2XGyqbP7n1OCva4WWFkSi/V19n8iTUtoYNubkHIPdq2WU86vFDVMlVXbVesVyjGK9MstybbQhJnBWfpWpaMUk5wn5UA+8TWb/pf3j0hiZMjEczI2DYchKVInN9y3Ufzf3izgz38DMqIgy2n8TrlnBJ5TTzcE+rYKT7PgkZWrfKuRRPvT6qR90IKCfBVYr6qpU/h1LhZ9Ak2NfmfXdj4knry9IDTprXmnFsvIsW75xgx+wLvWQjXu6gOgPMAIP58LmNJxnn3Od8trdI/8h78vbgFWj5M20161v03guPKgMp9F76lqWu8oS0KUc7SLSRTmsFvPnW7/LXlyEDedf1TrTGZJPbxeITR4jms8uvM6FhiDgAzT8YZAAA" },
      { v: "premium",  t: "Premium",  n: "Heavier finish, better lockset",
        imgSquare: true, img: "data:image/webp;base64,UklGRrgEAABXRUJQVlA4IKwEAACwGwCdASqAAIAAPp1EnUqlo6YpqpJLiTATiWM/MhgVoKs7qsh67egIu6o6CLOvNhzLC7oFAhp4dVwGnimSNJJtEtc7tp1f+XX4aJtOtEc++kOv9oSf3Bdko6cBEy+dYeAxNqvvlceE3BEcq0hoeYIrIe2Hsd22qW7tuq7HSTG75CB52B2zP8ViMXZ1ZFVGN1IAwjfup+8Dq9u/eLf+8qt5dDpcRuIQAexnSxQkXlHEhXuj2Xbt0zECPPXYQtV3wnBNO/hPXGH1qwr8OO1pwX1ZsoRh6f+WGVo17gPJsVUorxC/lho4AAD+3yEBgvVMYEIzHPwsIKUbont5pztGkZ/opWrd9O4v4acOzwxZBcKGlcDHf68ak+d4ojxhp1a6qS68ORlk0KibgkZSrLDrrY4BJRnEudzWUr4gGc/LE+e/+knPj7CYJ3aTzHz+QNI989nKaiEaQ8+vaf5lqIBNq8EfUvhvdS99GzpBJ/NFWX428ZezdUyTqzOVO0y6v1ZtxNfjCNJEeuISmA3Y5ZZ3Q+sxeq+njVIyI84Un64eXYfu3UhVWNqEN5A1yTWNdAvoARC7/loihPkrB77E0WaFeb47HLqog0LW7dVTmvOtQ1XnaV6eYfK6CQdp6x6CUXL1M7TNoyDsQ8ZvXG8GKIt2gHuHau/WNCnC5rq8KLL8TPJOtfUncGfknUCXdp/vNuvTjHrn7CYl4jAN94J+OgvqTPEMYzYNuPqG6BC6zjqCcgXwHT88/A+CosH6s+R62Wt4h84CB/qrgIcUcJgTWNC7V5R4Xtt4XAaba0oB56nIymL83BC7tzQbE7gsscpqHoj9G4gIH2DsmBCr9rTPN87jPD+egEOHjj/tJNfNnj31sypU3G7ff+HS2gFYgDLTMIgZDmigstsS8d7LnW8aa71RMIyP9xhcO706OLpbALvwQ+E8cjkeFg0orsq12v1ExOz3bQ0486mB2hFsChaq+Hj88PDZuJFJ4AAdERFcK5vi7+yhWJfYU37GgJTI/KZNS0qoOT3JY2MB+aAg7+ysGkMu3XbF/VHpu3YDRQ4m/zS5JPZ8Gg3fvYJdRbvrxtuwjY0cZo1t6LwEGQ9on6iw+Ast9NwtT73KTobLdEREHkINl+yv6/sGdEAjyJsKOpYMlFMY7sKN4zI+jAwspcUsW52kuBCsXDhpbw32Gx2EXgp5LNEQN1VYJ2fhsof32iwiBUrWCFWKi07B0AlW7pc8FX+P4M6Bc4bbZRLmZ46BvfPhay/IMTO2h2e9frIYHAl/dYVyugcaEyctdNWs3D4KJT174U2IHnKakiYW/OG4Dj3f+63Eznm1koCMiPVHiWR96jwjG9bL6YTghK3cbIyUKfILzIdfSrEO/Z5Li2eMuh62fobSjOFWQSen8cwvj0JxePZYIKGNs6oNprhuMB8APcEhIiBLkq/GwvUIRvlRnWCA6a9Ni8VcecVijFL+eDbxYCPYnYOCo7vfzEy3DO5CxmqxL2LxxARViowlmrWR/gyrR+Rdl8zgHTBMdGVk8mvqHLEqgzBFaI0qvbtTcHQwAcBBTiVIWWN6WQDb1ciRYE3L2kiODpLdA0uf6h6BfAAAAA==" } ] }
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
      { v: "standard", t: "Standard", imgSquare: true, img: "data:image/webp;base64,UklGRrYFAABXRUJQVlA4IKoFAABQHwCdASqAAIAAPplAmUglpCKhMXX72LATCWVpyKjx3Z+BTV7YaxELMzuADA/nsgfi8pDYEaF0VBASA1MpZa2GCNeQMyZtMmAZfnbAzhuRo/DhaJ+MrTizO2C9p4qjupUITYGVvEzGMJF3+qkhWMvb4tA2YTCp/zBci2HDTOsVVTQUO1FeD5HyWOJviDh9akDIX/+1zYBFwhBtmdWWYr8CCspNaHW7BhFi5XaCCbPvquVtqiN5z8sVdLXyXEZ9FdRylnslvWm1FzA4QXFihBwDnRvWR3Fr1WOvhVq04rHVGh1pCxfgpFSCp8IHrmpF+CdxNKQiL9fb2oEqgZ4PmK0LtMw8AP3Lzms/9/Bh6NfsgcCopV7fmKLVERqvu/EJTQ19aMGgngRGnBzkVOHrnksK0/7YwkKCpN25QN5EzS7wpByuDGfRlMvo8DUxEHQVXByeV4X+KQ8Gc/XxEHbfcs7gLcWsHA018vgXJ4RqBzlVDdDR0Mx89/eOQokUvI6NpeDbz8kG0n033pxnX0ytg3u92rdDzSLTE+zeY4X7utEsnfMwxqYbYOCigekWKbO+zMLdZyYPHRq9F2Twyk4gesSQ1vaZW0kD45Vk65nk7xiU2yIEbPqe+8KjbtQKMimgjREpgHD/ly8w565Hnmg5a3CucFCu4IR3nfWLmywdAMdv0vCZ51dYiPLwJahhb5O3HaeDh1uSsJPOH/AQh3aP16TakpCZKkIpgj/yRo46hK4NWMS9pzsII6+3bXGJgfkaOtgFOqCuRGtOHYQimwNOueaLFY887ka3TS0nVWsWD1Uj/UtCDI8ir8zTxvG6gDk26pgYQ4hi7ZxhXl0fo3sEEO0i1EUBvxZ8xTBn7b3oF/o4e/F3y56fZ11rOyR3ZDOzM5ehsALP7BICHqbg6EbjWksTTAoHMZnFA+b6MayREmJIjJK3NkGhEnTySVt7i1MsAFu2UDPvbw13tYJOCLcK3csqNH/DT3+ZL1RNuI8GoBn7JP+TPTiS1MyU3y1vEFMuoGdAQyDg9MG3qDkWVaG+NI4LhGpEMWY1iDr2XD/b4fzROUk92PoRjlQNKgtd8VNV0LgfLEpczQVwGsabCdTnhZzH51Wa8ntxeQP3wynxk3yirQuS2zAicM1k6uSZ84VfUja49puCoyK95plZ2tnb2JQkrv/EtCpm5WPftl8Mo5tXUAqw/t5aJlIyU+//k8r8X+0X/IKE8ALkF6XCsr49zwdsL9YkkNHDyaWvoGN3nJO2hSbgrh1SWF5g54Dvxc/Pkjl9WQ1aIfzezFzI1dYzEWPUlXGVQafBYgAAGxwlVq+GSAuw4ldaCm4I/IVEmdaZpraZIkkcLKuYMFOmf6ZbbvdCHDpEYwKaKHb/6G6E/3dwmS5WRiFiZxcsORPm7SOZriXwjoOOvVlEbDzqDA+hU/OaulMkaGxfijFW4e42ROTWG8h0ySGgjqTyzO4ufiQEfACJZeBcugPTrdMFA1kuLoVsogneOxhqYhX3heiLY+YZy/Es1IHAb+t27B9NDSSoPh30KjIRMQsT/LSYh4TxmMvdkb2XGyqbP7n1OCva4WWFkSi/V19n8iTUtoYNubkHIPdq2WU86vFDVMlVXbVesVyjGK9MstybbQhJnBWfpWpaMUk5wn5UA+8TWb/pf3j0hiZMjEczI2DYchKVInN9y3Ufzf3izgz38DMqIgy2n8TrlnBJ5TTzcE+rYKT7PgkZWrfKuRRPvT6qR90IKCfBVYr6qpU/h1LhZ9Ak2NfmfXdj4knry9IDTprXmnFsvIsW75xgx+wLvWQjXu6gOgPMAIP58LmNJxnn3Od8trdI/8h78vbgFWj5M20161v03guPKgMp9F76lqWu8oS0KUc7SLSRTmsFvPnW7/LXlyEDedf1TrTGZJPbxeITR4jms8uvM6FhiDgAzT8YZAAA" },
      { v: "premium",  t: "Premium",  imgSquare: true, img: "data:image/webp;base64,UklGRrgEAABXRUJQVlA4IKwEAACwGwCdASqAAIAAPp1EnUqlo6YpqpJLiTATiWM/MhgVoKs7qsh67egIu6o6CLOvNhzLC7oFAhp4dVwGnimSNJJtEtc7tp1f+XX4aJtOtEc++kOv9oSf3Bdko6cBEy+dYeAxNqvvlceE3BEcq0hoeYIrIe2Hsd22qW7tuq7HSTG75CB52B2zP8ViMXZ1ZFVGN1IAwjfup+8Dq9u/eLf+8qt5dDpcRuIQAexnSxQkXlHEhXuj2Xbt0zECPPXYQtV3wnBNO/hPXGH1qwr8OO1pwX1ZsoRh6f+WGVo17gPJsVUorxC/lho4AAD+3yEBgvVMYEIzHPwsIKUbont5pztGkZ/opWrd9O4v4acOzwxZBcKGlcDHf68ak+d4ojxhp1a6qS68ORlk0KibgkZSrLDrrY4BJRnEudzWUr4gGc/LE+e/+knPj7CYJ3aTzHz+QNI989nKaiEaQ8+vaf5lqIBNq8EfUvhvdS99GzpBJ/NFWX428ZezdUyTqzOVO0y6v1ZtxNfjCNJEeuISmA3Y5ZZ3Q+sxeq+njVIyI84Un64eXYfu3UhVWNqEN5A1yTWNdAvoARC7/loihPkrB77E0WaFeb47HLqog0LW7dVTmvOtQ1XnaV6eYfK6CQdp6x6CUXL1M7TNoyDsQ8ZvXG8GKIt2gHuHau/WNCnC5rq8KLL8TPJOtfUncGfknUCXdp/vNuvTjHrn7CYl4jAN94J+OgvqTPEMYzYNuPqG6BC6zjqCcgXwHT88/A+CosH6s+R62Wt4h84CB/qrgIcUcJgTWNC7V5R4Xtt4XAaba0oB56nIymL83BC7tzQbE7gsscpqHoj9G4gIH2DsmBCr9rTPN87jPD+egEOHjj/tJNfNnj31sypU3G7ff+HS2gFYgDLTMIgZDmigstsS8d7LnW8aa71RMIyP9xhcO706OLpbALvwQ+E8cjkeFg0orsq12v1ExOz3bQ0486mB2hFsChaq+Hj88PDZuJFJ4AAdERFcK5vi7+yhWJfYU37GgJTI/KZNS0qoOT3JY2MB+aAg7+ysGkMu3XbF/VHpu3YDRQ4m/zS5JPZ8Gg3fvYJdRbvrxtuwjY0cZo1t6LwEGQ9on6iw+Ast9NwtT73KTobLdEREHkINl+yv6/sGdEAjyJsKOpYMlFMY7sKN4zI+jAwspcUsW52kuBCsXDhpbw32Gx2EXgp5LNEQN1VYJ2fhsof32iwiBUrWCFWKi07B0AlW7pc8FX+P4M6Bc4bbZRLmZ46BvfPhay/IMTO2h2e9frIYHAl/dYVyugcaEyctdNWs3D4KJT174U2IHnKakiYW/OG4Dj3f+63Eznm1koCMiPVHiWR96jwjG9bL6YTghK3cbIyUKfILzIdfSrEO/Z5Li2eMuh62fobSjOFWQSen8cwvj0JxePZYIKGNs6oNprhuMB8APcEhIiBLkq/GwvUIRvlRnWCA6a9Ni8VcecVijFL+eDbxYCPYnYOCo7vfzEy3DO5CxmqxL2LxxARViowlmrWR/gyrR+Rdl8zgHTBMdGVk8mvqHLEqgzBFaI0qvbtTcHQwAcBBTiVIWWN6WQDb1ciRYE3L2kiODpLdA0uf6h6BfAAAAA==" } ] }
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

    /* -----------------------------------------------------------------------
       LIFETIME SAVINGS
       Every figure below is an assumption, and `inflation` dominates all of
       them. At 0% a financed system is roughly $18,000 behind over 25 years;
       at 3% it is marginally ahead. Pick a rate the business will defend in
       writing, state it on screen, and do not quietly raise it to make the
       number look better. Inflated escalation is the specific thing the FTC
       has pursued solar companies over.
    ----------------------------------------------------------------------- */
    savings: {
      // The fitted sizing curve goes straight from bill to kW, so it never
      // needs these. The savings maths does: one converts a dollar bill into
      // kWh, the other converts a system size into production.
      // $/kWh, Virginia residential all-in. EIA Electric Power Monthly put the
      // state average at 15.96c in Feb 2026, up from 14.22c a year earlier,
      // driven by the Dominion rate case and data-centre demand. Worth
      // rechecking against EIA once or twice a year: a stale low rate
      // understates the saving, because their bill buys less offset.
      rate: 0.1596,
      yieldPerKw: 1250,      // kWh produced per kW per year in Virginia

      connectionFee: 10,     // what the utility still charges each month
      degradation: 0.005,    // panel output lost per year

      /* Two-stage escalation rather than one flat rate.

         Virginia is not in a normal rate environment. The state average went
         from 14.22c to 15.96c per kWh between Feb 2025 and Feb 2026, the SCC
         approved a Dominion increase of $11.24 a month for 2026 with a
         further $2.36 for 2027, and PJM attributes almost all of its load
         growth forecast to data centres. So the near term is steep and the
         long term is anybody's guess.

         A flat high rate compounds into fantasy: 12% for 25 years produces a
         $245,000 "saving". A flat low rate ignores increases already
         approved. The taper reflects what is known for the first few years
         and reverts to a long-run average after.

         NOTHING PUBLISHED FORECASTS THESE RATES. They are our assumption,
         informed by the sources above. Any customer-facing wording must say
         so rather than implying a forecast exists.

         THREE YEARS, not five. The SCC has approved increases covering 2026
         and 2027. Three years spans both plus one year of buffer, so the
         near-term assumption never extends further than the period a
         regulator has actually ruled on. Five years would have been two
         years of pure guesswork dressed as a rate case. */
      inflationNear: 0.08,
      nearYears: 3,
      inflation: 0.03,       // long-run assumption after that

      years: 25,             // efficient life of the system

      /* Virginia SRECs. One certificate per MWh generated, sold through an
         aggregator. Cenvar uses RECmint, and a residential system falls in
         their "VA Distributed" category (1 MW or less).

         RECmint VA Distributed, as of October 2026:
           3 year locked  2026-2028   $34.00 per REC
           5 year locked  2026-2030   $38.00 per REC
           15 year upfront 2026-2040  $185.00 per kWdc
           Market "mint and sell"     variable

         WE MODEL THE 5 YEAR LOCKED RATE, THEN SPOT. Contracted where it is
         contracted, market price where it is not. $28.50 after year 5 is
         Flett Exchange's September 2026 listing for the same certificate.

         Two things worth knowing. The 5 year rate sitting ABOVE the 3 year
         is the market pricing in a rise: HB 628 raised Virginia demand 4.5x
         against supply covering less than half of it, and Flett projects $65
         to $70 near term. We do not model that. It is upside nobody was
         promised.

         And the 15 year upfront works out at roughly $10 per REC once you
         divide it by the certificates it covers, against $38 on the 5 year
         locked. It buys cash today at a heavy discount. Not modelled, but
         worth a rep knowing before they offer it as the simple option.

         OWNERSHIP MATTERS. SRECs belong to whoever owns the system. On a
         lease the lessor keeps them, so lease income is zero. That is about
         $8,800 of difference on a typical job and it belongs on screen. */
      srec: {
        enabled: true,
        lockedPrice: 38.00,    // RECmint VA Distributed, 5 year locked
        lockedYears: 5,
        spotPrice: 28.50,      // Flett Exchange spot, used after the lock ends
        source: "RECmint VA Distributed 5 year locked rate, then market"
      },

      /* =====================================================================
         THE THREE WAYS TO PAY
         ---------------------------------------------------------------------
         Cash and loan are both ownership: the customer owns the system, keeps
         any asset value, and the 25 year saving is theirs net of what they
         paid. Lease is not: they never own it, so there is no asset at the
         end and nothing to transfer if they sell the house. That difference
         is on screen, because it is the thing a savings figure hides.

         LEASE PRICING IS A PLACEHOLDER. $17.50 per kW per month is a
         plausible market figure, not a Cenvar one. The rate decides the whole
         answer: at $12.50 a typical customer nets $33,010 over 25 years, at
         $22.50 they net minus $1,455. Nothing lease-related should be shown
         to a customer until Kyle supplies the real terms.
         ===================================================================== */
      ways: {
        cash: { label: "Pay cash", enabled: true },
        loan: { label: "Monthly payment", enabled: true },
        lease: {
          label: "Lease", enabled: true,
          /* FIXED monthly payment, confirmed with Kyle. The $0.115 per kWh is
             the basis used to set it at signing: expected first-year output
             multiplied by the rate, divided over twelve months. After that
             the payment is fixed and rises 1% a year regardless of what the
             panels actually produce.

             That distinction matters to the customer. Under a PPA the
             payment would fall as the panels age; under a fixed lease it
             does not, so the effective cost per unit climbs from 11.5c in
             year one to about 16.5c by year 25. It is still far below where
             grid power is heading, but "11.5c" is a year one figure and
             should not be presented as a rate they keep. */
          perKwh: 0.115,
          fixedPayment: true,
          escalator: 0.01,     // the rate rises this much each year
          termYears: 25,
          buyoutAfterYears: 5,

          /* Buyout priced as the present value of the payments that would
             still be owed:  FMV = sum of P(t) / (1+r)^t  for t = 1..N

             On the fixed payment structure this lands near 54% of the
             original system price at an 8% discount rate, which sits inside
             the range a residual-value basis would give. Sensible.

             Buying out is strongly worth it, because owning the system also
             unlocks the solar certificates the lessor had been keeping. */
          discountRate: 0.08,   // investor's expected return, typically 6-10%
          note: "You lease the system rather than owning it. Nothing to pay up " +
                "front, and we maintain it for the life of the lease. You can " +
                "buy it outright after year 5."
        }
      },

      /* The two options a customer can switch between. Deliberately bounded:
         both sit at or below what the documented rate increases support, so
         neither can produce a number the business cannot defend. A free text
         box here would let someone generate a $245,000 "saving" at 12% and
         screenshot it, and that claim would still be ours. */
      scenarios: [
        { id: "cons", label: "Conservative",
          near: 0.03, nearYears: 0, long: 0.03,
          note: "Power prices rise 3% a year throughout, ignoring the increases " +
                "already approved for 2026 and 2027." },
        { id: "ours", label: "Our estimate",
          near: 0.08, nearYears: 3, long: 0.03,
          note: "Power prices rise 8% a year for 3 years while approved increases " +
                "work through, then 3% a year." }
      ]
    },

    /* Direct-size path, for customers who already know what they want. */
    kwRange: { min: 4, max: 30, start: 10, step: 1 },
    wattsPerPanel: 450
  };

  /* Works out what the quoted system does to their bill. Uses the offset the
     model actually produces, not an assumed 100%: the fitted curve averages
     about 75% offset, so assuming full coverage would overstate every figure
     by a third. Capped at 1, because exported surplus is credited by the
     utility on its own terms and should not be counted as a saving. */
  // Compound factor at year y: the near-term rate for the first `nearYears`,
  // the long-run rate after. Falls back to a single flat rate if nearYears
  // is zero, so the model still works with the taper switched off.
  function escalator(y) {
    const S = SOLAR.savings;
    const n = Math.min(y, S.nearYears || 0);
    return Math.pow(1 + (S.inflationNear != null ? S.inflationNear : S.inflation), n) *
           Math.pow(1 + S.inflation, Math.max(0, y - n));
  }

  /* Works out the 25 year position for each way of paying. The gross bill
     saving is identical in all three: same system, same production. What
     differs is what the customer pays out against it. */
  function solarWays(bill, kw, cashPrice, loanPay, scenario) {
    const S = SOLAR.savings, W = S.ways || {};
    const keep = { n: S.inflationNear, y: S.nearYears, l: S.inflation };
    if (scenario) {
      S.inflationNear = scenario.near; S.nearYears = scenario.nearYears;
      S.inflation = scenario.long;
    }
    const usageYr = (bill / S.rate) * 12;
    const offset  = Math.min((kw * S.yieldPerKw) / usageYr, 1);
    const lease   = W.lease || {};
    /* The payment is set once from expected first-year output, then fixed
       and escalated. It does NOT follow production, which is what separates
       a lease from a PPA. Degradation is deliberately absent here. */
    const leaseBaseYear = (lease.perKwh || 0) * kw * S.yieldPerKw;
    const leaseCostIn = (y) => lease.fixedPayment === false
      ? leaseBaseYear * Math.pow(1 - S.degradation, y) *
        Math.pow(1 + (lease.escalator || 0), y)
      : leaseBaseYear * Math.pow(1 + (lease.escalator || 0), y);
    const leasePay = leaseCostIn(0) / 12;        // year one, monthly

    // Present value of the payments still owed at the buyout point.
    const buyoutFMV = (function () {
      const after = lease.buyoutAfterYears || 0;
      const term  = lease.termYears || S.years;
      const r     = lease.discountRate;
      if (!after || !r || !leasePay) return null;
      let pv = 0;
      for (let i = 1; i <= term - after; i++) {
        pv += leaseCostIn(after + i - 1) / Math.pow(1 + r, i);
      }
      return pv;
    })();

    const srec = S.srec || {};
    const srecOn = !!(srec.enabled && (srec.lockedPrice || srec.spotPrice));
    const srecPriceAt = (y) => (y < (srec.lockedYears || 0))
      ? (srec.lockedPrice || srec.spotPrice || 0)
      : (srec.spotPrice || 0);

    let gross = 0, cashCum = 0, cashPayback = null, srecTotal = 0, srecYear1 = 0;
    let loanNet = 0, leaseNet = 0, leaseFirstPositive = null;
    for (let y = 0; y < S.years; y++) {
      const yr = bill * 12 * escalator(y) * offset * Math.pow(1 - S.degradation, y)
                 - S.connectionFee * 12;
      // One SREC per MWh generated, on everything the panels make, not just
      // the share that offsets their own usage.
      const mwh = (kw * S.yieldPerKw * Math.pow(1 - S.degradation, y)) / 1000;
      const sr = srecOn ? mwh * srecPriceAt(y) : 0;
      if (y === 0) srecYear1 = sr;
      srecTotal += sr;

      gross += yr;
      // SRECs count toward payback, because the owner receives them.
      cashCum += yr + sr;
      if (cashPayback === null && cashCum >= cashPrice) cashPayback = y + 1;
      loanNet += yr + sr - (y < 20 ? loanPay * 12 : 0);
      const lp = leaseCostIn(y);
      leaseNet += yr - lp;        // no SRECs: the lessor owns the system
      if (leaseFirstPositive === null && yr - lp > 0) leaseFirstPositive = y + 1;
    }
    S.inflationNear = keep.n; S.nearYears = keep.y; S.inflation = keep.l;

    return {
      offset: offset, usageYr: usageYr, prodYr: kw * S.yieldPerKw, kw: kw,
      grossSaving: gross, years: S.years,
      srecOn: srecOn, srecTotal: srecTotal, srecYear1: srecYear1,
      srecLocked: srec.lockedPrice, srecLockedYears: srec.lockedYears,
      srecSpot: srec.spotPrice,
      cash:  { upfront: cashPrice, monthly: 0, net: gross + srecTotal - cashPrice,
               payback: cashPayback, owns: true, srec: srecTotal },
      loan:  { upfront: 0, monthly: loanPay, net: loanNet, owns: true, srec: srecTotal },
      lease: { upfront: 0, monthly: leasePay, net: leaseNet, owns: false, srec: 0,
               buyoutFMV: buyoutFMV, discountRate: lease.discountRate,
               perKwh: lease.perKwh, gridRate: S.rate,
               escalator: lease.escalator, buyout: lease.buyoutAfterYears,
               firstPositive: leaseFirstPositive, note: lease.note }
    };
  }

  function solarSavings(bill, kw, monthlyPay, scenario) {
    const S = SOLAR.savings;
    // A scenario temporarily overrides the escalation figures, so the customer
    // can switch between bounded options without the defaults changing.
    const keep = { n: S.inflationNear, y: S.nearYears, l: S.inflation };
    if (scenario) {
      S.inflationNear = scenario.near; S.nearYears = scenario.nearYears;
      S.inflation = scenario.long;
    }
    const restore = () => {
      S.inflationNear = keep.n; S.nearYears = keep.y; S.inflation = keep.l;
    };
    const usageYr = (bill / S.rate) * 12;
    const prodYr  = kw * S.yieldPerKw;
    const offset  = Math.min(prodYr / usageYr, 1);

    const saveNow = bill * offset - S.connectionFee;
    let total = 0, cumulative = 0, payback = null;
    for (let y = 0; y < S.years; y++) {
      const billYr  = bill * 12 * escalator(y);
      const offsetY = offset * Math.pow(1 - S.degradation, y);
      const saveYr  = billYr * offsetY - S.connectionFee * 12;
      total += saveYr;
      cumulative += saveYr;
      if (payback === null && monthlyPay && cumulative >= monthlyPay * 12 * (y + 1)) payback = y + 1;
    }
    restore();
    if (!isFinite(total) || !isFinite(saveNow)) return null;
    return {
      offset: offset,
      monthly: saveNow,
      lifetime: total,
      years: S.years,
      inflation: S.inflation,
      kw: kw,
      usageYr: usageYr,
      prodYr: prodYr,
      basis: (S.nearYears && S.inflationNear != null)
        ? "Assumes Virginia power prices keep rising at about " +
          (S.inflationNear * 100).toFixed(0) + "% a year for " + S.nearYears +
          " years, as approved rate increases work through, then settle to about " +
          (S.inflation * 100).toFixed(0) + "% a year."
        : "Assumes grid power rises about " + (S.inflation * 100).toFixed(1) + "% a year.",
      net: monthlyPay ? total - monthlyPay * 240 : null
    };
  }

  const SERVICES = {
    roofing: {
      label: "Roofing",
      // The satellite view is the hook here, so the address screen says so.
      addressHead: "Let's find your roof from space!",
      addressSub: "This confirms we service your area.", hubNote: "Shingle, corrugated, or standing seam",
      intro: "Get your roof price in about a minute",
      // The ratings already appear in the stat tiles directly above this line,
      // so the credential stands on its own here.
      trustLine: "Owens Corning Platinum Preferred",

      // Leads with the monthly, like solar. Every roofing quote clears the
      // $3,000 financing minimum, so there is always a payment to show, and
      // $16,750 is a number that benefits from being framed as $179 a month.
      priceDisplay: "monthly",
      priceLabel: "Total price",

      priceCaveat: "This is what a job like yours typically costs.",
      priceCaveatSub: "A free onsite measurement gives you the exact number, " +
        "with no pressure to book.",
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
        { id: "material", heading: "What material roof would you like a price on?", cols: 1, options: [
          { v: "shingle", imgSquare: true,   t: "Asphalt shingles",
            img: "data:image/webp;base64,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" },
          { v: "corrugated", imgSquare: true, t: "Corrugated metal",
            img: "data:image/webp;base64,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" },
          { v: "standing", imgSquare: true,  t: "Standing seam metal",
            img: "data:image/webp;base64,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" },
          { v: "unsure",    t: "Not sure yet", n: "We will price all three" } ] },
        { id: "size", heading: "How big is your home?", cols: 1, options: [
          { v: "s1015", t: "Up to 1,500 sq ft" },
          { v: "s1520", t: "1,500 to 2,000 sq ft" },
          { v: "s2030", t: "2,000 to 3,000 sq ft" },
          { v: "s3040", t: "3,000 sq ft and up" } ] },
        // This note is what defines the boundary for the customer, and the
        // answer moves the price by roughly 18%. Keep both sides worded as a
        // pair so there is no gap between them.
        /* The wording alone leaves people guessing, and pitch moves the price
           by about 18 percent, so the diagrams are drawn to the real ratios:
           4/12 rises four inches over twelve across, the common walkable
           slope, and 12/12 is 45 degrees and needs staging. Inline SVG, under
           a kilobyte each, so there is nothing to host. */
        { id: "pitch", heading: "How steep is your roof?", cols: 1, options: [
          { v: "normal", t: "Not very steep", n: "You could walk up it without sliding",
            imgSquare: true, img: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjggMTI4Ij4KPHJlY3Qgd2lkdGg9IjEyOCIgaGVpZ2h0PSIxMjgiIGZpbGw9IiNGNEY2RjYiLz4KPHJlY3QgeD0iMjYuMCIgeT0iMTA0IiB3aWR0aD0iNzYiIGhlaWdodD0iMjYiIGZpbGw9IiNEM0RBRDkiLz4KPHBhdGggZD0iTTE4LjAgMTA0IEw2NC4wIDg4LjY2NjY2NjY2NjY2NjY3IEwxMTAuMCAxMDQgWiIgZmlsbD0iI0I0MjUyNSIvPgo8cGF0aCBkPSJNMTguMCAxMDQgTDExMC4wIDEwNCIgc3Ryb2tlPSIjOEE5NTk1IiBzdHJva2Utd2lkdGg9IjIiLz4KPHBhdGggZD0iTTEwOC4wIDEwNCBMMTA4LjAgOTAgTTEwOC4wIDEwNCBMOTQuMCAxMDQiCiAgICAgIHN0cm9rZT0iIzNBNDc0NyIgc3Ryb2tlLXdpZHRoPSIxLjYiIGZpbGw9Im5vbmUiIG9wYWNpdHk9Ii41NSIvPgo8dGV4dCB4PSI2NC4wIiB5PSIxNDYiIGZvbnQtZmFtaWx5PSJIZWx2ZXRpY2EsQXJpYWwiIGZvbnQtc2l6ZT0iMTUiCiAgICAgIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiMzQTQ3NDciIHRleHQtYW5jaG9yPSJtaWRkbGUiPjQvMTI8L3RleHQ+Cjwvc3ZnPg==" },
          { v: "steep",  t: "Very steep",     n: "Too steep to walk on safely",
            imgSquare: true, img: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjggMTI4Ij4KPHJlY3Qgd2lkdGg9IjEyOCIgaGVpZ2h0PSIxMjgiIGZpbGw9IiNGNEY2RjYiLz4KPHJlY3QgeD0iMjYuMCIgeT0iMTA0IiB3aWR0aD0iNzYiIGhlaWdodD0iMjYiIGZpbGw9IiNEM0RBRDkiLz4KPHBhdGggZD0iTTE4LjAgMTA0IEw2NC4wIDU4LjAgTDExMC4wIDEwNCBaIiBmaWxsPSIjQjQyNTI1Ii8+CjxwYXRoIGQ9Ik0xOC4wIDEwNCBMMTEwLjAgMTA0IiBzdHJva2U9IiM4QTk1OTUiIHN0cm9rZS13aWR0aD0iMiIvPgo8cGF0aCBkPSJNMTA4LjAgMTA0IEwxMDguMCA5MCBNMTA4LjAgMTA0IEw5NC4wIDEwNCIKICAgICAgc3Ryb2tlPSIjM0E0NzQ3IiBzdHJva2Utd2lkdGg9IjEuNiIgZmlsbD0ibm9uZSIgb3BhY2l0eT0iLjU1Ii8+Cjx0ZXh0IHg9IjY0LjAiIHk9IjE0NiIgZm9udC1mYW1pbHk9IkhlbHZldGljYSxBcmlhbCIgZm9udC1zaXplPSIxNSIKICAgICAgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzNBNDc0NyIgdGV4dC1hbmNob3I9Im1pZGRsZSI+MTIvMTI8L3RleHQ+Cjwvc3ZnPg==" } ] }
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
      label: "Windows",
      // Leads with the monthly payment. Quotes below the lender's minimum
      // fall back to the total automatically.
      priceDisplay: "monthly",
      priceLabel: "Total price", hubNote: "Priced per window, 1 to 50",
      intro: "Get your window price in about a minute",
      // "street" uses Street View and falls back to satellite where Google
      // has no imagery. "satellite" always uses the overhead view.
      view: "street",   // the front elevation is where the windows are
      // Inlined as a CSS mask, so the icon takes the colour of the text
      // beside it rather than being locked to white. ~4KB, no hosting needed.
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAQAAAD2e2DtAAAN1klEQVR42u2deZAcZRmHn+ntDL2bbC6SuOGwDIEAgUKCRbgTjJoCtSAi4TBBS7AAlRCjHF4UMaGkKC3BKoJHGcBSywvBoxAQqRCsSBLAREQxmAAKkkhCgCUks7M9/frHdiYzs7Oz05mrZ+b39F/ZbPf0971Pv9/bX387nTBEO+OoCySAkABCAggJICSAkABCAggJICSAkABCAggJICSAkABCAggJICSAkABCAggJICSAkABCAggJICSAkABCAggJICSAkACiGXCrerQOjmc+7+doutS1VSbFZlbxC9bRX83DJqr4BRGzuZ1jFaka8xJX8xssbgIkWclCII2Do4GlJgQEBCSBR5jHrjgJ0MmTTGc3nkJfBw3SeOxgGq/HpQh0+CPTSdGl8NelbPdIM4GnGBEXARZxKik8xaZuJEkxhVviMQR000uapKJS97sCj8lsa3wG+AQBgeLRgKEgYEnjM0CCf3AUgUb/BhSDDjvoIdNYAUbxlsLfIHxcJrG9sUPAOMBXLBokAPQ0ugZQ8ddYxsbhNlA0shSUAEICCAkgJICQAEICCAkgyseN4Tm16sOlWK6UctVRygD1vbbdYX9nLa8wmgPpINMCzxlcOsjwBq9zIKcNO3Xu1zsmbt2v7YA07pCfGxCwje+ylrcBSADN+2a7fWfvMYNPcVqJJ6cBaZL1z8huHa9+h4fZxiV4gE+AW6QzHBzO4zx6+T53sanSp90NxgCHKSzkM0wq0TM+kMQD7iXD/AgP2K0K51jRNtXM+qwc9pjZ5YZ12zx7NPxZn/VZZtBv9meP+IpdYwdbwmjSbZJdaZuzbe0f1NKM9WXb+qQtsPGGzQr7qrwenV3pOdZXgM9l9+uxK+zv2f8ZrEF+11xi45ss9KPtPFtdQvOM9WfD/LwtsUOzmp/dygIsytvXscNtub2W/f/iV8jenz5gH7KRTRD6Tnuf/SonlxXLcHsD/LZ9y6abk7f/3PYRYGAbYTPs9vAYmSE02JPtxrvtJEvGNPSuvdtWhOdfvCX92ZZkbKWdbAcUOUrbCTCweXaa/aTM6+ZN+4YdVXDdNHZL2FRbZtvLzGW/sjnWOeSx2lSAga17mJEzV4Pn7NM2OQYF4kS7zP5WopqxnGpmrV1sY4c5XjQBZrWWAHu79ErbVOJIuQXieltg4xoU+jF2/jC67uN5W2w9Zena1hkgv0C8MZtUh9Jgb1K93z5QIqlWf/Nstt03aFwvzuu2zI60jrKPrQyQs11Q0BmZogXiXg1W2kwbUePQj7AZtmKYkjU3+Zt9NeIn1FmAeD922T1ontAnnfes0MHDxScFXMo6drCUd9WkVQkO5Su8wl/4DElS+OFn50/mpgd9dqrmk80tvB6gI+9fabbgksQhXaCBG04vpxjNjbzAs3yWnso7J8tEruAZ/sNNTCBFmqBI6FM4JEnyQsFXNyRqPtncwgJYThdDwLuZxBK2kiSJQ6rgWaGLF16F07idrTzGfMZUeAajmcejvMp3mR5q55HM6zU/DL3HTm7gUI7k5fB8m2SRQjM9WE2znds4lKP5GjvDqzBfg4GrMCCNz+n8gjf4JXMKMkm5yfUUfsab3MfscOBJFgl9gItHim9yPD3cxMv4+/VpEiDC2Wb4J0vp4RR+DNkaICjQYO9Pz+cR1kT+Ng2Hn/NnLiQghR8OPPkp38fFw+Ee5jCOa/lrdb+9SwIMN+L1s5ZLGMVcHgxDUawycPDp5SSui/hJ85lPb4lCL4nLY5zLGOazqsaFXhsXgcPzNg9zNhP5FBvCFD1Yg1H4fDJiV12GT1dB6P1sofdPrqKH2fyW3mZfsNQaq+92sJL3MIUv879sgZgvQXfElnYXBD+Fg4vHTr7GERzDCv4Xu5zYxgIMdMWL3MwhzOAO0lX+wjoHj4A7mUkPS9ncSquWW239rc9GPssYZrOhSsvLAwK2MIdRXMYTzVnotZMAA6R4jFtxSFdFKYd7WMWeWLY0IQGGIhnTY6kGaJauyRsG4ooygJAAQgIICdCeqAhsc1QECgkgJICQAEICCAkgJICQAEICCAkgJICQAEICtDB6Gtjm6GmgkABCAggJICSAkABCAggJICSAkABCAggJICSAkABCAggJICRAi6EVQW2OVgQpA0gAIQE0BEgAIQFE3AVwKvz9KAkvEZNeirpvtDcONVkRGPXVKoXvDfRr+FnVOpYVBKXSNtcYt65X/3H04Jb51csOPifmKepwDNtxyrDewWdGlfR2gCOZXGZGMTy68/Y9lh46yrxSB7e59lVkhTlkKptJx/jr1AECHF7lIDIR9nmck/HreHnsX17yOJPVzZIBBkLhRzw7p2AICPZ73/qdd7KqbW6ZIWAgxSWb6Gyrc95OvPOjbgN1GyjaGdUAqgFUA7RzDVC/Lk2T5A6WR5oHuIybwpvMAIeAGRHmAa7hC1W5QfVxuZerIswDrGEyAU647w+4IdI8wEK+EeG8rXkECICn2RZpnyfIfWNXwN8j3MtvgCq9OBI2sTXCHm8xOWffZypqc4sVgV7E3++qQFevQeedKMgVlbZ5uE9rKgGCCn8/SsKLy3sDo+6bqWtEdBuoeQDRzGhNoJAA7YzWBAoJoBpAAmgIkABCAggJICSAkAC6C5AAQgLoNlACCAmgGkACaAiQAEICCAkgJICQAEIC6DZQAug2UAIICSAB1AUSQEgAobsAobsAoSFASAAhAYQEEBJASAAhAYQEEBJASAAhAYQEaBoS6qX2blpfFY+Vjm0r9Ti4KAcwkysIqvKqBpeAjzCbTmWAZqCDw1nKDtZxOk6VXhzpMI1H2cW3OSZ2bxLUeoCcrjiIL/Jv/sWNjCJV1ZcuBKRwuJpn2Moy3lXV+kJDQBUYz0Ws47/czMGkSRPg5bXMZ09EIXrzXvXk4BGQJs0EbuAFnuaTTNQQEAc6mcsDvMZPORGfNAFJkgXB34XLnRGvlZW47C6QIEky1OBY7uRVVnMOIzUENKq5I3gPK+nlIc7CJ4WPOyj0KQJcRrOWmyN+0j3cw2hcAlJFNUjhM4vfsIufcHID3wvWZkNAEJ7zYSxnG09yKW4Yei+vPAtIhz91eJizOJ3+yJ90AadzLw4ebphb8ocEF58U8DEe5zVu4YhsXzZVnzbTyfqM4B1cxbNs4auMJ41PUCT0aRySuKzjIsYzl4f26z08xho+Sjfn8EiYW9IFGrh4YZ4ZxXU8x2YWcxBOZNkaittEojo8xVHZiRl3UOL18fFIAv/mVn7J1iq8OGoXv+N3TOBcrmNazmc7OT3ohm8HncJt3MbTHFLHCyvR2gLkV+5JjsInGDL0Li67uIMfsqnK797awUruYgoLWMQEAFK4OX3nhC+39HE4rtqjdDsPAZ2DhCgs9IJsDQB3cQoHcj3/qMmr1wK2sIzJzGAFKbwhCsTB70X1atpDLVsEOhzGl7i9YDrXGVToDZRjD3IWI7mUtTWftffZyFWM5cwSBWJuzgq4lq8znY7YXmRW2TbVzPqsHPaY2aKyjjnBLrdnSxwpY33Zz3zSFth4oyHbGDvfVofn0Wd9lilxzi/aEjvIEmUcdW7YV+X16KxKWxEvAbptnj1askv7s53zil1vB5fVpbXd3mGL7cVsG4ud8z5d19sCG1tVAWa3igAH2Gn2o2yQS4f+TbvFpltHw0O/b3PsCFtm27Mt7S+Zte6zOdYpAfZuI2yGrQiPkRmi8/ZkhbjbZloyRqHPb8nx9p3wTHPPuVhLMrbSTirakjYSwLHDbbm9VuZ1c7990EbGNPS5W6d9wO4rcxh7y75pR5vTPgIszu7XY5/OFnrFRs7c0G+whTauCUKfXyBeYOtLaJDJ0WCzfc4OyVYzZ7eyAJcbNsbOG6Z2zmSP+LJda1NiUOjt35awd9oSez7b1tIZbq1daGMNO6O+AiQqnEk4jC2ky3oaFuCwim1cHN5PB3kTqoW8wfe4m+equqyjUTMaU/k4V4YziMV7xoewD39OwMUEZc3PpPCYxZ8qnEuuUIBpbCpTgNwJHHfIKegAuJ9v8zi7s3Pd1rTB33f2nZzEYj5cYpmaj18wy1mOAO/nkcYIMJITmct0jg4fkZQb/GDYpw8B63mZMYyng0zeVGtz4tJBhp28ySHMHDbAfsTnMy+xkaf4AxvZUz8BRnItNyLi9ah8KbeGWbPGApzKqnBplBNu1X/sErRkkGrVVwEBHrCbM3mi1gKcy68J8Bu4CEoUJ42Lw1k8VEsBTmUNuwtW3Iq4EJCiixPYUCsBOumNXKmK+irg4zM+yp/FRQnm53FrMo6J6lUZAV0sqk0G6GSHkn8T5ADYxcTyF8aUH9BT6WqBu/LWzwE+ozmhFkPAOejrJJqFubUQ4AQJ0CQ5AGbWQoBO9W3TCDCpFgK8ob5tGnprIcBGaNEp2ta7D3iqFgI8IAGaRoDf12YeYKdmAZtCgBQHkqp+BtjDLTgx/r4sAZDG4abywx/tWUAXb5FWFoj11e8DY6IIECWYu5mFV+WvXxLVTf5JzogS/qhTO2tYSBeBBoJYJn/o4qOsj7Zb9BVBs1idHW30bDAO130Q/g21zxmsjbp79AA+xmiWkyZZclm3qBcOLkl2sZxx0cO//6uCu3kv8ziRaVoc1lB8NvMEP2M1b+/fARKmTmzzBCIkgJAAQgIICSAkgJAAQgIICSAkgJAAQgIICSAkgJAAQgIICSAkgJAAQgIICSAkgJAAQgIICSAkgJAAQgIICSAkgJAAQgKIuPN/ZB9Q6CuE6O0AAAAASUVORK5CYII=",
      // TODO: upload windows-banner.jpg and windows-tile.jpg to Webflow assets,
      // then paste the two asset URLs here.
      image: "https://cdn.prod.website-files.com/64244447fb8d73d5af3e8ce8/6a96f1e535a8959f8bd46c8c_Funnel%20Pics-4.jpg", hubImage: "https://cdn.prod.website-files.com/64244447fb8d73d5af3e8ce8/6a96f1e7e0cbe7cbea5b5d98_Funnel%20Pics%20No%20Watermark-4.jpg", imageAlt: "Black-framed windows on a modern home",
      /* The address sits AFTER the first question for this service. Asking
         where someone lives before asking anything about the job is the
         highest-friction opening available, and the count is the question
         everyone can answer without thinking. */
      addressAfter: 1,
      questions: [
        /* Quick picks removed deliberately. 18.6% of leads were reporting
           exactly 12 windows against a default of 8, which points at the
           buttons anchoring the number rather than the housing stock. */
        { id: "count", type: "stepper", heading: "How many windows do you need replaced?",
          min: 1, max: 50, start: 8 },
        // Option titles are deliberately unchanged. They are written verbatim
        // into the HubSpot "Estimator: Details" property, so altering them
        // would split reporting against every record collected so far.
        { id: "material", heading: "Which frame material would you like?", cols: 1,
          caption: "The material we would install - not what you have now.",
          options: [
          { v: "vinyl",    t: "Vinyl",           n: "Best value",
            img: "data:image/webp;base64,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" },
          { v: "woodclad", t: "Wood-clad vinyl", n: "Premium look",
            img: "data:image/webp;base64,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" },
          { v: "unsure",   t: "Not sure yet",    n: "We will price vinyl", sub: true } ] }
        /* The frame-condition question was removed. It moved the price by
           about 8% while material moves it 67%, so it cost a full screen for
           almost no pricing effect. Fitted against 199 live leads, defaulting
           everyone to "wear" puts 72% within $500 of the number they would
           have seen and 97% within $1,000, against a range already $5k wide.
           See DEFAULT_CONDITION in price() below. */
      ],
      price(a) {
        const i = a.count - 1;
        /* No longer asked. "wear" is the middle tier and was what 48% of
           customers picked when the question existed. */
        const DEFAULT_CONDITION = "wear";
        const cond = a.condition || DEFAULT_CONDITION;
        const label = { vinyl: "Vinyl", woodclad: "Wood-clad vinyl" };
        if (a.material === "unsure") {
          const rows = ["vinyl", "woodclad"].map((m) => {
            const b = PRICES.windows[m + "|" + cond][i];
            return { label: label[m], low: b[0], high: b[1] };
          });
          // Headline the vinyl figure rather than spanning both products.
          // Spanning gave a 3.15x range (a typical 12-window job read
          // $7,800-$24,600) and a $84-$264/mo payment, which reads as
          // "we have no idea". Vinyl is the value product and the one most
          // customers land on, so it is the honest default for someone who
          // has not chosen yet. The wood-clad row stays in the breakdown as
          // the upgrade path, so nothing is hidden - picking it later is an
          // upsell from a known number, not a correction to a bad one.
          const v = rows[0];
          return {
            low: v.low, high: v.high, breakdown: rows,
            note: "Priced on standard vinyl. Wood-clad is shown above if you would like to upgrade."
          };
        }
        const b = PRICES.windows[a.material + "|" + cond][i];
        return { low: b[0], high: b[1] };
      }
    },

    doors: {
      label: "Doors",
      // Leads with the monthly payment. Quotes below the lender's minimum
      // fall back to the total automatically.
      priceDisplay: "monthly",
      priceLabel: "Total price", hubNote: "Entry, double, and patio doors",
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
              { v: "single",  t: "Single door",        imgSquare: true, img: "data:image/webp;base64,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" },
              { v: "double",  t: "Double door",        imgSquare: true, img: "data:image/webp;base64,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" },
              { v: "sliding", t: "Sliding patio door", imgSquare: true, img: "data:image/webp;base64,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" } ]
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
      // Lead with the monthly payment rather than the total. On a $30,000
      // purchase the monthly is the number people decide on, and the total
      // sits in the detail below rather than being the headline.
      priceDisplay: "monthly",
      intro: "Get your solar price in about a minute",
      view: "satellite",
      // Inlined as a CSS mask, so the icon takes the colour of the text
      // beside it rather than being locked to white.
      icon: "data:image/png;base64,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",
      image: "https://cdn.prod.website-files.com/64244447fb8d73d5af3e8ce8/6ab29ceffa74ab79fe9f411b_solar-banner.jpg", hubImage: "https://cdn.prod.website-files.com/64244447fb8d73d5af3e8ce8/6ab29cefc4cdf77f66d3a337_solar-tile.jpg", imageAlt: "A Cenvar solar installation",

      // Payment is tied to milestones rather than to satisfaction. Nothing is
      // due until the panels are physically up, and the invoice follows the
      // jurisdictional inspections rather than a judgement call.
      // Solar has its own tracking number: the lander lives on cenvarsolar.com
      // and the spend comes from a different ad account.
      phone:     "(434) 204-9741",
      phoneHref: "tel:4342049741",

      reassurance: "$0 down. Nothing is due until your panels are installed. Invoice " +
        "due upon the passed inspection.",
      // Suppressed: the sizing note directly above already tells them the
      // exact number comes from the on-site assessment.
      priceCaveat: "",

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

        q.push({ id: "mount", heading: "Where would the panels go?", cols: 1,
          caption: "Ground mounted systems usually cost more. They need footings, " +
                   "electrical trenching back to the house, and often their own " +
                   "permitting, any of which can add to the final price.",
          options: [
          { v: "roof",   t: "On my roof" },
          { v: "ground", t: "On the ground",
            n: "You have open land to use. Expect a higher cost once trenching " +
               "and permitting are worked out on site." },
          { v: "unsure", t: "Not sure yet", n: "We will price a roof system",
            sub: true } ] });
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
        /* Battery is the biggest price driver in this funnel: 15 kWh runs about
           1.50x a no-battery system and 30 kWh about 2.05x, fitted on live
           quotes. 62% of customers were adding one, and quotes above $70k went
           cold far more often than any other band. Setting the magnitude in
           multiples before the number lands is what stops the sticker shock,
           and saying a battery can be added later keeps the door open rather
           than forcing the decision now. */
        /* Battery used to be a priced choice here. It is now an interest flag.
           Pricing it inline forced a decision worth $17,500 to $30,000 before
           anyone had spoken to a rep, and it roughly doubled the number on the
           screen. Asking instead keeps the quote clean and still tells the rep
           who wants the conversation. */
        q.push({ id: "addons", type: "check",
          heading: "Tick it and ask a Cenvar Solar representative to learn more!",
          // The heading now carries the instruction, so the caption only has
          // to answer the question it raises: does ticking cost me anything.
          caption: "Optional, and it will not change your price.",
          label: "Tell me about battery storage or EV charging",
          note: "Backup power for outages, or a home charger for an electric vehicle" });
        return q;
      },

      waysFor(a, cashPrice, loanPay, scenario) {
        const bill = a.bill === "known" ? null : SOLAR.bill[a.bill];
        if (!bill) return null;
        const mount = a.mount === "ground" ? "ground" : "roof";
        return solarWays(bill, this.sizeFor(a, mount), cashPrice, loanPay, scenario);
      },

      savingsFor(a, monthlyPay, scenario) {
        const bill = a.bill === "known" ? null : SOLAR.bill[a.bill];
        if (!bill) return null;                 // direct-size path has no bill to compare
        const mount = a.mount === "ground" ? "ground" : "roof";
        return solarSavings(bill, this.sizeFor(a, mount), monthlyPay, scenario);
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
        if (!a.bill || !a.mount) return null;
        if (a.bill === "known" && !a.kw) return null;
        const adder = 0;   // battery is an interest flag now, not a priced option

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

        /* An old roof is a reason to bundle, not a reason to walk. Kept vague
           on the discount so the rep owns that conversation. */
        const bundle = a.roofAge === "o20"
          ? "Your roof is over 20 years old, and that is good news to know now. " +
            "It is worth replacing before panels go on, and we offer bundle " +
            "pricing when you do both. Ask your representative what that looks " +
            "like for your home."
          : "";

        if (a.mount === "unsure") {
          const rows = [line("roof"), line("ground")];
          /* Headline the roof figure rather than spanning both mounts. Spanning
             took the roof floor and the ground ceiling, giving a $15,000 median
             spread against $7,800 for people who picked roof. 22 of the 25
             customers who did know chose roof, so roof is the honest default.
             The ground row stays in the breakdown as the alternative. */
          const r = rows[0];
          return {
            low: r.low, high: r.high,
            breakdown: rows.map((x) => ({ label: x.label, low: x.low, high: x.high })),
            note: note, bundle: bundle
          };
        }
        const r = line(a.mount);
        return { low: r.low, high: r.high, note: note, bundle: bundle };
      }
    },

    siding: {
      label: "Siding",
      // Leads with the monthly payment. Quotes below the lender's minimum
      // fall back to the total automatically.
      priceDisplay: "monthly",
      priceLabel: "Total price", hubNote: "Vinyl and insulated vinyl",
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
    // The lender's own fee comes first: it sets the loan principal, and the
    // limits below apply to that principal, not to the cash quote.
    const gross = amount * (p.feeFactor || F.priceFactor || 1);
    const principal = gross - (F.downPayment || 0);
    if (principal < p.min || principal > p.max) return null;
    return principal * p.factor;
  }

  /* =========================================================================
     CONTACT VALIDATION
     -------------------------------------------------------------------------
     Three leads were lost in one week to three characters: gmail.con,
     aol.comj, aol.col. HubSpot keys contacts on email, so a bad address meant
     no contact, which meant the call-centre workflow never enrolled and
     nobody rang them. One was an $18k-$36k window job.

     Two layers, both free and both client side:

       1. a typo table for the domains people actually mistype
       2. an MX lookup over DNS-over-HTTPS, which catches every dead domain
          including ones nobody thought to list

     Design rules, in order of importance:
       - FAIL OPEN. If DNS is slow, blocked or down, the lead goes through.
         A validation outage must never cost a submission.
       - PROMPT, DO NOT BLOCK, on anything uncertain. A real domain that looks
         like a typo warns once, then submits if they insist.
       - Only hard-block a domain with no mail server at all, because HubSpot
         would drop that contact anyway and the lead is lost either way.
     ========================================================================= */
  const EMAIL_FIXES = {
    "gmail.con": "gmail.com", "gmail.co": "gmail.com", "gmail.cm": "gmail.com",
    "gmial.com": "gmail.com", "gmai.com": "gmail.com", "gamil.com": "gmail.com",
    "gmail.comm": "gmail.com", "gnail.com": "gmail.com",
    "aol.con": "aol.com", "aol.col": "aol.com", "aol.comj": "aol.com",
    "aol.co": "aol.com", "aol.cm": "aol.com",
    "yahoo.con": "yahoo.com", "yahoo.co": "yahoo.com", "yaho.com": "yahoo.com",
    "yahoo.comm": "yahoo.com", "ymail.con": "ymail.com",
    "hotmail.con": "hotmail.com", "hotmail.co": "hotmail.com", "hotmial.com": "hotmail.com",
    "outlook.con": "outlook.com", "outlook.co": "outlook.com", "outlok.com": "outlook.com",
    "comcast.net.": "comcast.net", "comcast.con": "comcast.net",
    "verizon.con": "verizon.net", "icloud.con": "icloud.com", "me.con": "me.com"
  };
  // A trailing string that cannot be a real TLD. ".com" mistyped nearly always
  // lands in here.
  const BAD_TLD = /\.(con|col|cmo|comj|comm|vom|xom|co m|om|c0m|net\.|ne|nt)$/;

  const mxCache = {};
  function domainHasMail(domain) {
    if (mxCache[domain] !== undefined) return Promise.resolve(mxCache[domain]);
    const done = (v) => { mxCache[domain] = v; return v; };
    try {
      const ctl = typeof AbortController === "function" ? new AbortController() : null;
      const timer = setTimeout(() => { if (ctl) ctl.abort(); }, 2500);
      return fetch("https://cloudflare-dns.com/dns-query?name=" +
          encodeURIComponent(domain) + "&type=MX",
          { headers: { accept: "application/dns-json" }, signal: ctl ? ctl.signal : undefined })
        .then((r) => r.json())
        .then((d) => {
          clearTimeout(timer);
          // Status 3 is NXDOMAIN: the domain does not exist at all.
          if (d.Status === 3) return done(false);
          if (d.Status !== 0) return done(true);          // unsure, let it through
          return done(Array.isArray(d.Answer) && d.Answer.length > 0);
        })
        .catch(() => { clearTimeout(timer); return true; });   // fail open
    } catch (e) { return Promise.resolve(true); }
  }

  // Returns {ok} | {ok:false, suggest} | {ok:false, hard:true, suggest}
  function checkEmail(raw) {
    const e = String(raw || "").trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/.test(e)) return Promise.resolve({ ok: false });
    const domain = e.split("@")[1];
    if (EMAIL_FIXES[domain]) {
      return Promise.resolve({ ok: false, suggest: e.replace(domain, EMAIL_FIXES[domain]) });
    }
    if (BAD_TLD.test(domain)) {
      return Promise.resolve({ ok: false, suggest: e.replace(/\.[a-z0-9 .]+$/, ".com") });
    }
    return domainHasMail(domain).then((live) => live
      ? { ok: true }
      : { ok: false, hard: true, suggest: e.replace(/\.[a-z]+$/, ".com") });
  }

  /* Phone. The North American plan says an area code and an exchange both
     start 2-9, and 555-01xx is reserved for fiction. Everything below is a
     number that cannot ring, so blocking it costs nothing. A transposed digit
     in a real number is not catchable here; the price screen shows the number
     back to them instead. */
  function checkPhone(raw) {
    let d = String(raw || "").replace(/\D/g, "");
    if (d.length === 11 && d[0] === "1") d = d.slice(1);
    if (d.length !== 10) return { ok: false, msg: "Enter a 10 digit phone number." };
    if (!/^[2-9]/.test(d)) return { ok: false, msg: "Area codes do not start with 0 or 1." };
    if (!/^[2-9]/.test(d[3])) return { ok: false, msg: "Check the number after the area code." };
    if (/^555(01\d\d|0100)$/.test(d.slice(3))) return { ok: false, msg: "That is not a working number." };
    if (/^(\d)\1{9}$/.test(d)) return { ok: false, msg: "Check the phone number." };
    if (d === "1234567890" || d === "0123456789") return { ok: false, msg: "Check the phone number." };
    return { ok: true, digits: d };
  }

  const prettyPhone = (raw) => {
    let d = String(raw || "").replace(/\D/g, "");
    if (d.length === 11 && d[0] === "1") d = d.slice(1);
    d = d.slice(0, 10);
    if (d.length > 6) return "(" + d.slice(0,3) + ") " + d.slice(3,6) + "-" + d.slice(6);
    if (d.length > 3) return "(" + d.slice(0,3) + ") " + d.slice(3);
    if (d.length > 0) return "(" + d;
    return "";
  };

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
      contact: {}, index: 0, result: null, sent: false,
      // Every option they price, in order. Kept so the rep sees all of them
      // rather than only the last, and so the customer can compare without
      // starting the form again.
      quotes: [], lastSentKey: ""
    };

    const questions = () => S.questionsFor ? S.questionsFor(state.answers) : S.questions;
    /* The screens, built fresh each render. An explicit list rather than
       index arithmetic, because two things now move: a service can put the
       address after the first question (S.addressAfter), and re-pricing skips
       the address and the contact gate entirely, since we already have both.
       Everything that used to reason about state.index now reads this. */
    function screens() {
      const qs = questions();
      const at = S.addressAfter || 0;        // 0 = address first, the default
      const wantAddr = !state.sent;          // re-price never re-asks
      const out = [];
      qs.forEach((qq, i) => {
        if (i === at && wantAddr) out.push({ k: "address" });
        out.push({ k: "question", q: qq });
      });
      if (at >= qs.length && wantAddr) out.push({ k: "address" });
      if (!PREVIEW && !state.sent) out.push({ k: "contact" });
      out.push({ k: "price" });
      return out;
    }
    const totalSteps = () => screens().length;

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
      const sc = screens()[state.index];
      return sc ? sc.k : "price";
    }

    function render() {
      const sc = screens()[state.index] || { k: "price" };
      const k = sc.k;
      paintCourses();
      backBtn.hidden = state.index === 0 || k === "price";
      nav.style.display = k === "price" ? "none" : "";
      if (k === "address")  renderAddress();
      if (k === "question") renderQuestion(sc.q);
      if (k === "contact")  renderContact();
      if (k === "price")    renderPrice();

      /* The seasonal banner belongs on the first screen, whatever that screen
         happens to be. Windows asks the window count first, roofing asks for
         the address, so it is mounted here rather than inside one renderer. */
      if (state.index === 0 && promoFor(serviceId)) {
        // Six flakes rather than a field of them: enough to read as snow at a
        // glance, few enough not to fight the headline sitting over it.
        const flakes = '<span class="rfx-snow" aria-hidden="true">' +
          new Array(6).join(",").split(",").map(function (_, i) {
            return '<i class="f' + (i + 1) + '"></i>';
          }).join("") + '</span>';
        /* With a single image the banner becomes a row: the headline and the
           dates stack on the left, the image sits inline to the right. With
           two images the headline stays on one line and they go underneath,
           because two of them beside the text would crowd it. */
        /* The bars run the full width under the headline, stacked with an "or"
           between when there are two. The dates sit on their own line now,
           because the headline no longer shares the row with an image. */
        const bars = (PROMO.barsByService || {})[serviceId] || [];
        const oneImg = !bars.length &&
          ((PROMO.optionsByService || {})[serviceId] || []).length === 1;
        /* Santa flies in from the left, settles on the headline for a beat,
           then climbs away to the right. He has his own lane above the text so
           he never covers it, and the whole thing is hidden for anyone who has
           asked for less motion. */
        const sleigh = '<span class="rfx-sleigh" aria-hidden="true">' +
          '<svg viewBox="-6 0 124 46" fill="currentColor">' +
          '<path d="M1.0,33.0 L27.0,33.0 C33.0,33.0 36.0,29.0 34.0,25.0 L32.2,26.0 C33.4,29.0 31.0,31.4 27.0,31.4 L1.0,31.4 ZM2.0,31.4 L4.5,24.0 L27.0,24.0 L29.0,31.4 ZM4.5,24.0 C2.5,17.0 6.0,13.0 11.0,13.4 L11.0,15.2 C7.6,15.0 5.2,18.0 6.6,24.0 ZM14.0,24.0 C12.6,18.0 15.0,14.6 19.0,15.0 C22.4,15.4 23.4,19.4 22.6,24.0 ZM18.6,10.8 m-3,0 a3,3 0 1,0 6,0 a3,3 0 1,0 -6,0M15.8,9.4 C16.0,5.2 20.0,4.0 22.0,6.4 L24.0,5.0 L23.0,8.6 C21.0,7.2 17.6,7.6 16.4,9.8 ZM22.0,17.0 L29.5,14.6 L30.0,16.0 L22.4,18.4 ZM44.0,32.0 C46.0,27.0 52.0,25.0 58.0,26.0 C61.0,24.0 63.0,20.0 65.0,17.0 C66.0,15.0 69.0,15.0 69.0,17.0 C70.0,18.0 71.0,19.0 70.0,20.0 C68.0,21.0 65.0,23.0 63.0,26.0 C64.0,29.0 63.0,32.0 61.0,33.0 C56.0,34.0 48.0,34.0 44.0,32.0 ZM59.0,32.0 L66.0,37.0 L69.0,36.0 L68.0,34.6 L66.0,35.2 L60.6,31.2 ZM56.0,33.0 L60.0,38.0 L64.0,39.0 L64.0,37.6 L61.0,36.8 L57.6,32.4 ZM48.0,33.0 L42.0,37.0 L39.0,36.0 L40.0,34.6 L42.0,35.2 L47.0,31.8 ZM51.0,33.0 L46.0,38.0 L42.0,39.0 L42.0,37.6 L45.0,36.8 L50.0,32.4 ZM66.0,17.0 L65.0,11.0 L66.4,11.0 L67.2,16.4 ZM65.3,12.0 L62.5,9.5 L63.4,8.6 L66.0,11.0 ZM65.6,11.0 L66.0,7.5 L67.1,7.8 L66.8,11.0 ZM68.0,16.4 L69.0,11.0 L70.2,11.3 L69.2,16.6 ZM69.0,11.5 L71.8,9.4 L72.5,10.4 L69.8,12.2 ZM44.0,30.0 L40.0,27.0 L41.4,29.6 ZM82.0,29.0 C84.0,24.0 90.0,22.0 96.0,23.0 C99.0,21.0 101.0,17.0 103.0,14.0 C104.0,12.0 107.0,12.0 107.0,14.0 C108.0,15.0 109.0,16.0 108.0,17.0 C106.0,18.0 103.0,20.0 101.0,23.0 C102.0,26.0 101.0,29.0 99.0,30.0 C94.0,31.0 86.0,31.0 82.0,29.0 ZM97.0,29.0 L104.0,34.0 L107.0,33.0 L106.0,31.6 L104.0,32.2 L98.6,28.2 ZM94.0,30.0 L98.0,35.0 L102.0,36.0 L102.0,34.6 L99.0,33.8 L95.6,29.4 ZM86.0,30.0 L80.0,34.0 L77.0,33.0 L78.0,31.6 L80.0,32.2 L85.0,28.8 ZM89.0,30.0 L84.0,35.0 L80.0,36.0 L80.0,34.6 L83.0,33.8 L88.0,29.4 ZM104.0,14.0 L103.0,8.0 L104.4,8.0 L105.2,13.4 ZM103.3,9.0 L100.5,6.5 L101.4,5.6 L104.0,8.0 ZM103.6,8.0 L104.0,4.5 L105.1,4.8 L104.8,8.0 ZM106.0,13.4 L107.0,8.0 L108.2,8.3 L107.2,13.6 ZM107.0,8.5 L109.8,6.4 L110.5,7.4 L107.8,9.2 ZM82.0,27.0 L78.0,24.0 L79.4,26.6 ZM28.5,15.2 L52,15.8 L52,17.2 L28.5,16.6 Z M66.5,13.4 L90,10.6 L90.2,12 L66.7,14.8 Z"/>' +
          '</svg></span>';

        stage.insertAdjacentHTML("afterbegin",
          '<div class="rfx-promo' + (bars.length ? " rfx-promo-bars" : "") +
            (oneImg ? " rfx-promo-row" : "") + '">' + flakes + sleigh +
            '<span class="rfx-promo-head">' +
              '<span class="rfx-promo-tag">' + esc(PROMO.label) + '</span> ' +
              '<span class="rfx-promo-dates">' + esc(PROMO.dates) + '</span>' +
            '</span>' +
            // Services without images get the offer as a line of text; the
            // ones with images let the artwork say it, rather than saying the
            // same thing twice in one block.
            (!bars.length && !((PROMO.optionsByService || {})[serviceId] || []).length &&
             (PROMO.shortByService || {})[serviceId]
              ? '<span class="rfx-promo-short">' +
                  esc(PROMO.shortByService[serviceId]) + '</span>'
              : "") +
            (bars.length
              ? '<span class="rfx-promo-chips">' +
                  bars.map(function (o) {
                    return '<img class="rfx-promo-bar" src="' + o.img +
                      '" alt="' + esc(o.alt) + '">';
                  }).join('<span class="rfx-promo-chip-or">or</span>') +
                '</span>'
              : (((PROMO.optionsByService || {})[serviceId] || []).length
                ? '<span class="rfx-promo-chips">' +
                    PROMO.optionsByService[serviceId].map(function (o) {
                      return '<img class="rfx-promo-chip" src="' + o.img +
                        '" alt="' + esc(o.alt) + '">';
                    }).join('<span class="rfx-promo-chip-or">or</span>') +
                  '</span>'
                : "")) +
          '</div>');
      }

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

      /* The heading follows the mode. "Let's find your home" is right while
         they are still looking; once the photo is up we have found it, so
         asking them to confirm reads better than repeating the search. */
      const head = P.mode === "confirm"
        ? 'Is this your home?'
        : (S.addressHead || "Let's find your home!");


      const sub =
        P.mode === "confirm"
          ? 'Take a look. Is this the home you want priced?'
          : P.mode === "manual"
            ? ((S.addressSub || "This lets us confirm we service your area.") +
               " Enter the address and we will take it from there.")
            : ((S.addressSub || "This lets us confirm we service your area.") +
               " Start typing and pick your address from the list.");

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
        '<h2 class="rfx-h">' + esc(head) + '</h2>' +
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
      const cap = qq.caption
        ? '<p class="rfx-sub" style="margin-top:-8px">' + esc(qq.caption) + '</p>' : "";

      if (qq.type === "check") {
        // Optional interest flag. Never blocks Continue: it is a question we
        // are asking for our own benefit, so it must not cost a submission.
        if (state.answers[qq.id] == null) state.answers[qq.id] = "no";
        const on = state.answers[qq.id] === "yes";
        stage.innerHTML = head + cap +
          '<div class="rfx-options">' +
            '<button type="button" class="rfx-opt rfx-check' + (on ? " is-on" : "") + '">' +
              '<span class="rfx-opt-tick"></span><span class="rfx-opt-body">' +
              '<span class="rfx-opt-title">' + esc(qq.label) + '</span>' +
              (qq.note ? '<span class="rfx-opt-note">' + esc(qq.note) + '</span>' : "") +
            '</span></button>' +
          '</div>';
        const b = q(".rfx-check");
        b.addEventListener("click", () => {
          const now = state.answers[qq.id] === "yes" ? "no" : "yes";
          state.answers[qq.id] = now;
          b.classList.toggle("is-on", now === "yes");
        });
        nextBtn.disabled = false;
        return;
      }

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
      stage.innerHTML = head + cap + '<div class="rfx-options' + cls + '">' +
        qq.options.map((o) =>
          '<button type="button" class="rfx-opt' + (state.answers[qq.id] === o.v ? " is-on" : "") +
          (o.sub ? " rfx-opt-sub" : "") +
          '" data-v="' + o.v + '"><span class="rfx-opt-tick"></span>' +
          (o.img ? '<img class="rfx-opt-img' + (o.imgSquare ? " is-square" : "") +
            '" src="' + o.img + '" alt="" ' +
                   'loading="lazy" decoding="async">' : "") +
          '<span class="rfx-opt-body">' +
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

    /* A blurred look at the real figure, sitting above the form. The price is
       already worked out by this point, so this is showing something that
       exists rather than promising one. Returns "" when there is no price to
       preview, which is the "we will price this by hand" path. */
    function teaser() {
      const r = S.price(state.answers);
      if (!r || !isFinite(r.low) || !isFinite(r.high)) return "";
      const plus = r.plus ? "+" : "";
      const payLow = monthlyPayment(r.low, serviceId);
      const payHigh = monthlyPayment(r.high, serviceId);
      const showPay = !!(payLow && payHigh);
      const thumb = state.place.lat
        ? '<img class="rfx-panel-thumb" alt="" src="' +
          (S.view === "street" ? streetViewUrl(state.place.lat, state.place.lng)
                               : satelliteUrl(state.place.lat, state.place.lng)) + '">'
        : "";
      // aria-hidden so a screen reader does not simply read out what the blur
      // is hiding. The heading and the button carry the meaning instead.
      return '<div class="rfx-teaser" aria-hidden="true">' +
        (state.place.address
          ? '<div class="rfx-panel-head">' + thumb +
            '<div style="min-width:0"><div class="rfx-panel-for">Your estimate for</div>' +
            '<div class="rfx-panel-addr">' + esc(state.place.address) + '</div></div></div>'
          : "") +
        '<div class="rfx-teaser-figs">' +
          '<span class="rfx-fig">' +
            '<span class="rfx-fig-total rfx-blur">' + money(r.low) + '</span>' +
            (showPay ? '<span class="rfx-fig-mo rfx-teaser-mo"><span class="rfx-blur">' +
              moneyExact(payLow) + '/mo</span></span>' : "") +
          '</span>' +
          '<span class="rfx-figs-to">to</span>' +
          '<span class="rfx-fig rfx-fig-hi">' +
            '<span class="rfx-fig-total rfx-blur">' + money(r.high) + plus + '</span>' +
            (showPay ? '<span class="rfx-fig-mo rfx-teaser-mo"><span class="rfx-blur">' +
              moneyExact(payHigh) + '/mo</span></span>' : "") +
          '</span>' +
        '</div>' +
        '<div class="rfx-lock">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
          'stroke-linecap="round" stroke-linejoin="round">' +
          '<rect x="4" y="10.5" width="16" height="10" rx="2"></rect>' +
          '<path d="M8 10.5V7a4 4 0 0 1 8 0v3.5"></path></svg>' +
          '<b>Your price is on the next page!</b>' +
        '</div>' +
      '</div>';
    }

    function renderContact() {
      nextBtn.textContent = "See my price";
      const peek = teaser();
      stage.innerHTML =
        '<p class="rfx-kicker">' + iconMark() + esc(S.label) + '</p>' +
        '<h2 class="rfx-h">Let us know who we are quoting.</h2>' + peek +
        (peek ? "" : '<p class="rfx-sub">Your price is ready. Tell us who we\'re quoting ' +
         'and we\'ll show it on the next screen.</p>') +
        FIELDS.map((f) =>
          '<div class="rfx-field"><label class="rfx-field-label" for="rfx_' + serviceId + "_" + f.k +
          '">' + f.label + '</label><input class="rfx-input" id="rfx_' + serviceId + "_" + f.k +
          '" type="' + f.type + '" value="' + esc(state.contact[f.k] || "") + '"' +
          (f.k === "phone" ? ' inputmode="tel"' : "") + '>' +
          '<p class="rfx-err" id="rfxErr_' + serviceId + "_" + f.k + '" hidden></p></div>').join("") +
        '<p class="rfx-fix" id="rfxFix_' + serviceId + '" hidden></p>' +
        '<p class="rfx-fine rfx-form-err" hidden style="color:var(--rfx-red)"></p>';

      FIELDS.forEach((f) => {
        const el = q("#rfx_" + serviceId + "_" + f.k);
        el.addEventListener("input", (e) => {
          if (f.k === "phone") {
            // Format as they type so a wrong digit count is visible rather
            // than something they only discover at submit.
            const pos = e.target.selectionStart, before = e.target.value.length;
            e.target.value = prettyPhone(e.target.value);
            const after = e.target.value.length;
            if (pos !== null) {
              try { e.target.setSelectionRange(pos + (after - before), pos + (after - before)); }
              catch (x) {}
            }
          }
          state.contact[f.k] = e.target.value;
          const err = q("#rfxErr_" + serviceId + "_" + f.k);
          err.hidden = true; el.classList.remove("is-bad");
          const s = q("#rfxFix_" + serviceId);
          if (f.k === "email" && s) s.hidden = true;
        });
        // Check the address the moment they leave the field, not at submit,
        // so the fix is offered while they are still looking at it.
        if (f.k === "email") el.addEventListener("blur", () => emailGate(false));
      });
      state.emailWarned = false;
      nextBtn.disabled = false;
    }

    /* Runs on blur and again before submit. `blocking` is true only on
       submit, where a dead domain stops the send. On blur it never blocks,
       it just offers the correction. */
    function emailGate(blocking) {
      const el = q("#rfx_" + serviceId + "_email");
      const err = q("#rfxErr_" + serviceId + "_email");
      const fix = q("#rfxFix_" + serviceId);
      const v = (state.contact.email || "").trim();
      if (!el || !v) return Promise.resolve(true);

      return checkEmail(v).then((r) => {
        if (r.ok) { fix.hidden = true; return true; }
        if (!r.suggest) {
          if (blocking) { err.hidden = false; err.textContent = "Check the email address.";
                          el.classList.add("is-bad"); }
          return !blocking;
        }
        fix.hidden = false;
        fix.innerHTML = 'Did you mean <button type="button" class="rfx-fix-btn">' +
          esc(r.suggest) + '</button>?';
        fix.querySelector(".rfx-fix-btn").addEventListener("click", () => {
          state.contact.email = r.suggest;
          el.value = r.suggest;
          fix.hidden = true; err.hidden = true; el.classList.remove("is-bad");
          state.emailWarned = false;
        });
        if (!blocking) return true;
        // A domain with no mail server is a dead end, so hold them there.
        if (r.hard) { el.classList.add("is-bad"); return false; }
        // A live domain that merely looks wrong: warn once, then respect it.
        if (!state.emailWarned) { state.emailWarned = true; el.classList.add("is-bad"); return false; }
        return true;
      }).catch(() => true);
    }

    function validate() {
      let ok = true;
      FIELDS.forEach((f) => {
        const el = q("#rfx_" + serviceId + "_" + f.k), err = q("#rfxErr_" + serviceId + "_" + f.k);
        const v = (state.contact[f.k] || "").trim();
        let msg = "";
        if (!v) msg = f.label + " is required.";
        else if (f.k === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) msg = "Check the email address.";
        else if (f.k === "phone") { const p = checkPhone(v); if (!p.ok) msg = p.msg; }
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
      if (qq.type === "check") return state.answers[qq.id] === "yes" ? "Yes" : "No";
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
        // Every option they looked at, not just the last. Without this a second
        // look overwrites the first and the rep never learns it happened.
        (state.quotes.length > 1
          ? "\nPriced " + state.quotes.length + " options:" +
            state.quotes.map((q2, i) => "\n  " + (i + 1) + ". " + q2.label + " — " +
              money(q2.low) + " to " + money(q2.high) + (q2.plus ? "+" : "")).join("")
          : (r ? "\nEstimate: " + money(r.low) + " to " + money(r.high) + (r.plus ? "+" : "")
               : "\nEstimate: not priced online, needs a call"));

      const attrSrc = (function () {
        const svc = S.label || "Estimator";
        let sig = {};
        try {
          const m = document.cookie.match(/(?:^|;\s*)cenvar_attr=([^;]+)/);
          if (m) sig = JSON.parse(decodeURIComponent(m[1]));
        } catch (e) {}
        const q = new URLSearchParams(window.location.search);
        const g = (k) => String(sig[k] || q.get(k) || "").toLowerCase();
        const us = g("utm_source"), um = g("utm_medium");
        const meta = !!g("fbclid") || /facebook|fb|meta|instagram|ig/.test(us) || /paid.?social/.test(um);
        const gads = !!(g("gclid") || g("gbraid") || g("wbraid")) || (/google|adwords/.test(us) && /cpc|ppc|paid/.test(um));
        const bing = !!g("msclkid") || /bing|microsoft/.test(us);
        const channel = meta ? "Meta" : gads ? "Google Ads" : bing ? "Bing Paid Ads" : null;
        return channel ? channel + " - Cenvar Estimator - " + svc : "";
      })();


      const pairs = [
        [P.firstName, parts[0]], [P.lastName, parts.slice(1).join(" ")],
        [P.email, c.email], [P.phone, c.phoneDigits || c.phone],
        [P.address, state.place.address], [P.zip, state.place.zip],
        [P.service, S.label],
        // Span every option, so filtering on job size catches the largest thing
        // they considered rather than whichever they happened to view last.
        [P.estimateLow, state.quotes.length
          ? String(round(Math.min.apply(null, state.quotes.map((q2) => q2.low))))
          : (r ? String(round(r.low)) : "")],
        [P.estimateHigh, state.quotes.length
          ? String(round(Math.max.apply(null, state.quotes.map((q2) => q2.high))))
          : (r ? String(round(r.high)) : "")],
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
    // One place decides which number this funnel shows, so the button and the
    // submission-error message can never disagree.
    const PHONE = S.phone || C.phone;
    const PHONE_HREF = S.phoneHref || C.phoneHref;

    function ctaBlock() {
      return '<a class="rfx-btn rfx-btn-primary rfx-call" style="width:100%" href="' +
        PHONE_HREF + '">Call ' + esc(PHONE) + ' to schedule a FREE estimate</a>' +
        (C.hours ? '<p class="rfx-fine rfx-center">' + esc(C.hours) + '</p>' : "") +
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

    /* Straight back to the first question, keeping the address and their
       details. No form, no second lead, no re-enrolment in the call-centre
       workflow. */
    /* Handles both the payment tabs and the scenario toggle. Rebuilds only
       the body that changed, so nothing re-submits and the count-up on the
       price panel does not replay. */
    function wireWorkings() {
      const box = q(".rfx-save");
      if (!box) return;

      const rebuild = () => {
        const payMid = (monthlyPayment(state.result.low, serviceId) +
                        monthlyPayment(state.result.high, serviceId)) / 2;
        const cashMid = (state.result.low + state.result.high) / 2;
        const scenarios = SOLAR.savings.scenarios || [];
        const scn = scenarios.filter((x) => x.id === (state.savingsScenario || "ours"))[0]
                    || scenarios[0];
        const w = S.waysFor(state.answers, cashMid, payMid, scn);
        if (!w) return;
        box.querySelector(".rfx-way-body").innerHTML =
          wayRows(w, state.payWay || "loan");
        const note = box.querySelector(".rfx-work-note");
        if (note && scn) note.textContent = scn.note;
      };

      const tabs = box.querySelector(".rfx-ways");

      // Tabs and the links up in the price panel both come through here, so
      // they can never disagree about which option is showing.
      const selectWay = (id, from) => {
        if (!id) return;
        state.payWay = id;
        if (tabs) Array.prototype.forEach.call(tabs.children,
          (c) => c.classList.toggle("is-on", c.dataset.way === id));
        rebuild();
        track("estimator_pay_way", { service: serviceId, way: id, from: from || "tab" });
      };

      if (tabs) tabs.addEventListener("click", (e) => {
        const b = e.target.closest(".rfx-way");
        if (b) selectWay(b.dataset.way, "tab");
      });

      // The links sit in the price panel, outside this box.
      const panel = root.querySelector(".rfx-panel-alt");
      if (panel) panel.addEventListener("click", (e) => {
        const b = e.target.closest(".rfx-jump");
        if (!b) return;
        selectWay(b.dataset.way, "panel");
        // Bring the comparison into view, since the panel sits above it.
        if (box.scrollIntoView) box.scrollIntoView({ behavior: "smooth", block: "center" });
      });

      const btn = box.querySelector(".rfx-work-toggle");
      const work = box.querySelector(".rfx-work");
      if (btn && work) btn.addEventListener("click", () => {
        const open = work.hidden;
        work.hidden = !open;
        btn.textContent = open ? "Hide the savings assumptions"
                               : "Open the savings assumption calculator";
        if (open) track("estimator_savings_open", { service: serviceId });
      });

      const scn = box.querySelector(".rfx-scn");
      if (scn) scn.addEventListener("click", (e) => {
        const b = e.target.closest(".rfx-scn-btn");
        if (!b) return;
        state.savingsScenario = b.dataset.scn;
        Array.prototype.forEach.call(scn.children,
          (c) => c.classList.toggle("is-on", c === b));
        rebuild();
        track("estimator_savings_scenario", { service: serviceId, scenario: b.dataset.scn });
      });
    }

    function wireAgain() {
      const b = q(".rfx-again");
      if (!b) return;
      b.addEventListener("click", () => {
        track("estimator_reprice_click", { service: serviceId });
        /* screens() drops the address and the contact gate once state.sent is
           true, so index 0 is the first question. */
        state.index = 0;
        render();
        window.scrollTo({ top: root.offsetTop - 20, behavior: "smooth" });
      });
    }

    /* The help bubbles. Click rather than hover, so they work on a phone.
       Opening one closes any other, and a click anywhere else closes them. */
    function wireHelp() {
      const box = q(".rfx-save");
      if (!box) return;
      const closeAll = () => box.querySelectorAll(".rfx-help-bub")
        .forEach((b) => { b.hidden = true; });
      box.addEventListener("click", (e) => {
        const btn = e.target.closest(".rfx-help");
        if (!btn) { closeAll(); return; }
        e.stopPropagation();
        const bub = btn.nextElementSibling;
        const wasOpen = bub && !bub.hidden;
        closeAll();
        if (bub && !wasOpen) {
          bub.hidden = false;
          track("estimator_help_open", { service: serviceId, topic: "srec" });
        }
      });
      // A click outside the panel should close them too.
      if (!root.__rfxHelpDoc) {
        root.__rfxHelpDoc = true;
        document.addEventListener("click", (e) => {
          if (!e.target.closest(".rfx-save")) {
            root.querySelectorAll(".rfx-help-bub").forEach((b) => { b.hidden = true; });
          }
        });
      }
    }

    function wireDisclosure() {
      const box = q(".rfx-disc");
      if (!box) return;
      const btn = box.querySelector(".rfx-disc-toggle");
      const body = box.querySelector(".rfx-disclosure");
      if (!btn || !body) return;
      btn.addEventListener("click", () => {
        const open = body.hidden;
        body.hidden = !open;
        btn.textContent = open
          ? "Hide loan information and terms"
          : "Click here for loan information and terms";
      });
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
        .replace(/\{min\}/g, p ? "$" + p.min.toLocaleString("en-US") : "")
        .replace(/\{lender\}/g, p ? (p.lender || "our lending partner") : "");
      /* Reg Z treats the monthly payment as a triggering term, so the material
         credit terms have to be clear and conspicuous. They stay on screen as
         a short line; only the long legal text collapses behind the link.
         Hiding the APR and term behind a click would be the version that
         fails that test. */
      const terms = p
        ? "$0 down &middot; " + p.months + " months &middot; " +
          (p.apr != null ? p.apr : p.rate) + "% APR for well qualified buyers"
        : "";
      return '<div class="rfx-disc">' +
        (terms ? '<p class="rfx-disc-terms">' + terms + '</p>' : "") +
        '<button type="button" class="rfx-disc-toggle">' +
          'Click here for loan information and terms</button>' +
        '<p class="rfx-disclosure" hidden>' + esc(text) + '</p>' +
      '</div>';
    }

    // A stable fingerprint of the current answers, so a genuinely new option
    // can be told apart from a re-render of the same one.
    function answersKey() {
      const a = state.answers;
      return Object.keys(a).sort().map((k) => k + "=" + a[k]).join("|");
    }

    function describeAnswers() {
      return questions().filter((qq) => !qq.nav).map((qq) => answerText(qq)).join(", ");
    }

    /* Record the option on screen, then push the whole set back to HubSpot.
       This UPDATES the same contact rather than creating a second one, and
       deliberately does NOT fire generate_lead again: one person, one
       enquiry. Counting it twice would flatter the cost per lead and teach
       Meta to find people who submit repeatedly. */
    function recordQuote(r) {
      if (!r) return;
      const key = answersKey();
      if (key === state.lastSentKey) return;
      state.lastSentKey = key;
      state.quotes.push({ label: describeAnswers(), low: r.low, high: r.high, plus: !!r.plus });
      // The first option is already on its way as part of the lead itself.
      // Only a genuine second look needs an update.
      if (state.quotes.length < 2 || !state.sent) return;
      submitLead().catch(() => {});       // silent: they already have their price
      track("estimator_reprice", {
        service: serviceId, option_number: state.quotes.length,
        value: Math.round((r.low + r.high) / 2), currency: "USD"
      });
    }

    // One tab's worth of figures. Each way of paying gets the lines that
    // actually apply to it rather than a shared template with blanks.
    function wayRows(w, key) {
      const o = w[key];
      const row = (k, v, cls, help) =>
        '<div class="rfx-save-row' + (cls ? " " + cls : "") + '"><span>' + k +
        (help ? ' <button type="button" class="rfx-help" aria-label="What is this?">' +
          '?</button><span class="rfx-help-bub" hidden>' + esc(help) + '</span>' : "") +
        '</span><strong>' + v + '</strong></div>';

      // Positive is green, negative is red. The Under $100 band finishes
      // behind on a loan, and a green minus number would read as a win.
      const big = (n) => '<span class="' + (n >= 0 ? "rfx-up" : "rfx-down") + '">' +
        (n >= 0 ? "+" : "\u2212") + money(Math.abs(n)) + '</span>';

      const SREC_HELP = "A Solar Renewable Energy Certificate. Your panels earn one " +
        "for every 1,000 kWh they generate, whether you use that power or not, and " +
        "Virginia power companies buy them to meet state targets. You keep this " +
        "income as long as you own the system.";
      let out = row("Your system covers", Math.round(w.offset * 100) + "% of what you use");

      if (key === "cash") {
        out += row("Paid up front", money(o.upfront));
        out += row("Power bill saving, year one",
          moneyExact(SOLAR.bill[state.answers.bill] * w.offset -
            SOLAR.savings.connectionFee) + " a month");
        if (w.srecOn) out += row("SREC income, year one",
          moneyExact(w.srecYear1) + " a year", "", SREC_HELP);
        out += row("Pays for itself in",
          o.payback ? "year " + o.payback : "over " + w.years + " years");
        out += row("Ahead after " + w.years + " years", big(o.net), "rfx-save-big");
      } else if (key === "loan") {
        const save = SOLAR.bill[state.answers.bill] * w.offset - SOLAR.savings.connectionFee;
        out += row("Power bill saving, year one", moneyExact(save) + " a month");
        if (w.srecOn) out += row("SREC income, year one",
          moneyExact(w.srecYear1) + " a year", "", SREC_HELP);
        out += row("Payment, while the loan runs", moneyExact(o.monthly) + " a month");
        out += row("Net while financing",
          (save - o.monthly >= 0 ? "+" : "\u2212") + moneyExact(Math.abs(save - o.monthly)) +
          " a month", "rfx-save-net");
        out += row("Ahead after " + w.years + " years", big(o.net), "rfx-save-big");
      } else {
        const save = SOLAR.bill[state.answers.bill] * w.offset - SOLAR.savings.connectionFee;
        out += row("Power bill saving, year one", moneyExact(save) + " a month");
        out += row("Your power costs, year one",
          (o.perKwh * 100).toFixed(1) + "\u00a2 a unit instead of " +
          (o.gridRate * 100).toFixed(1) + "\u00a2");
        out += row("Lease payment, year one", moneyExact(o.monthly) + " a month");
        out += row("Payment rises each year",
          ((o.escalator || 0) * 100).toFixed(0) + "%, fixed either way");
        // Stated rather than omitted. A blank line next to two options that
        // have one reads as "not applicable" instead of "someone else keeps it".
        if (w.srecOn) out += row("SRECs", "none, the owner keeps these", "", SREC_HELP);
        out += row("You can buy it outright after", "year " + o.buyout);
        if (o.buyoutFMV) out += row("Buyout at year " + o.buyout, money(o.buyoutFMV));
        out += row("Ahead after " + w.years + " years", big(o.net), "rfx-save-big");
        out += '<p class="rfx-way-note">' + esc(o.note || "") +
          ' <strong>You do not own the system, so there is nothing to sell on, no ' +
          'equipment value if you move, and the SRECs your panels earn belong to the ' +
          'lease company rather than to you.</strong></p>';
      }
      return out;
    }

    function workingsPanel(w, scn, scenarios, activeScn) {
      return '<div class="rfx-work" hidden>' +
        '<p class="rfx-work-h">How we worked this out</p>' +
        '<div class="rfx-work-row"><span>Your bill suggests you use</span><strong>' +
          Math.round(w.usageYr).toLocaleString("en-US") + ' kWh a year</strong></div>' +
        '<div class="rfx-work-row"><span>A ' + w.kw.toFixed(1) +
          ' kW system here produces</span><strong>' +
          Math.round(w.prodYr).toLocaleString("en-US") + ' kWh a year</strong></div>' +
        '<div class="rfx-work-row"><span>Electricity price we used</span><strong>' +
          (SOLAR.savings.rate * 100).toFixed(2) + '&cent; per kWh</strong></div>' +
        '<div class="rfx-work-row"><span>Connection fee you keep paying</span><strong>' +
          moneyExact(SOLAR.savings.connectionFee) + ' a month</strong></div>' +
        '<div class="rfx-work-row"><span>Panel output falls by</span><strong>' +
          (SOLAR.savings.degradation * 100).toFixed(1) + '% a year</strong></div>' +
        (w.srecOn
          ? '<div class="rfx-work-row"><span>SRECs your panels earn</span><strong>' +
              (w.prodYr / 1000).toFixed(1) + ' a year</strong></div>' +
            '<div class="rfx-work-row"><span>Locked rate, first ' + w.srecLockedYears +
              ' years</span><strong>' + moneyExact(w.srecLocked) + ' each</strong></div>' +
            '<div class="rfx-work-row"><span>After that, today\u2019s market price</span>' +
              '<strong>' + moneyExact(w.srecSpot) + ' each</strong></div>'
          : "") +
        '<p class="rfx-work-h" style="margin-top:14px">What we assume about power prices</p>' +
        '<div class="rfx-scn">' + scenarios.map((x) =>
          '<button type="button" class="rfx-scn-btn' + (x.id === activeScn ? " is-on" : "") +
          '" data-scn="' + x.id + '">' + esc(x.label) + '</button>').join("") + '</div>' +
        '<p class="rfx-work-note">' + esc(scn ? scn.note : "") + '</p>' +
        '<p class="rfx-work-src">Virginia\u2019s average residential price rose from ' +
          '14.22&cent; to 15.96&cent; per kWh between February 2025 and February 2026 ' +
          '(U.S. Energy Information Administration). The State Corporation Commission ' +
          'approved a Dominion increase of about $11.24 a month for 2026 and a further ' +
          '$2.36 for 2027. We assume those increases work through, then prices settle. ' +
          '<strong>That is our assumption, not a forecast.</strong> Nobody publishes a ' +
          '25 year projection of Virginia power prices, and we are not claiming to have one.</p>' +
        (w.srecOn
          ? '<p class="rfx-work-src" style="margin-top:9px">Your panels earn one Solar ' +
            'Renewable Energy Certificate for every 1,000 kWh they generate, whether you ' +
            'use that power or not, and Virginia power companies buy them to meet state ' +
            'targets. You can lock a price for the first ' + w.srecLockedYears + ' years, ' +
            'currently ' + moneyExact(w.srecLocked) + ' each. After that we use ' +
            moneyExact(w.srecSpot) + ', today\u2019s market price, held flat. Some ' +
            'analysts expect Virginia prices to rise well above that. We have not ' +
            'assumed it. <strong>These belong to whoever owns the system, so a leased ' +
            'system earns you none.</strong></p>'
          : "") +
      '</div>';
    }

    function renderPrice() {
      // In preview there is no contact step, so the price is worked out here.
      // After a re-price there is no contact step either, and the answers have
      // changed, so it has to be worked out again or they see the old number.
      if (PREVIEW || state.sent) state.result = S.price(state.answers);
      const r = state.result;
      const recap = '<div class="rfx-recap rfx-recap-tile">' +
        (state.place.address ? '<div class="rfx-recap-row"><span class="rfx-recap-k">Home</span>' +
          '<span class="rfx-recap-v">' + esc(state.place.address) + '</span></div>' : "") +
        questions().filter((qq) => !qq.nav)
          .map((qq) => '<div class="rfx-recap-row"><span class="rfx-recap-k">' +
          esc(questionLabel(qq)) + '</span><span class="rfx-recap-v">' + esc(answerText(qq)) +
          '</span></div>').join("") + '</div>';

      recordQuote(r);

      // Anything they priced before this one, so comparing does not need a
      // second trip through the funnel.
      const others = state.quotes.slice(0, -1);
      const priorBlock = others.length
        ? '<div class="rfx-prior"><p class="rfx-prior-h">You also priced</p>' +
          others.map((q2) =>
            '<div class="rfx-prior-row"><span class="rfx-prior-k">' + esc(q2.label) + '</span>' +
            '<span class="rfx-prior-v">' + money(q2.low) + ' – ' + money(q2.high) +
            (q2.plus ? "+" : "") + '</span></div>').join("") + '</div>'
        : "";

      const againBtn = '<button type="button" class="rfx-btn rfx-btn-ghost rfx-again" ' +
        'style="width:100%;margin-top:10px">Price a different option</button>' +
        '<p class="rfx-fine rfx-center">Your details are saved, so this will not ' +
        'start a new request.</p>';

      const cta = ctaBlock();

      if (!r) {
        stage.innerHTML = '<div class="rfx-done-mark"></div>' +
          '<h2 class="rfx-h">We will price this by hand</h2>' +
          '<p class="rfx-sub">What you described does not fit a standard price, which usually ' +
          'means there is a better option than the catalog answer. Someone will call within ' +
          'one business day.</p>' + recap + cta;
        wireCall(); wireAgain(); wireDisclosure();
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
      /* "Or pay cash, or lease from $117 a month." Built here so it can be
         left out entirely when the lease is off or has no price. */
      let altLine = "";
      if (S.priceDisplay === "monthly" && S.waysFor && showPay) {
        const W = (SOLAR.savings.ways || {});
        const lw = W.lease;
        if (lw && lw.enabled !== false && lw.perKwh) {
          const peek = S.waysFor(state.answers, (r.low + r.high) / 2,
            (payLow + payHigh) / 2);
          if (peek && peek.lease && peek.lease.monthly) {
            // Tappable, because if the messaging points at the lease the
            // number is the thing people will reach for.
            altLine =
              '<button type="button" class="rfx-jump rfx-jump-cash" data-way="cash">' +
                'Pay cash</button>' +
              '<button type="button" class="rfx-jump rfx-jump-lease" data-way="lease">' +
                'Lease from ' + moneyExact(peek.lease.monthly) + ' a month</button>';
          }
        }
      }

      const mo = (v) => showPay && v
        ? '<span class="rfx-fig-mo">' + moneyExact(v) + '/mo</span>' : "";

      /* Three ways to pay, as tabs. Cash and loan are ownership, lease is
         not, and the panel says so rather than letting a savings figure
         imply otherwise. */
      let savingsBlock = "";
      if (S.priceDisplay === "monthly" && S.waysFor && showPay) {
        const payMid = (payLow + payHigh) / 2;
        const cashMid = (r.low + r.high) / 2;
        const scenarios = SOLAR.savings.scenarios || [];
        const activeScn = state.savingsScenario || "ours";
        const scn = scenarios.filter((x) => x.id === activeScn)[0] || scenarios[0];
        const w = S.waysFor(state.answers, cashMid, payMid, scn);
        const WAYS = SOLAR.savings.ways || {};
        const order = ["loan", "cash", "lease"].filter(
          (k) => WAYS[k] && WAYS[k].enabled !== false);
        const activeWay = state.payWay || "loan";

        if (w && order.length) {
          const tabs = '<div class="rfx-ways">' + order.map((k) =>
            '<button type="button" class="rfx-way' + (k === activeWay ? " is-on" : "") +
            '" data-way="' + k + '">' + esc(WAYS[k].label) + '</button>').join("") + '</div>';

          savingsBlock =
            '<div class="rfx-save">' +
              '<p class="rfx-save-h rfx-save-h-lead">Monthly Breakdown &amp; ' +
                '25 Year Savings Assumptions</p>' +
              tabs +
              '<div class="rfx-way-body">' + wayRows(w, activeWay) + '</div>' +
              '<button type="button" class="rfx-work-toggle">' +
                'Open the savings assumption calculator</button>' +
              workingsPanel(w, scn, scenarios, activeScn) +
            '</div>';
        }
      }

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
          (S.priceDisplay === "monthly" && showPay
            // Monthly leads, total moves to a quiet line underneath. On a
            // purchase this size the payment is what people decide on.
            ? '<div class="rfx-paytile">' +
                '<div class="rfx-figs">' +
                  '<span class="rfx-fig">' +
                    '<span class="rfx-fig-total">' + moneyExact(payLow) + '</span>' +
                  '</span>' +
                  '<span class="rfx-figs-to">to</span>' +
                  '<span class="rfx-fig rfx-fig-hi">' +
                    '<span class="rfx-fig-total">' + moneyExact(payHigh) + '</span>' +
                  '</span>' +
                '</div>' +
                '<div class="rfx-permonth-row">' +
                  '<span class="rfx-permonth">per month</span>' +
                  '<span class="rfx-sysprice">' + esc(S.priceLabel || "System price") +
                    ' ' + money(r.low) + ' to ' +
                    money(r.high) + plus + '</span>' +
                '</div>' +
              '</div>' +
              // A pointer, not a second headline. Naming the lease figure here
              // in the same size as the monthly would anchor everyone to the
              // cheapest number before they have any context for it.
              (altLine ? '<div class="rfx-panel-alt">' + altLine + '</div>' : "")
            // Fallback. A quote under the lender's minimum cannot show a
            // payment, so the total takes the headline instead. Same tile, so
            // the screen does not change shape on the 11% of windows and 17%
            // of doors quotes that land here.
            : '<div class="rfx-paytile">' +
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
                (S.priceDisplay === "monthly"
                  ? '<div class="rfx-permonth-row">' +
                      '<span class="rfx-permonth">total price</span></div>'
                  : "") +
              '</div>') +
        '</div>' +

        (breakdown ? '<div class="rfx-range">' + breakdown + '</div>' : "") +
        // The financing disclosure, centred and small, sits directly under the
        // price it describes.
        (showPay ? disclosureBlock() : "") +
        (r.note ? '<div class="rfx-note">' + esc(r.note) + '</div>' : "") +
        (r.bundle ? '<div class="rfx-note">' + esc(r.bundle) + '</div>' : "") +
        // The payment caveat, without the $0 down line, which now sits
        // immediately above the call button where it does the most work.
        // A service can suppress this line with priceCaveat: "". The sizing
        // note above it already says the same thing on solar.
        (function () {
          const cav = S.priceCaveat !== undefined ? S.priceCaveat : C.priceCaveat;
          if (!cav) return "";
          // An optional second line, set smaller, for services that want the
          // claim and the qualifier at different weights.
          return '<div class="rfx-note"><span class="rfx-note-lead">' + esc(cav) +
            '</span>' + (S.priceCaveatSub
              ? '<span class="rfx-note-sub">' + esc(S.priceCaveatSub) + '</span>' : "") +
          '</div>';
        })() +
        savingsBlock +
        // The offer sits above their own answers, so it is read before the
        // receipt rather than after it. No discounted figure: the rep works
        // out what 20% off labour actually comes to.
        (function () {
          const p = promoFor(serviceId);
          if (!p) return "";
          // Only roofing has a choice to illustrate. One offer needs no tiles.
          const opts = (PROMO.optionsByService || {})[serviceId] || [];
          // Two choices use the wide artwork side by side; a single choice
          // keeps the square crop beside the text.
          const wide = (PROMO.barsByService || {})[serviceId] || [];
          const src = wide.length ? wide : opts;
          const tileHtml = src.map(function (o) {
            return '<span class="rfx-promo-opt' + (wide.length ? " is-wide" : "") + '">' +
              '<img src="' + o.img + '" alt="' + esc(o.alt) + '" ' +
              'loading="lazy" decoding="async"></span>';
          }).join('<span class="rfx-promo-or">or</span>');

          /* One tile sits to the right of the text, which balances a single
             image against a short paragraph. Two tiles go underneath, side by
             side: stacked beside the text they would make a column far taller
             than the words next to it. */
          if (!wide.length && opts.length === 1) {
            return '<div class="rfx-promo-note rfx-promo-aside">' +
              '<span class="rfx-promo-body">' +
                '<span class="rfx-promo-tag">' + esc(PROMO.label) + '</span>' +
                '<p>' + esc(p) + '</p>' +
              '</span>' +
              '<span class="rfx-promo-opts rfx-promo-opts-one">' + tileHtml + '</span>' +
            '</div>';
          }
          return '<div class="rfx-promo-note">' +
            '<span class="rfx-promo-tag">' + esc(PROMO.label) + '</span>' +
            '<p>' + esc(p) + '</p>' +
            (src.length ? '<div class="rfx-promo-opts' +
              (wide.length ? " rfx-promo-opts-wide" : "") + '">' + tileHtml + '</div>' : "") +
          '</div>';
        })() +
        // What they told us, after the offer. The numbers are what they came
        // for; this is the receipt.
        recap +
        '<p class="rfx-reassure">' + esc(S.reassurance || C.reassurance) + '</p>' +
        cta + againBtn + priorBlock + statRow +
        (function () {
          const line = S.trustLine || C.trustLine;
          const va = S.license   !== undefined ? S.license   : C.license;
          const wv = S.licenseWv !== undefined ? S.licenseWv : C.licenseWv;

          // 24701 to 26886 is West Virginia. Anything else in range is
          // Virginia. Outside both, or no ZIP at all, show both.
          const z = parseInt(String(state.place.zip || "").slice(0, 5), 10);
          let lic;
          if (!va && !wv) lic = "";
          else if (!wv) lic = va;
          else if (!va) lic = wv;
          else if (z >= 24701 && z <= 26886) lic = wv;
          else if (z >= 20101 && z <= 24658) lic = va;
          else lic = va + " · " + wv;

          return (line ? '<p class="rfx-fine rfx-center">' + esc(line) + '</p>' : "") +
                 (lic  ? '<p class="rfx-license">' + esc(lic) + '</p>' : "");
        })();
      revealPrice();
      wireCall();
      wireAgain();
      wireWorkings();
      wireDisclosure();
      wireHelp();
    }

    /* --- Nav --- */
    function goNext() {
      if (kind() === "contact") {
        if (!validate() || state.sent) return;
        nextBtn.disabled = true; nextBtn.textContent = "Checking…";
        emailGate(true).then((ok) => {
          if (!ok) {
            nextBtn.disabled = false; nextBtn.textContent = "See my price";
            return;
          }
          sendIt();
        });
        return;
      }
      if (state.index < totalSteps() - 1) {
        state.index++; render();
        window.scrollTo({ top: root.offsetTop - 20, behavior: "smooth" });
      }
    }

    function sendIt() {
      {
        state.result = S.price(state.answers);
        nextBtn.disabled = true; nextBtn.textContent = "Sending…";
        q(".rfx-form-err").hidden = true;
        // Send digits only. HubSpot keys on email, but the call centre dials
        // the phone, so it should arrive clean rather than as typed.
        const pc = checkPhone(state.contact.phone);
        if (pc.ok) state.contact.phoneDigits = pc.digits;
        submitLead().then(() => {
          state.sent = true;
          const mid = state.result ? Math.round((state.result.low + state.result.high) / 2) : 0;
          track("generate_lead", { service: serviceId, value: mid, currency: "USD" });
          if (SETTINGS.tracking.adsConversionId && typeof window.gtag === "function") {
            window.gtag("event", "conversion", {
              send_to: SETTINGS.tracking.adsConversionId, value: mid, currency: "USD" });
          }
          /* state.sent just changed, so screens() is now shorter. Jump to the
             end rather than incrementing into a stale index. */
          state.index = totalSteps() - 1; render();
          window.scrollTo({ top: root.offsetTop - 20, behavior: "smooth" });
        }).catch(() => {
          nextBtn.disabled = false; nextBtn.textContent = "See my price";
          const e = q(".rfx-form-err");
          e.hidden = false;
          e.textContent = "That did not go through. Check your connection and try again, " +
            "or call us at " + PHONE + " and we will take it down over the phone.";
        });
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
