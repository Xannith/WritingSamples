/* ============================================================
   footer.js — Shared Footer Component
   joshwritingsamples.com

   Usage: place this just before </body>:
   <script>loadFooter()</script>
   ============================================================ */

function loadFooter() {

  const year = new Date().getFullYear();

  const html = `
<footer>
  <span class="footer-name">Joshua Bechtel</span>
  <span class="footer-tagline">Knowledge Architecture · Technical Writing · Enterprise Content Strategy</span>
  <span class="footer-tagline">© ${year}</span>
</footer>`;

  document.write(html);
}
