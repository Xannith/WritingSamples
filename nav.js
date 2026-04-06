/* ============================================================
   nav.js — Shared Header + Navigation
   joshwritingsamples.com

   Usage: call loadHeader('pagekey') anywhere in <body>.
   It injects both the glass header and the emerald nav.

   Valid page keys:
     'home'       → index.html
     'about'      → about.html
     'samples'    → samples/index.html
     'knowledge'  → knowledge.html
     'contact'    → contact.html
     'sample'     → samples/* (sub-pages, no active highlight)
   ============================================================ */

function loadHeader(activePage) {

  const pages = [
    { key: 'home',      label: 'Home',                href: '/index.html' },
    { key: 'about',     label: 'About Me',            href: '/about.html' },
    { key: 'samples',   label: 'Samples',             href: '/samples/index.html' },
    { key: 'knowledge', label: 'Knowledge Management', href: '/knowledge.html' },
    { key: 'contact',   label: 'Contact',             href: '/contact.html' },
  ];

  const navItems = pages.map(p => {
    const isCurrent = p.key === activePage;
    return `<li><a href="${p.href}"${isCurrent ? ' aria-current="page" class="active"' : ''}>${p.label}</a></li>`;
  }).join('\n      ');

  const html = `
<header class="site-header">
  <a class="wordmark" href="/index.html">Joshua Bechtel</a>
  <p class="site-tagline">AI Knowledge Strategy and Information Architecture</p>
</header>
<nav class="top-nav" aria-label="Main navigation">
  <ul>
    ${navItems}
  </ul>
</nav>`;

  document.write(html);
}

/* Legacy alias so existing loadNav() calls don't break */
function loadNav(activePage) { loadHeader(activePage); }
