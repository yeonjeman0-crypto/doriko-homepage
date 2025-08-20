import { Enquiry } from "@/store/enquiryStore";

export const generateInvoice = (enquiry: Enquiry, totalAmount: Number) => {
  const content = `<html>
  <head>
    <style type="text/css">
      .turbo-progress-bar {
        position: fixed;
        display: block;
        top: 0;
        left: 0;
        height: 3px;
        background: #0076ff;
        z-index: 9999;
        transition: width 300ms ease-out, opacity 150ms 150ms ease-in;
        transform: translate3d(0, 0, 0);
      }
    </style>
    <style id="st_globalStyles">
      /* MEDIA QUERIES */
      .anima-desktop-only {
        @media (max-width: 768px) {
          display: none !important;
        }
      }

      /* SCROLLBAR */

      [dark-scroll]::-webkit-scrollbar {
        width: 10px;
        height: 10px;
      }

      [dark-scroll]::-webkit-scrollbar-track-piece {
        background-color: #2b2b2b;
        border: 1px solid #1d1d1d;
      }

      [dark-scroll]::-webkit-scrollbar-thumb {
        height: 10px;
        background-color: #4d4d4d;
      }
      [dark-scroll]::-webkit-scrollbar-thumb:hover {
        background-color: #5a5a5a;
      }

      /* LOAD PROGRESS */

      .turbolinks-progress-bar {
        height: 3px;
        background-color: #ff6250;
      }

      /* GROUPING */

      [data-id].ui-selecting {
        box-shadow: inset 0 0 0 1px #4285f4 !important;
      }
      [data-id].ui-selected {
        box-shadow: inset 0 0 0 1px #4285f4 !important;
      }

      /* CURSOR */

      body[mode="comments"] * {
        cursor: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00LjkxNjQ4IDIzLjQxMDlDNS40OTE1MyAyMi45ODg3IDUuOTMxNzkgMjIuMzkzNSA2LjIzMjggMjEuNjQwN0M0Ljc5MDY5IDE5LjczODMgNCAxNy4zOTMzIDQgMTQuOTk3NUM0IDguOTM0MSA4LjkzMjgyIDQgMTUuMDAyMiA0QzIxLjA3MTcgNCAyNiA4LjkzOTE5IDI2IDE1LjAwMjVDMjYgMjEuMDY1OSAyMS4wNjcyIDI2IDE0Ljk5NzggMjZDMTIuOTg5NiAyNiAxMS4wMzUzIDI1LjQ1NTcgOS4zMjM2NyAyNC40MjMxQzguNDI5NjUgMjQuOTU3MiA3LjQxNDM0IDI1LjIyNjggNi4zMDAxOCAyNS4yMjY4QzUuOTU0MjYgMjUuMjI2OCA1LjU5OTM1IDI1LjIwMTQgNS4yNTM0MiAyNS4xNDU0QzQuOTAzIDI1LjA4OTUgNC42Mjg5NiAyNC44MDQ2IDQuNTUyNTggMjQuNDE4QzQuNDc2MjEgMjQuMDI2NCA0LjYxOTk3IDIzLjYyOTYgNC45MTY0OCAyMy40MTA5WiIgZmlsbD0iI0ZGNjI1MCIvPgo8L3N2Zz4K")
            0 24,
          auto !important;
      }

      body[mode="code"] [data-id]:not(.hidden) {
        cursor: default;
      }

      /* default node state */

      body[mode="code"] [data-id]:not(.hidden),
      body[mode="comments"] [data-id]:not(.hidden) {
        pointer-events: all;
      }

      /* is_image */

      body[mode="code"] [data-id].is_image [data-id],
      body[mode="comments"] [data-id].is_image [data-id] {
        pointer-events: none !important;
      }

      /* without a data-id or ignored */

      [data-id].ignore,
      body[mode="code"] *:not([data-id]) {
        pointer-events: none !important;
      }
      /* disable transforms for ignored elements */

      body[mode="code"] [data-id]:hover {
        transform: none !important;
      }

      /* ANIMA BUTTONS */
      .an-button {
        position: relative;
        height: 28px;
        padding: 0 20px;
        font-size: 14px;
        border-radius: 4px;
        font-weight: 500;
        display: inline-flex;
        align-items: center;
        vertical-align: middle;
        white-space: nowrap;
        transition-property: all;
        transition-duration: 100ms;
        appearance: none;
        cursor: pointer;
        user-select: none;
        transition: all 0.2s ease;
        border-width: 0;
      }

      .an-button > div {
        width: 100%;
      }

      .an-button.primary {
        background: #ff6250;
        color: #ffffff;
      }

      .an-button.primary:hover:not(:disabled) {
        background: #e2412e;
      }

      .an-button.secondary {
        background: transparent;
        border: 1px solid #ff6250;
        color: #ff6250;
      }

      .an-button.secondary:hover:not(:disabled) {
        color: #ffffff;
        background: #ff6250;
      }

      .an-button.rounded {
        border-radius: 100px;
      }

      .an-button:disabled {
        opacity: 0.5;
      }

      .an-button:disabled {
        cursor: default;
      }

      .an-button:active,
      .an-button:focus {
        outline: none;
      }
    </style>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
    />
    <link
      rel="shortcut icon"
      type="image/png"
      href="https://animaproject.s3.amazonaws.com/home/favicon.png"
    />
    <meta name="og:type" content="website" />
    <meta name="twitter:card" content="photo" />
    <script id="anima-load-script" src="load.js"></script>
    <script id="anima-hotspots-script" src="hotspots.js"></script>
    <style id="hotspots-styles">
      .hotspot {
        position: absolute;
        border: 1px solid #2a9fd8;
        background: rgba(0, 173, 255, 0.54);
        opacity: 0;
        z-index: -1;
        pointer-events: none;
      }
    </style>
    <script
      id="s_turbo"
      src="https://animaapp.s3.amazonaws.com/static/turbo.es2017-umd.js"
    ></script>
    <script id="anima-overrides-script" src="overrides.js"></script>
    <script src="https://animaapp.s3.amazonaws.com/js/timeline.js"></script>
    <script
      id="anime-js-script"
      src="https://cdn.jsdelivr.net/npm/animejs@3.1.0/lib/anime.min.js"
      integrity="sha256-98Q574VkbV+PkxXCKSgL6jVq9mrVbS7uCdA+vt0sLS8="
      crossorigin="anonymous"
    ></script>
    <script
      id="imgloaded-js-script"
      src="https://unpkg.com/imagesloaded@4/imagesloaded.pkgd.min.js"
    ></script>
    <style>
      @import url("https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css");

      @import url("https://fonts.googleapis.com/css?family=Inter:500,400,700,600");

      /* The following line is used to measure usage of this code. You can remove it if you want. */
      @import url("https://px.animaapp.com/679b81875c99ac7ae87beb0e.679b81885c99ac7ae87beb11.GgXB1zB.hch.png");

      .screen textarea:focus,
      .screen input:focus {
        outline: none;
      }

      .screen * {
        -webkit-font-smoothing: antialiased;
        box-sizing: border-box;
      }

      .screen div {
        -webkit-text-size-adjust: none;
      }

      .component-wrapper a {
        display: contents;
        pointer-events: auto;
        text-decoration: none;
      }

      .component-wrapper * {
        -webkit-font-smoothing: antialiased;
        box-sizing: border-box;
        pointer-events: none;
      }

      .component-wrapper a *,
      .component-wrapper input,
      .component-wrapper video,
      .component-wrapper iframe {
        pointer-events: auto;
      }

      .component-wrapper.not-ready,
      .component-wrapper.not-ready * {
        visibility: hidden !important;
      }

      .screen a {
        display: contents;
        text-decoration: none;
      }

      .full-width-a {
        width: 100%;
      }

      .full-height-a {
        height: 100%;
      }

      .container-center-vertical {
        align-items: center;
        display: flex;
        flex-direction: row;
        height: 100%;
        pointer-events: none;
      }

      .container-center-vertical > * {
        flex-shrink: 0;
        pointer-events: auto;
      }

      .container-center-horizontal {
        display: flex;
        flex-direction: row;
        justify-content: center;
        pointer-events: none;
        width: 100%;
      }

      .container-center-horizontal > * {
        flex-shrink: 0;
        pointer-events: auto;
      }

      .auto-animated div {
        --z-index: -1;
        opacity: 0;
        position: absolute;
      }

      .auto-animated input {
        --z-index: -1;
        opacity: 0;
        position: absolute;
      }

      .auto-animated .container-center-vertical,
      .auto-animated .container-center-horizontal {
        opacity: 1;
      }

      .overlay-base {
        display: none;
        height: 100%;
        opacity: 0;
        position: fixed;
        top: 0;
        width: 100%;
      }

      .overlay-base.animate-appear {
        align-items: center;
        animation: reveal 0.3s ease-in-out 1 normal forwards;
        display: flex;
        flex-direction: column;
        justify-content: center;
        opacity: 0;
      }

      .overlay-base.animate-disappear {
        animation: reveal 0.3s ease-in-out 1 reverse forwards;
        display: block;
        opacity: 1;
        pointer-events: none;
      }

      .overlay-base.animate-disappear * {
        pointer-events: none;
      }

      @keyframes reveal {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      .animate-nodelay {
        animation-delay: 0s;
      }

      .align-self-flex-start {
        align-self: flex-start;
      }

      .align-self-flex-end {
        align-self: flex-end;
      }

      .align-self-flex-center {
        align-self: flex-center;
      }

      .valign-text-middle {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .valign-text-bottom {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
      }

      input:focus {
        outline: none;
      }

      .listeners-active,
      .listeners-active * {
        pointer-events: auto;
      }

      .hidden,
      .hidden * {
        pointer-events: none;
        visibility: hidden;
      }

      .smart-layers-pointers,
      .smart-layers-pointers * {
        pointer-events: auto;
        visibility: visible;
      }

      .listeners-active-click,
      .listeners-active-click * {
        cursor: pointer;
      }

      * {
        box-sizing: border-box;
      }
      :root {
        --black: #000000;
        --gray0: #f9fafc;
        --gray100: #d7dae0;
        --gray600: #5e6470;
        --gray900: #191c21;
        --white: #ffffff;

        --font-size-l: 18px;
        --font-size-m: 10px;
        --font-size-s: 8px;
        --font-size-xl: 20px;

        --font-family-inter: "Inter", Helvetica;
      }
      .inter-medium-eerie-black-10px {
        color: var(--gray900);
        font-family: var(--font-family-inter);
        font-size: var(--font-size-m);
        font-style: normal;
        font-weight: 500;
      }

      .inter-normal-shuttle-gray-10px {
        color: var(--gray600);
        font-family: var(--font-family-inter);
        font-size: var(--font-size-m);
        font-style: normal;
        font-weight: 400;
      }

      .inter-semi-bold-eerie-black-10px {
        color: var(--gray900);
        font-family: var(--font-family-inter);
        font-size: var(--font-size-m);
        font-style: normal;
        font-weight: 600;
      }

      .inter-medium-shuttle-gray-10px {
        color: var(--gray600);
        font-family: var(--font-family-inter);
        font-size: var(--font-size-m);
        font-style: normal;
        font-weight: 500;
      }

      .inter-semi-bold-shuttle-gray-8px {
        color: var(--gray600);
        font-family: var(--font-family-inter);
        font-size: var(--font-size-s);
        font-style: normal;
        font-weight: 600;
      }

      :root {
      }

      /* screen - invoice-1 */

      .invoice-1 {
        background-color: var(--gray0);
        height: 842px;
        left: 0px;
        overflow: hidden;
        position: relative;
        top: 0px;
        width: 595px;
      }

      .invoice-1 .frame-3621-Byw8Tx {
        align-items: flex-end;
        background-color: transparent;
        display: inline-flex;
        flex-direction: column;
        gap: 2px;
        left: 435px;
        position: absolute;
        top: 50px;
      }

      .invoice-1 .business-address-city-state-in-000-000-GI5I2R {
        background-color: transparent;
        letter-spacing: 0px;
        line-height: 14px;
        margin-top: -1px;
        position: relative;
        text-align: right;
        width: fit-content;
      }

      .invoice-1 .tax-id-00-xxxxx1234-x0-xx-GI5I2R {
        background-color: transparent;
        letter-spacing: 0px;
        line-height: 14px;
        position: relative;
        text-align: right;
        white-space: nowrap;
        width: fit-content;
      }

      .invoice-1 .terms-conditions-Byw8Tx {
        background-color: transparent;
        height: auto;
        left: 32px;
        letter-spacing: 0px;
        line-height: 14px;
        position: absolute;
        text-align: left;
        top: 785px;
        white-space: nowrap;
        width: auto;
      }

      .invoice-1 .frame-3608-Byw8Tx {
        background-color: var(--white);
        border: 0.5px solid;
        border-color: var(--gray100);
        border-radius: 12px;
        height: 645px;
        left: 16px;
        position: absolute;
        top: 118px;
        width: 564px;
      }

      .invoice-1 .frame-3614-4uxOzV {
        align-items: flex-end;
        background-color: transparent;
        display: inline-flex;
        flex-direction: column;
        gap: 2px;
        left: 442px;
        position: absolute;
        top: 20px;
      }

      .invoice-1 .invoice-of-usd-XnhxFE {
        background-color: transparent;
        letter-spacing: 0px;
        line-height: 14px;
        margin-top: -1px;
        position: relative;
        text-align: right;
        white-space: nowrap;
        width: fit-content;
      }

      .invoice-1 .x495000-XnhxFE {
        color: #2563eb;
        font-size: var(--font-size-xl);
        line-height: 28px;
        position: relative;
        width: fit-content;
      }

      .invoice-1 .frame-3611-4uxOzV {
        align-items: flex-start;
        background-color: transparent;
        display: inline-flex;
        flex-direction: column;
        gap: 4px;
        left: 244px;
        position: absolute;
        top: 20px;
      }

      .invoice-1 .invoice-number-HaeCIu {
        background-color: transparent;
        letter-spacing: 0px;
        line-height: 14px;
        margin-top: -1px;
        position: relative;
        text-align: left;
        white-space: nowrap;
        width: fit-content;
      }

      .invoice-1 .ab2324-01-HaeCIu {
        background-color: transparent;
        letter-spacing: 0px;
        line-height: 14px;
        position: relative;
        text-align: left;
        white-space: nowrap;
        width: fit-content;
      }

      .invoice-1 .frame-3610-4uxOzV {
        align-items: flex-start;
        background-color: transparent;
        display: inline-flex;
        flex-direction: column;
        gap: 4px;
        left: 244px;
        position: absolute;
        top: 76px;
      }

      .invoice-1 .reference-wecUCq {
        background-color: transparent;
        letter-spacing: 0px;
        line-height: 14px;
        margin-top: -1px;
        position: relative;
        text-align: left;
        white-space: nowrap;
        width: fit-content;
      }

      .invoice-1 .inv-057-wecUCq {
        background-color: transparent;
        letter-spacing: 0px;
        line-height: 14px;
        position: relative;
        text-align: left;
        width: 41px;
      }

      .invoice-1 .frame-3609-4uxOzV {
        align-items: flex-start;
        background-color: transparent;
        display: inline-flex;
        flex-direction: column;
        gap: 4px;
        left: 244px;
        position: absolute;
        top: 132px;
      }

      .invoice-1 .invoice-date-BJpjk5 {
        background-color: transparent;
        letter-spacing: 0px;
        line-height: 14px;
        margin-top: -1px;
        position: relative;
        text-align: left;
        white-space: nowrap;
        width: fit-content;
      }

      .invoice-1 .x01-aug-2023-BJpjk5 {
        background-color: transparent;
        letter-spacing: 0px;
        line-height: 14px;
        position: relative;
        text-align: left;
        white-space: nowrap;
        width: fit-content;
      }

      .invoice-1 .frame-3615-4uxOzV {
        align-items: flex-start;
        background-color: transparent;
        display: inline-flex;
        flex-direction: column;
        gap: 4px;
        left: 16px;
        position: absolute;
        top: 132px;
      }

      .invoice-1 .subject-u067QP {
        background-color: transparent;
        letter-spacing: 0px;
        line-height: 14px;
        margin-top: -1px;
        position: relative;
        text-align: left;
        white-space: nowrap;
        width: fit-content;
      }

      .invoice-1 .design-system-u067QP {
        background-color: transparent;
        letter-spacing: 0px;
        line-height: 14px;
        position: relative;
        text-align: left;
        white-space: nowrap;
        width: fit-content;
      }

      .invoice-1 .frame-3612-4uxOzV {
        align-items: flex-end;
        background-color: transparent;
        display: inline-flex;
        flex-direction: column;
        gap: 4px;
        left: 483px;
        position: absolute;
        top: 132px;
      }

      .invoice-1 .due-date-jbNErT {
        background-color: transparent;
        letter-spacing: 0px;
        line-height: 14px;
        margin-top: -1px;
        position: relative;
        text-align: right;
        white-space: nowrap;
        width: fit-content;
      }

      .invoice-1 .x15-aug-2023-jbNErT {
        background-color: transparent;
        letter-spacing: 0px;
        line-height: 14px;
        position: relative;
        text-align: right;
        white-space: nowrap;
        width: fit-content;
      }

      .invoice-1 .frame-3638-4uxOzV {
        align-items: flex-start;
        background-color: transparent;
        display: inline-flex;
        flex-direction: column;
        gap: 4px;
        left: 16px;
        position: absolute;
        top: 20px;
      }

      .invoice-1 .billed-to-DgYWeh {
        background-color: transparent;
        letter-spacing: 0px;
        line-height: 14px;
        margin-top: -1px;
        position: relative;
        text-align: left;
        white-space: nowrap;
        width: fit-content;
      }

      .invoice-1 .frame-3613-DgYWeh {
        align-items: flex-start;
        background-color: transparent;
        display: inline-flex;
        flex: 0 0 auto;
        flex-direction: column;
        gap: 2px;
        position: relative;
      }

      .invoice-1 .company-name-ELHxPq {
        background-color: transparent;
        letter-spacing: 0px;
        line-height: 14px;
        margin-top: -1px;
        position: relative;
        text-align: left;
        white-space: nowrap;
        width: fit-content;
      }

      .invoice-1 .company-address-city-country-00000-ELHxPq {
        background-color: transparent;
        letter-spacing: 0px;
        line-height: 14px;
        position: relative;
        text-align: left;
        width: fit-content;
      }

      .invoice-1 .x0-000-123-4567-ELHxPq {
        background-color: transparent;
        letter-spacing: 0px;
        line-height: 14px;
        position: relative;
        text-align: left;
        white-space: nowrap;
        width: fit-content;
      }

      .invoice-1 .item-detail-4uxOzV {
        background-color: transparent;
        height: auto;
        left: 16px;
        letter-spacing: 0.32px;
        line-height: 12px;
        position: absolute;
        text-align: left;
        top: 196px;
        white-space: nowrap;
        width: auto;
      }

      .invoice-1 .vector-144-4uxOzV {
        background-color: transparent;
        height: 1px;
        left: 16px;
        position: absolute;
        top: 188px;
        width: 531px;
      }

      .invoice-1 .vector-145-4uxOzV {
        background-color: transparent;
        height: 1px;
        left: 16px;
        position: absolute;
        top: 216px;
        width: 531px;
      }

      .invoice-1 .vector-146-4uxOzV {
        background-color: transparent;
        height: 1px;
        left: 16px;
        position: absolute;
        top: 312px;
        width: 531px;
      }

      .invoice-1 .vector-147-4uxOzV {
        background-color: transparent;
        height: 1px;
        left: 307px;
        position: absolute;
        top: 376px;
        width: 240px;
      }

      .invoice-1 .qty-4uxOzV {
        background-color: transparent;
        height: auto;
        left: 307px;
        letter-spacing: 0.32px;
        line-height: 12px;
        position: absolute;
        text-align: left;
        top: 196px;
        white-space: nowrap;
        width: auto;
      }

      .invoice-1 .rate-4uxOzV {
        background-color: transparent;
        height: auto;
        left: 347px;
        letter-spacing: 0.32px;
        line-height: 12px;
        position: absolute;
        text-align: right;
        top: 196px;
        width: 80px;
      }

      .invoice-1 .amount-4uxOzV {
        background-color: transparent;
        height: auto;
        left: 447px;
        letter-spacing: 0.32px;
        line-height: 12px;
        position: absolute;
        text-align: right;
        top: 196px;
        width: 100px;
      }

      .invoice-1 .item-name-4uxOzV {
        top: 228px;
      }

      .invoice-1 .item-name-Red83O {
        top: 270px;
      }

      .invoice-1 .item-description-4uxOzV {
        top: 244px;
      }

      .invoice-1 .item-description-Red83O {
        top: 286px;
      }

      .invoice-1 .x1-4uxOzV {
        top: 228px;
      }

      .invoice-1 .x1-Red83O {
        top: 272px;
      }

      .invoice-1 .x300000-4uxOzV {
        left: 377px;
      }

      .invoice-1 .x150000-4uxOzV {
        left: 379px;
      }

      .invoice-1 .x300000-Red83O {
        left: 497px;
      }

      .invoice-1 .x150000-Red83O {
        left: 499px;
      }

      .invoice-1 .x450000-4uxOzV {
        background-color: transparent;
        height: auto;
        left: 497px;
        letter-spacing: 0px;
        line-height: 14px;
        position: absolute;
        text-align: right;
        top: 324px;
        white-space: nowrap;
        width: auto;
      }

      .invoice-1 .x495000-4uxOzV {
        color: var(--gray900);
        font-size: var(--font-size-m);
        height: auto;
        left: 494px;
        line-height: 14px;
        position: absolute;
        top: 388px;
        width: auto;
      }

      .invoice-1 .x45000-4uxOzV {
        background-color: transparent;
        height: auto;
        left: 506px;
        letter-spacing: 0px;
        line-height: 14px;
        position: absolute;
        text-align: right;
        top: 350px;
        white-space: nowrap;
        width: auto;
      }

      .invoice-1 .subtotal-4uxOzV {
        background-color: transparent;
        height: auto;
        left: 307px;
        letter-spacing: 0px;
        line-height: 14px;
        position: absolute;
        text-align: left;
        top: 324px;
        white-space: nowrap;
        width: auto;
      }

      .invoice-1 .total-4uxOzV {
        background-color: transparent;
        color: var(--gray900);
        font-family: var(--font-family-inter);
        font-size: var(--font-size-m);
        font-style: normal;
        font-weight: 700;
        height: auto;
        left: 307px;
        letter-spacing: 0px;
        line-height: 14px;
        position: absolute;
        text-align: left;
        top: 388px;
        white-space: nowrap;
        width: auto;
      }

      .invoice-1 .tax-10-4uxOzV {
        background-color: transparent;
        height: auto;
        left: 307px;
        letter-spacing: 0px;
        line-height: 14px;
        position: absolute;
        text-align: left;
        top: 350px;
        white-space: nowrap;
        width: auto;
      }

      .invoice-1 .thanks-for-the-business-4uxOzV {
        background-color: transparent;
        height: auto;
        left: 16px;
        letter-spacing: 0px;
        line-height: 14px;
        position: absolute;
        text-align: left;
        top: 610px;
        white-space: nowrap;
        width: auto;
      }

      .invoice-1 .please-pay-within-15-Byw8Tx {
        background-color: transparent;
        color: var(--gray900);
        font-family: var(--font-family-inter);
        font-size: var(--font-size-m);
        font-style: normal;
        font-weight: 400;
        height: auto;
        left: 32px;
        letter-spacing: 0px;
        line-height: 14px;
        position: absolute;
        text-align: left;
        top: 803px;
        white-space: nowrap;
        width: auto;
      }

      .invoice-1 .frame-3639-Byw8Tx {
        align-items: flex-start;
        background-color: transparent;
        display: inline-flex;
        flex-direction: column;
        gap: 2px;
        left: 100px;
        position: absolute;
        top: 24px;
      }

      .invoice-1 .shiptech-M35ufG {
        background-color: transparent;
        color: #2563eb;
        font-family: var(--font-family-inter);
        font-size: var(--font-size-l);
        font-style: normal;
        font-weight: 600;
        letter-spacing: 0px;
        line-height: normal;
        margin-top: -1px;
        position: relative;
        text-align: left;
        width: 151px;
      }

      .invoice-1 .wwwwebsitecom-M35ufG {
        background-color: transparent;
        letter-spacing: 0px;
        line-height: 14px;
        position: relative;
        text-align: left;
        white-space: nowrap;
        width: fit-content;
      }

      .invoice-1 .helloemailcom-M35ufG {
        background-color: transparent;
        letter-spacing: 0px;
        line-height: 14px;
        position: relative;
        text-align: left;
        white-space: nowrap;
        width: fit-content;
      }

      .invoice-1 .x91-00000-00000-M35ufG {
        background-color: transparent;
        letter-spacing: 0px;
        line-height: 14px;
        position: relative;
        text-align: left;
        white-space: nowrap;
        width: fit-content;
      }

      .invoice-1 .frame-Byw8Tx {
        background-color: transparent;
        height: 52px;
        left: 32px;
        position: absolute;
        top: 23px;
        width: 52px;
      }

      .invoice-1 .item-description {
        background-color: transparent;
        height: auto;
        left: 16px;
        letter-spacing: 0px;
        line-height: 14px;
        position: absolute;
        text-align: left;
        white-space: nowrap;
        width: auto;
      }

      .invoice-1 .item-name {
        background-color: transparent;
        height: auto;
        left: 16px;
        letter-spacing: 0px;
        line-height: 14px;
        position: absolute;
        text-align: left;
        white-space: nowrap;
        width: auto;
      }

      .invoice-1 .x1 {
        background-color: transparent;
        height: auto;
        left: 307px;
        letter-spacing: 0px;
        line-height: 14px;
        position: absolute;
        text-align: left;
        white-space: nowrap;
        width: auto;
      }

      .invoice-1 .x150000 {
        background-color: transparent;
        height: auto;
        letter-spacing: 0px;
        line-height: 14px;
        position: absolute;
        text-align: right;
        top: 272px;
        white-space: nowrap;
        width: auto;
      }

      .invoice-1 .x300000 {
        background-color: transparent;
        height: auto;
        letter-spacing: 0px;
        line-height: 14px;
        position: absolute;
        text-align: right;
        top: 228px;
        white-space: nowrap;
        width: auto;
      }

      .invoice-1 .x495000 {
        background-color: transparent;
        font-family: var(--font-family-inter);
        font-style: normal;
        font-weight: 700;
        letter-spacing: 0px;
        text-align: right;
        white-space: nowrap;
      }
    </style>
    <style id="action-links-styles">
      @import url("https://fonts.googleapis.com/css2?family=Mulish&display=swap");

      #anima-interface {
        transition: all 0.5s ease-in-out;
      }

      #anima-watermark {
        transition: all 0.5s ease-in-out;
        display: none;
      }
      #anima-watermark-link {
        position: fixed;
        bottom: 20px;
        height: 30px;
        border-radius: 1000px;
        background: #3b3b3b;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        user-select: none;
        transition: width 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        text-decoration: none;
        color: #fff;
        padding: 8px 16px 8px 11px;
        font-family: Mulish, sans-serif;
        font-size: 12px;
      }
      #anima-watermark-link .text {
        margin-left: 6px;
      }

      .omniview-anima-action-links .link {
        height: 30px;
        width: 30px;
        border-radius: 1000px;
        background: #3b3b3b;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        user-select: none;
        transition: width 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        text-decoration: none;
        color: #fff;
      }
      .omniview-anima-action-links #comment-link .text,
      .omniview-anima-action-links #code-link .text {
        display: none;
        font-size: 12px;
        margin-right: 5px;
      }
      .omniview-anima-action-links #comment-link:hover,
      .omniview-anima-action-links #code-link:hover {
        width: 105px;
      }
      .omniview-anima-action-links #comment-link.pop-active,
      .omniview-anima-action-links #code-link.pop-active {
        width: 105px;
        background: #ff6250;
      }
      .omniview-anima-action-links #comment-link.pop-active .text,
      .omniview-anima-action-links #code-link.pop-active .text {
        display: block;
      }
      .omniview-anima-action-links #comment-link:hover .text,
      .omniview-anima-action-links #code-link:hover .text {
        display: block;
      }

      .link.navigation {
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
        width: auto;
        height: 32px;
        color: #fff;
        font-size: 12px;
        cursor: default;
        padding: 0 5px;
      }
      .link.navigation .icon {
        margin: 0 6px;
        fill: none;
        stroke: currentColor;
        cursor: pointer;
      }
      .link.navigation .icon.disabled {
        opacity: 0.5;
        cursor: default;
      }

      .link.navigation .home-icon {
        margin-left: 6px;
        fill: currentColor;
        stroke: currentColor;
        cursor: pointer;
      }

      .omniview-anima-action-links .restart {
        height: 30px;
        padding: 0 12px;
        background: #3b3b3b;
        border-radius: 1000px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: #f1f1f1;
        font-size: 12px;
      }

      .omniview-anima-action-links {
        display: flex;
        align-items: center;
        position: fixed;
        bottom: 20px;
        right: 20px;
        font-family: Mulish, sans-serif;
        transition: all 0.5s ease-in-out;
        opacity: 1;
      }

      .omniview-anima-action-links > * + * {
        margin-right: 0;
        margin-left: 10px;
      }

      .idle {
        opacity: 0;
        pointer-events: none;
      }

      #popoverOpener {
        position: absolute;
        left: 50%;
        margin-left: -10vw;
        text-align: center;
        top: 45vh;
        width: 20vw;
      }

      .popover {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1060;
        display: none;
        font-family: "sans-serif";
        font-size: 14px;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
      }

      .popover.top {
        margin-top: -12px;
      }

      .popover.right {
        margin-left: 10px;
      }

      .popover.bottom {
        margin-top: 10px;
      }

      .popover.left {
        margin-left: -10px;
      }

      .popover-title {
        padding: 8px 14px;
        margin: 0;
        font-size: 14px;
        background-color: #f7f7f7;
        border-bottom: 1px solid #ebebeb;
        border-radius: 5px 5px 0 0;
      }

      .popover-content {
        height: 100%;
        width: 100%;
        display: flex;
        overflow: hidden;
        font-family: Mulish, sans-serif;
      }

      .popover > .arrow,
      .popover > .arrow:after {
        position: absolute;
        display: block;
        width: 0;
        height: 0;
        border-color: transparent;
        border-style: solid;
      }

      .popover > .arrow {
        border-width: 11px;
      }

      .popover > .arrow:after {
        content: "";
        border-width: 10px;
      }

      .popover.top > .arrow {
        bottom: -11px;
        left: 50%;
        margin-left: -11px;
        border-top-color: #999;
        border-top-color: rgba(0, 0, 0, 0.25);
        border-bottom-width: 0;
      }

      .popover.top > .arrow:after {
        bottom: 1px;
        margin-left: -10px;
        content: " ";
        border-top-color: #fff;
        border-bottom-width: 0;
      }

      .popover.right > .arrow {
        top: 50%;
        left: -11px;
        margin-top: -11px;
        border-right-color: #999;
        border-right-color: rgba(0, 0, 0, 0.25);
        border-left-width: 0;
      }

      .popover.right > .arrow:after {
        bottom: -10px;
        left: 1px;
        content: " ";
        border-right-color: #fff;
        border-left-width: 0;
      }

      .popover.bottom > .arrow {
        top: -11px;
        left: 50%;
        margin-left: -11px;
        border-top-width: 0;
        border-bottom-color: #999;
        border-bottom-color: rgba(0, 0, 0, 0.25);
      }

      .popover.bottom > .arrow:after {
        top: 1px;
        margin-left: -10px;
        content: " ";
        border-top-width: 0;
        border-bottom-color: #fff;
      }

      .popover.left > .arrow {
        top: 50%;
        right: -11px;
        margin-top: -11px;
        border-right-width: 0;
        border-left-color: #999;
        border-left-color: rgba(0, 0, 0, 0.25);
      }

      .popover.left > .arrow:after {
        right: 1px;
        bottom: -10px;
        content: " ";
        border-right-width: 0;
        border-left-color: #fff;
      }

      #anima-comment-popover,
      #anima-code-popover {
        background: #333333;
        color: #fff;
      }

      #anima-comment-popover.top > .arrow,
      #anima-comment-popover.top > .arrow:after,
      #anima-code-popover.top > .arrow:after,
      #anima-code-popover.top > .arrow {
        border-top-color: #333;
      }

      #anima-comment-popover .btn,
      #anima-code-popover .btn {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 6px 20px;
        background: #ff6250;
        color: #fff;
        border-radius: 100px;
        width: max-content;
        text-decoration: none;
      }

      @media screen and (max-width: 550px) {
        #anima-watermark-link {
          padding: 6px !important;
        }
        #anima-watermark-link .text {
          display: none !important;
        }
      }
    </style>
  </head>
  <body
    style="margin: 0px; background: rgb(249, 250, 252); overflow-x: hidden"
    dark-scroll=""
  >
    <input type="hidden" id="anPageName" name="page" value="invoice-1" />
    <div class="container-center-horizontal">
      <div class="invoice-1 screen" data-id="713:198">
        <div class="frame-3621-Byw8Tx" data-id="713:199">
          <p
            class="business-address-city-state-in-000-000-GI5I2R inter-normal-shuttle-gray-10px"
            data-id="713:200"
          >
            Business address<br />City, State, IN - 000 000
          </p>
          <div
            class="tax-id-00-xxxxx1234-x0-xx-GI5I2R inter-normal-shuttle-gray-10px"
            data-id="713:201"
          >
            TAX ID 00XXXXX1234X0XX
          </div>
        </div>
        <div
          class="terms-conditions-Byw8Tx inter-medium-shuttle-gray-10px"
          data-id="713:202"
        >
          Terms &amp; Conditions
        </div>
        <div class="frame-3608-Byw8Tx" data-id="713:203">
          <div class="frame-3614-4uxOzV" data-id="713:204">
            <div
              class="invoice-of-usd-XnhxFE inter-medium-shuttle-gray-10px"
              data-id="713:205"
            >
              Invoice of (USD)
            </div>
            <div class="x495000-XnhxFE x495000" data-id="713:206">
              $${totalAmount}
            </div>
          </div>
          <div class="frame-3611-4uxOzV" data-id="713:207">
            <div
              class="invoice-number-HaeCIu inter-medium-shuttle-gray-10px"
              data-id="713:208"
            >
              Invoice number
            </div>
            <div
              class="ab2324-01-HaeCIu inter-semi-bold-eerie-black-10px"
              data-id="713:209"
            >
              #AB2324-01
            </div>
          </div>
          <div class="frame-3610-4uxOzV" data-id="713:210">
            <div
              class="reference-wecUCq inter-medium-shuttle-gray-10px"
              data-id="713:211"
            >
              Reference
            </div>
            <div
              class="inv-057-wecUCq inter-semi-bold-eerie-black-10px"
              data-id="713:212"
            >
              INV-057
            </div>
          </div>
          <div class="frame-3609-4uxOzV" data-id="713:213">
            <div
              class="invoice-date-BJpjk5 inter-medium-shuttle-gray-10px"
              data-id="713:214"
            >
              Invoice date
            </div>
            <div
              class="x01-aug-2023-BJpjk5 inter-semi-bold-eerie-black-10px"
              data-id="713:215"
            >
              01 Aug, 2023
            </div>
          </div>
          <div class="frame-3615-4uxOzV" data-id="713:216">
            <div
              class="subject-u067QP inter-medium-shuttle-gray-10px"
              data-id="713:217"
            >
              Subject
            </div>
            <div
              class="design-system-u067QP inter-semi-bold-eerie-black-10px"
              data-id="713:218"
            >
              Design System
            </div>
          </div>
          <div class="frame-3612-4uxOzV" data-id="713:219">
            <div
              class="due-date-jbNErT inter-medium-shuttle-gray-10px"
              data-id="713:220"
            >
              Due date
            </div>
            <div
              class="x15-aug-2023-jbNErT inter-semi-bold-eerie-black-10px"
              data-id="713:221"
            >
              15 Aug, 2023
            </div>
          </div>
          <div class="frame-3638-4uxOzV" data-id="713:222">
            <div
              class="billed-to-DgYWeh inter-medium-shuttle-gray-10px"
              data-id="713:223"
            >
              Billed to
            </div>
            <div class="frame-3613-DgYWeh" data-id="713:224">
              <div
                class="company-name-ELHxPq inter-semi-bold-eerie-black-10px"
                data-id="713:225"
              >
                Company Name
              </div>
              <p
                class="company-address-city-country-00000-ELHxPq inter-normal-shuttle-gray-10px"
                data-id="713:226"
              >
                Company address<br />City, Country - 00000
              </p>
              <div
                class="x0-000-123-4567-ELHxPq inter-normal-shuttle-gray-10px"
                data-id="713:227"
              >
                +0 (000) 123-4567
              </div>
            </div>
          </div>
          <div
            class="item-detail-4uxOzV inter-semi-bold-shuttle-gray-8px"
            data-id="713:228"
          >
            ITEM DETAIL
          </div>
          <img
            class="vector-144-4uxOzV"
            data-id="713:229"
            src="https://cdn.animaapp.com/projects/679b81895c99ac7ae87beb13/releases/679b81f40ed334446311c82a/img/vector-144-1.svg"
            anima-src="https://cdn.animaapp.com/projects/679b81895c99ac7ae87beb13/releases/679b81f40ed334446311c82a/img/vector-144-1.svg"
            alt="Vector 144"
          /><img
            class="vector-145-4uxOzV"
            data-id="713:230"
            src="https://cdn.animaapp.com/projects/679b81895c99ac7ae87beb13/releases/679b81f40ed334446311c82a/img/vector-144-1.svg"
            anima-src="https://cdn.animaapp.com/projects/679b81895c99ac7ae87beb13/releases/679b81f40ed334446311c82a/img/vector-144-1.svg"
            alt="Vector 145"
          /><img
            class="vector-146-4uxOzV"
            data-id="713:231"
            src="https://cdn.animaapp.com/projects/679b81895c99ac7ae87beb13/releases/679b81f40ed334446311c82a/img/vector-144-1.svg"
            anima-src="https://cdn.animaapp.com/projects/679b81895c99ac7ae87beb13/releases/679b81f40ed334446311c82a/img/vector-144-1.svg"
            alt="Vector 146"
          /><img
            class="vector-147-4uxOzV"
            data-id="713:232"
            src="https://cdn.animaapp.com/projects/679b81895c99ac7ae87beb13/releases/679b81f40ed334446311c82a/img/vector-147-1.svg"
            anima-src="https://cdn.animaapp.com/projects/679b81895c99ac7ae87beb13/releases/679b81f40ed334446311c82a/img/vector-147-1.svg"
            alt="Vector 147"
          />
          <div
            class="qty-4uxOzV inter-semi-bold-shuttle-gray-8px"
            data-id="713:233"
          >
            QTY
          </div>
          <div
            class="rate-4uxOzV inter-semi-bold-shuttle-gray-8px"
            data-id="713:234"
          >
            RATE
          </div>
          <div
            class="amount-4uxOzV inter-semi-bold-shuttle-gray-8px"
            data-id="713:235"
          >
            AMOUNT
          </div>
          <div
            class="item-name-4uxOzV item-name inter-semi-bold-eerie-black-10px"
            data-id="713:236"
          >
            Item Name
          </div>
          <div
            class="item-name-Red83O item-name inter-semi-bold-eerie-black-10px"
            data-id="713:237"
          >
            Item Name
          </div>
          <div
            class="item-description-4uxOzV item-description inter-normal-shuttle-gray-10px"
            data-id="713:238"
          >
            Item description
          </div>
          <div
            class="item-description-Red83O item-description inter-normal-shuttle-gray-10px"
            data-id="713:239"
          >
            Item description
          </div>
          <div
            class="x1-4uxOzV x1 inter-medium-eerie-black-10px"
            data-id="713:240"
          >
            1
          </div>
          <div
            class="x1-Red83O x1 inter-medium-eerie-black-10px"
            data-id="713:241"
          >
            1
          </div>
          <div
            class="x300000-4uxOzV x300000 inter-medium-eerie-black-10px"
            data-id="713:242"
          >
            $3,000.00
          </div>
          <div
            class="x150000-4uxOzV x150000 inter-medium-eerie-black-10px"
            data-id="713:243"
          >
            $1,500.00
          </div>
          <div
            class="x300000-Red83O x300000 inter-medium-eerie-black-10px"
            data-id="713:244"
          >
            $3,000.00
          </div>
          <div
            class="x150000-Red83O x150000 inter-medium-eerie-black-10px"
            data-id="713:245"
          >
            $1,500.00
          </div>
          <div
            class="x450000-4uxOzV inter-medium-eerie-black-10px"
            data-id="713:246"
          >
            $4,500.00
          </div>
          <div class="x495000-4uxOzV x495000" data-id="713:247">$4,950.00</div>
          <div
            class="x45000-4uxOzV inter-medium-eerie-black-10px"
            data-id="713:248"
          >
            $450.00
          </div>
          <div
            class="subtotal-4uxOzV inter-medium-eerie-black-10px"
            data-id="713:249"
          >
            Subtotal
          </div>
          <div class="total-4uxOzV" data-id="713:250">Total</div>
          <div
            class="tax-10-4uxOzV inter-medium-eerie-black-10px"
            data-id="713:251"
          >
            Tax (10%)
          </div>
          <div
            class="thanks-for-the-business-4uxOzV inter-semi-bold-eerie-black-10px"
            data-id="713:252"
          >
            Thanks for the business.
          </div>
        </div>
        <p class="please-pay-within-15-Byw8Tx" data-id="713:253">
          Please pay within 15 days of receiving this invoice.
        </p>
        <div class="frame-3639-Byw8Tx" data-id="713:254">
          <div class="shiptech-M35ufG" data-id="713:255">Shiptech</div>
          <div
            class="wwwwebsitecom-M35ufG inter-normal-shuttle-gray-10px"
            data-id="713:256"
          >
            www.website.com
          </div>
          <div
            class="helloemailcom-M35ufG inter-normal-shuttle-gray-10px"
            data-id="713:257"
          >
            hello@email.com
          </div>
          <div
            class="x91-00000-00000-M35ufG inter-normal-shuttle-gray-10px"
            data-id="713:258"
          >
            +91 00000 00000
          </div>
        </div>
        <img
          class="frame-Byw8Tx"
          data-id="803:2"
          src="https://cdn.animaapp.com/projects/679b81895c99ac7ae87beb13/releases/679b81f40ed334446311c82a/img/frame-1.svg"
          anima-src="https://cdn.animaapp.com/projects/679b81895c99ac7ae87beb13/releases/679b81f40ed334446311c82a/img/frame-1.svg"
          alt="Frame"
        />
      </div>
    </div>
    <script src="launchpad-js/launchpad-banner.js" async=""></script>
    <script
      defer=""
      src="https://animaapp.s3.amazonaws.com/static/restart-btn.min.js"
    ></script>
    <div id="anima-interface" data-turbo-permanent="true" class="idle">
      <!---->
      <div
        id="anima-comment-popover"
        class="popover top"
        role="tooltip"
        style="left: -205px; top: -220px"
      >
        <div class="arrow" style="margin-left: 128px"></div>
        <div class="popover-content" style="align-items: center">
          <div
            style="
              display: flex;
              flex-direction: column;
              height: 100%;
              padding: 20px;
            "
          >
            <h3
              style="
                font-size: 18px;
                margin-bottom: 10px;
                font-weight: 500;
                line-height: 26px;
                font-family: Roslindale;
              "
            >
              Leave feedback and collaborate
            </h3>
            <p
              style="
                font-size: 12px;
                margin-bottom: 20px;
                font-weight: 400;
                line-height: 20px;
              "
            >
              Login to your account to leave comments. Don't have an account?
              Sign up for free!
            </p>
            <a
              target="_blank"
              rel="noopener noreferrer"
              class="btn"
              href="https://projects.animaapp.com/p/undefined/s/undefined?mode=comments&amp;utm_campaign=add-comment&amp;utm_medium=add-comment&amp;utm_source=animaapp.io"
              >Add comment</a
            >
          </div>

          <div
            style="
              display: flex;
              align-items: center;
              justify-content: center;
              padding-right: 20px;
            "
          >
            <img
              src="https://animaapp.s3.amazonaws.com/static/comment-illustration.svg"
            />
          </div>
        </div>
      </div>
      <div
        id="anima-code-popover"
        class="popover top"
        role="tooltip"
        style="left: -205px; top: -220px"
      >
        <div class="arrow" style="margin-left: 168px"></div>
        <div class="popover-content" style="align-items: center">
          <div
            style="
              display: flex;
              flex-direction: column;
              height: 100%;
              padding: 20px;
            "
          >
            <h3
              style="
                font-size: 18px;
                margin-bottom: 10px;
                font-weight: 500;
                line-height: 26px;
                font-family: Roslindale;
              "
            >
              Get clean code you’ll love with Anima
            </h3>
            <p
              style="
                font-size: 12px;
                margin-bottom: 20px;
                font-weight: 400;
                line-height: 20px;
              "
            >
              Login and easily export HTML, React or Vue of this prototype.
              Don’t have an account? Sign up for free!
            </p>
            <a
              target="_blank"
              rel="noopener noreferrer"
              class="btn"
              href="https://projects.animaapp.com/p/undefined/s/undefined?mode=code&amp;utm_campaign=get-code&amp;utm_medium=get-code&amp;utm_source=animaapp.io"
            >
              Get code
            </a>
          </div>

          <img
            src="https://animaapp.s3.amazonaws.com/static/code-illustration.svg"
          />
        </div>
      </div>
      <div class="omniview-anima-action-links" id="actions-wrap">
        <div class="omniview-anima-action-links">
          <div id="page-nav" class="link navigation" style="display: none">
            <svg
              id="homepage-icon"
              class="home-icon"
              width="24"
              height="24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.151 11a.25.25 0 01-.167-.436l4.349-3.913a.25.25 0 01.334 0l4.349 3.913a.25.25 0 01-.167.436H8.15zM16 12H9v4a1 1 0 001 1h5a1 1 0 001-1v-4z"
                fill="#fff"
              ></path>
            </svg>

            <svg
              class="icon"
              id="arrow-left"
              width="24"
              height="24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18l-6-6 6-6"
                stroke="#fff"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>

            <span id="page-num"></span>

            <svg
              class="icon"
              id="arrow-right"
              width="24"
              height="24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 6l6 6-6 6"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </div>

          <a
            class="link"
            id="comment-link"
            target="_blank"
            style="display: none"
          >
            <span class="text">Comment</span>
            <svg
              width="20"
              height="20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4.301 15.137a.551.551 0 01.199-.55c.314-.23.554-.554.718-.965A6.015 6.015 0 014 10 6.006 6.006 0   0110.001 4 6.006 6.006 0 0116 10.001 6.006 6.006 0 019.999 16a5.98 5.98 0 01-3.095-.86 3.165 3.165 0 01-1.65.438 3.6  3.6 0 01-.57-.044c-.191-.03-.34-.186-.383-.397z"
                fill="#fff"
              ></path>
            </svg>
          </a>

          <a class="link" id="code-link" target="_blank" style="display: none">
            <span class="text">Get Code</span>
            <svg
              width="20"
              height="20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 15.667a1 1 0 01-.707-1.708l3.626-3.625-3.626-3.626a1 1 0 111.415-1.415l4.333 4.333a1 1 0 010 1.414l-4.333 4.333a.993.993 0 01-.707.294zM7.333 5a1 1 0 01.707 1.708l-3.626 3.625 3.627 3.626a1 1 0 11-1.415 1.415L2.293 11.04a1 1 0 010-1.415l4.333-4.333A.992.992 0 017.333 5z"
                fill="#fff"
              ></path>
            </svg>
          </a>

          <div class="restart" id="restart-btn" style="display: none">
            <svg
              style="margin-right: 6px"
              width="12"
              height="12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 11.817A5.017 5.017 0 01.994 6.811c0-.207.169-.375.375-.375s.375.168.375.375A4.265 4.265 0 006 11.067a4.265 4.265 0 004.256-4.256A4.265 4.265 0 006 2.555a.376.376 0 01-.375-.376c0-.206.169-.374.375-.374a5.017 5.017 0 015.006 5.006A5.017 5.017 0 016 11.817z"
                fill="#fff"
              ></path>
              <path
                d="M6.75 4.237a.37.37 0 01-.263-.112l-1.65-1.65a.363.363 0 010-.525L6.487.3c.15-.15.375-.15.525 0 .15.15.15.375 0 .525L5.625 2.212 7.012 3.6c.15.15.15.375 0 .525-.056.075-.15.112-.262.112z"
                fill="#fff"
              ></path>
            </svg>
            Restart
          </div>
        </div>
      </div>
      <!---->
    </div>
    <div id="anima-watermark" style="display: none" class="idle">
      <!----><a
        id="anima-watermark-link"
        target="_blank"
        href="https://www.animaapp.com?utm_campaign=public-link-banner&amp;utm_medium=public-link-banner&amp;utm_source=animaapp.io"
        style="right: 20px; left: auto; padding: 6px"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          id="anima-logo-icon"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          data-hotspot-id="hp-0"
        >
          <path
            d="M4.09293 3.00001H16.5327C16.5484 2.99976 16.5638 3.00351 16.5776 3.01092C16.5913 3.01832 16.603 3.02913 16.6114 3.04231C16.6198 3.0555 16.6247 3.07061 16.6256 3.08622C16.6265 3.10182 16.6233 3.1174 16.6165 3.13146C15.5441 5.29706 13.9276 7.14699 11.9253 8.50009C8.69117 10.6822 5.43436 10.9075 4.09389 10.9196C4.08165 10.9198 4.06949 10.9176 4.05811 10.9131C4.04672 10.9086 4.03636 10.9019 4.02761 10.8933C4.01887 10.8848 4.01192 10.8745 4.00718 10.8633C4.00244 10.852 4 10.8399 4 10.8276V3.09198C4 3.07982 4.00241 3.06778 4.00709 3.05656C4.01177 3.04534 4.01863 3.03516 4.02728 3.02661C4.03592 3.01805 4.04617 3.0113 4.05744 3.00673C4.06871 3.00217 4.08077 2.99988 4.09293 3.00001Z"
            fill="#FF6250"
          ></path>
          <path
            d="M6.77772 17.4446C8.31182 17.4446 9.55545 16.201 9.55545 14.6669C9.55545 13.1328 8.31182 11.8892 6.77772 11.8892C5.24363 11.8892 4 13.1328 4 14.6669C4 16.201 5.24363 17.4446 6.77772 17.4446Z"
            fill="#FFDF90"
          ></path>
          <path
            d="M12.4559 17.2799C11.6701 16.9799 11.2522 16.1151 11.5185 15.3496L13.6153 9.3656C13.884 8.60003 14.7387 8.22302 15.5245 8.52299C16.3103 8.82344 16.7282 9.68772 16.4619 10.4538L14.365 16.4377C14.0964 17.2033 13.2417 17.5808 12.4559 17.2799Z"
            fill="#3366FF"
          ></path>
        </svg>
        <span class="text" style="display: none">Made with Anima</span> </a
      ><!---->
    </div>
    <div id="hotspots_wrapper">
      <div
        class="hotspot"
        id="hp-0"
        style="top: 0px; left: 0px; z-index: -1; opacity: 0"
      ></div>
    </div>
    <div id="t_preload_links"><link href="/invoice-1" rel="prefetch" /></div>
  </body>
</html>
`;

  return content;
};
