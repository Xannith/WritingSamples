/* ============================================================
   nav.js — Shared Navigation Component
   joshwritingsamples.com

   Usage: place this in your <body>, right after <header>:
   <script>loadNav('home')</script>

   Valid page keys:
     'home'       → index.html
     'about'      → about.html
     'samples'    → samples/index.html
     'knowledge'  → knowledge.html
     'contact'    → contact.html
   ============================================================ */

function loadNav(activePage) {

  const pages = [
    { key: 'home',      label: 'Home',                href: 'index.html' },
    { key: 'about',     label: 'About Me',            href: 'about.html' },
    { key: 'samples',   label: 'Samples',             href: 'samples/index.html' },
    { key: 'knowledge', label: 'Knowledge Management',href: 'knowledge.html' },
    { key: 'contact',   label: 'Contact',             href: 'contact.html' },
  ];

  const items = pages.map(p => {
    const isCurrent = p.key === activePage;
    return `<li><a href="${p.href}"${isCurrent ? ' aria-current="page" class="active"' : ''}>${p.label}</a></li>`;
  }).join('\n      ');

  const html = `
<nav class="top-nav" aria-label="Main navigation">
  <ul>
      ${items}
  </ul>
</nav>`;

  document.write(html);
}
