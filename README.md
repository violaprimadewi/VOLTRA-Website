# VOLTRA — Figma assessment

Implemented from Figma node 14:72053 using plain HTML, CSS, and JavaScript. No CSS framework, application framework, or build step. All imagery, SVG assets, and Geist fonts are local.

Open index.html directly, or serve this folder with any static HTTP server.

The shared navbar and dark dropdowns are adapted from the reference in `code 2`. `navigation.css` and `navigation.js` provide the fixed navbar, scroll styling, desktop hover/click menus, keyboard controls, and mobile navigation. Navigation SVGs are local in `assets/navigation/`. The reference folder is unchanged. Dropdown links point to existing homepage and product sections.

Run `reference/verify-navigation.cjs` to check navigation on both pages at desktop and 992px, 800px, 390px, and 320px mobile widths.

Open `product.html` for the VOLTRA ONE product detail page, implemented from Figma node `111:478`. The homepage hero CTA, navigation, footer, and Meet VOLTRA ONE link connect to this page. It shares local Geist fonts, navigation, dialogs, and footer styles with the homepage, with page-specific styles in `product.css` and interactions in `product.js`.

The product page includes responsive specification and feature sections, an accessible accordion synchronized with battery hotspots, and an HTML specification brochure generated from the concept design. The CTA uses the original Figma image with its static sRGB Gradient map effect ported to plain Canvas. A locally rendered copy preserves the effect when browsers restrict Canvas pixel access for file URLs. No CSS or JavaScript frameworks are used.

Product browser verification: `reference/verify-product.cjs`. It checks the desktop section positions against Figma, asset loading and icon sizes, mobile overflow, accordion/hotspot synchronization, brochure download, and navigation. Screenshots are saved in `reference/product-desktop.png` and `reference/product-mobile.png`.

Design source: https://www.figma.com/design/zpMDmugwCarVutXV9BGZNs/Test-Assessment--%E2%80%93-PT-KOR-WEB?node-id=14-72053

Verified against the design through Figma MCP. All images and SVG files use the supplied Figma assets. Browser checks cover the 1440px desktop and 390px mobile layouts, asset loading, intrinsic feature icon dimensions, navigation, carousel, and simulation controls.

The hero follows all three variants in the Hero Slider component (37:905): A New Era of Electric Energy, Every road is yours to explore, and Progress Powered by Purpose. Each variant uses its own image, caption, CTA text, desktop crop, and overlay. `reference/verify-hero.cjs` checks all three variants on desktop and mobile and saves hero screenshots.

`reference/verify.cjs` runs the browser checks with the bundled Node.js and Playwright runtime and opens the local HTML file directly. It saves desktop and mobile screenshots in `reference/`.

Includes responsive navigation, keyboard-accessible menus, a manual hero carousel, informational dialogs, an illustrative driving simulation, and email contact links. Social buttons show a contact dialog because no official profile URLs were supplied. The design provides no video, so the What is VOLTRA button opens an overview.
