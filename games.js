// ============================================================
//  GAMES REGISTRY
//  ------------------------------------------------------------
//  This is the single place you edit to add a new browser game
//  to the dashboard's Games section. It is a plain array — no
//  build step, no backend, no framework.
//
//  A static site (GitHub Pages / custom domain) cannot list the
//  contents of the /Games folder from the browser, so games are
//  registered here manually. The dashboard reads this array and
//  renders a card for each game automatically.
//
//  ── HOW TO ADD A NEW GAME ──────────────────────────────────
//  1. Put your game in its own folder inside /Games, e.g.
//         Games/my-cool-game/index.html
//     (Anything the folder needs — js, css, images — lives
//      alongside that index.html.)
//  2. Add one object to the GAMES array below. Copy the
//     template comment at the bottom of the array.
//  3. Save. That's it — the card shows up on the dashboard.
//
//  Fields:
//    title       (required)  Name shown on the card.
//    path        (required)  Relative path to the game's launch
//                            page. If a game ships its own
//                            index.html, point at the folder OR
//                            the index.html directly.
//    description (optional)  One or two sentences under the title.
//    badge       (optional)  Small tag, e.g. "Arcade", "Puzzle".
//    emoji       (optional)  Little icon shown on the card.
// ============================================================

window.DASHBOARD_GAMES = [

    {
        title: "Color Catch",
        path: "Games/color-catch/index.html",
        description: "Fast little arcade game — move the paddle and catch only the tiles that match the target color. Miss one and it's game over. Works with mouse, touch, or arrow keys.",
        badge: "Arcade",
        emoji: "🎯"
    },

    // These two were uploaded to the lowercase /games folder (flat HTML files).
    // Registered here so they show on the dashboard. Edit the descriptions anytime.
    {
        title: "Blocks",
        path: "games/blocks.html",
        description: "Block-stacking arcade game.",
        badge: "Arcade",
        emoji: "🟦"
    },
    {
        title: "Grid Riders",
        path: "games/grid-riders.html",
        description: "Grid-based action game.",
        badge: "Arcade",
        emoji: "🏁"
    },

    // ── ADD NEW GAMES BELOW THIS LINE ──────────────────────────
    // Copy this template, uncomment it, and fill it in:
    //
    // {
    //     title: "My Cool Game",
    //     path: "Games/my-cool-game/index.html",
    //     description: "Short description of what the game is.",
    //     badge: "Puzzle",
    //     emoji: "🧩"
    // },

];
