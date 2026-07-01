// ============================================================
//  GAMES REGISTRY  (Arcade)
//  ------------------------------------------------------------
//  Single source of truth for the games shown in the Arcade.
//  Plain array — no build step, no backend, no framework.
//
//  A static site (GitHub Pages / custom domain) can't list the
//  contents of the /games folder from the browser, so games are
//  registered here manually. Both the Arcade page (/games/) and
//  the dashboard read this array and render a card per game.
//
//  ── FOLDER RULE ────────────────────────────────────────────
//  Everything lives under the lowercase  /games  folder.
//  Never use an uppercase "Games" path.
//
//  ── HOW TO ADD A NEW GAME ──────────────────────────────────
//  1. Put your game inside /games. Two supported layouts:
//       • Single file:   games/my-game.html
//       • Own folder:    games/my-game/index.html   (launches index.html)
//  2. Add one object to the GAMES array below (copy the template).
//  3. Save. The card appears in the Arcade automatically.
//
//  Paths are ROOT-RELATIVE (start with "/games/") so they resolve
//  correctly from the dashboard, the arcade page, or anywhere.
//
//  Fields:
//    title       (required)  Name shown on the card.
//    path        (required)  Root-relative path to the launch page,
//                            e.g. "/games/my-game/index.html".
//    description (optional)  One or two sentences under the title.
//    badge       (optional)  Small tag, e.g. "Arcade", "Puzzle".
//    emoji       (optional)  Little icon shown on the card.
// ============================================================

window.DASHBOARD_GAMES = [

    {
        title: "Color Catch",
        path: "/games/color-catch/index.html",
        description: "Fast little arcade game — move the paddle and catch only the tiles that match the target color. Miss one and it's game over. Works with mouse, touch, or arrow keys.",
        badge: "Arcade",
        emoji: "🎯"
    },
    {
        title: "Blocks",
        path: "/games/blocks.html",
        description: "Stack falling blocks, clear full rows, and try to survive as the speed increases. Classic Tetris-style arcade puzzle action.",
        badge: "Arcade",
        emoji: "🟦"
    },
    {
        title: "Grid Riders",
        path: "/games/grid-riders.html",
        description: "Race across a grid leaving a glowing trail behind you. Trap your opponent before they trap you, inspired by Tron light cycles and Snake.",
        badge: "Arcade",
        emoji: "🏁"
    },

    // ── ADD NEW GAMES BELOW THIS LINE ──────────────────────────
    // Copy this template, uncomment it, and fill it in:
    //
    // {
    //     title: "My Cool Game",
    //     path: "/games/my-cool-game/index.html",   // or "/games/my-cool-game.html"
    //     description: "Short description of what the game is.",
    //     badge: "Puzzle",
    //     emoji: "🧩"
    // },

];
