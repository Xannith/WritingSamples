// ============================================================
//  ARCADE AUDIO — shared, lightweight sound-effects helper
//  ------------------------------------------------------------
//  Web Audio API only. No external sound files, no backend.
//  Every arcade game includes this file:
//        <script src="/games/arcade-audio.js"></script>
//
//  Usage from a game:
//        ArcadeSFX.play('catch');     // named effect
//        ArcadeSFX.play('gameover');
//        ArcadeSFX.tone({freq:440, dur:0.1});   // custom one-off
//
//  Behaviour:
//    • Audio stays silent until the player interacts (click / key /
//      touch / pointer). This satisfies browser autoplay policies —
//      the AudioContext is created and resumed on the first gesture.
//    • A small 🔊 / 🔇 mute button is injected bottom-right of every
//      game automatically. State is saved to localStorage
//      ('arcade-muted') and shared across all games.
//    • play() / tone() are always safe: they no-op when muted or
//      before audio is unlocked, and never throw.
// ============================================================
(function () {
    'use strict';

    var STORAGE_KEY = 'arcade-muted';
    var ctx = null;          // AudioContext, created on first gesture
    var unlocked = false;
    var muted = false;

    try { muted = localStorage.getItem(STORAGE_KEY) === '1'; } catch (e) { /* ignore */ }

    function ensureCtx() {
        if (ctx) return ctx;
        try {
            var AC = window.AudioContext || window.webkitAudioContext;
            if (!AC) return null;
            ctx = new AC();
        } catch (e) { ctx = null; }
        return ctx;
    }

    // Unlock/resume audio on the first real user interaction.
    function unlock() {
        var c = ensureCtx();
        if (c && c.state === 'suspended') { try { c.resume(); } catch (e) {} }
        unlocked = true;
    }
    ['pointerdown', 'mousedown', 'touchstart', 'keydown', 'click'].forEach(function (evt) {
        window.addEventListener(evt, unlock, { passive: true });
    });

    // Core synth: play a single tone with a quick attack + decay envelope.
    function tone(opts) {
        opts = opts || {};
        if (muted || !unlocked) return;
        var c = ensureCtx();
        if (!c) return;
        try {
            if (c.state === 'suspended') c.resume();
            var now   = c.currentTime;
            var dur   = opts.dur   != null ? opts.dur   : 0.12;
            var freq  = opts.freq  != null ? opts.freq  : 440;
            var type  = opts.type  || 'square';
            var vol   = opts.vol   != null ? opts.vol   : 0.18;   // reasonable, not harsh
            var delay = opts.delay != null ? opts.delay : 0;
            var start = now + delay;

            var osc  = c.createOscillator();
            var gain = c.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, start);
            if (opts.slideTo) {
                osc.frequency.exponentialRampToValueAtTime(Math.max(1, opts.slideTo), start + dur);
            }
            // Short envelope to avoid clicks and keep it gentle.
            gain.gain.setValueAtTime(0.0001, start);
            gain.gain.exponentialRampToValueAtTime(vol, start + 0.008);
            gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);

            osc.connect(gain).connect(c.destination);
            osc.start(start);
            osc.stop(start + dur + 0.02);
        } catch (e) { /* never break gameplay for audio */ }
    }

    // A short sequence of tones (for arpeggios / jingles).
    function sequence(steps) {
        if (muted || !unlocked) return;
        var t = 0;
        steps.forEach(function (s) {
            tone({ freq: s.freq, dur: s.dur || 0.09, type: s.type || 'square', vol: s.vol, slideTo: s.slideTo, delay: t });
            t += (s.gap != null ? s.gap : (s.dur || 0.09));
        });
    }

    // ── Named effects — short, simple, tuned to be pleasant ──────
    var EFFECTS = {
        start:    function () { sequence([{freq:392,dur:0.09},{freq:523,dur:0.09},{freq:784,dur:0.12}]); },
        click:    function () { tone({ freq: 440, dur: 0.06, type: 'square', vol: 0.14 }); },
        move:     function () { tone({ freq: 300, dur: 0.04, type: 'square', vol: 0.10 }); },
        turn:     function () { tone({ freq: 520, dur: 0.05, type: 'triangle', vol: 0.12 }); },
        rotate:   function () { tone({ freq: 620, dur: 0.06, type: 'triangle', vol: 0.12 }); },
        drop:     function () { tone({ freq: 180, dur: 0.09, type: 'square', vol: 0.16, slideTo: 90 }); },
        shoot:    function () { tone({ freq: 900, dur: 0.07, type: 'square', vol: 0.12, slideTo: 300 }); },
        hit:      function () { tone({ freq: 240, dur: 0.08, type: 'sawtooth', vol: 0.16, slideTo: 120 }); },
        catch:    function () { tone({ freq: 660, dur: 0.08, type: 'square', vol: 0.16, slideTo: 990 }); },
        success:  function () { sequence([{freq:523,dur:0.08},{freq:784,dur:0.10}]); },
        coin:     function () { sequence([{freq:988,dur:0.05},{freq:1319,dur:0.08}]); },
        clear:    function () { sequence([{freq:523,dur:0.07},{freq:659,dur:0.07},{freq:880,dur:0.10}]); },
        levelup:  function () { sequence([{freq:523,dur:0.08},{freq:659,dur:0.08},{freq:784,dur:0.08},{freq:1047,dur:0.14}]); },
        win:      function () { sequence([{freq:523,dur:0.10},{freq:659,dur:0.10},{freq:784,dur:0.10},{freq:1047,dur:0.20}]); },
        nearmiss: function () { tone({ freq: 1200, dur: 0.05, type: 'sine', vol: 0.10 }); },
        wrong:    function () { tone({ freq: 200, dur: 0.20, type: 'sawtooth', vol: 0.18, slideTo: 110 }); },
        error:    function () { tone({ freq: 200, dur: 0.20, type: 'sawtooth', vol: 0.18, slideTo: 110 }); },
        crash:    function () { tone({ freq: 160, dur: 0.30, type: 'sawtooth', vol: 0.20, slideTo: 60 }); },
        gameover: function () { sequence([{freq:392,dur:0.14},{freq:311,dur:0.14},{freq:196,dur:0.28,type:'sawtooth'}]); }
    };

    function play(name) {
        var fn = EFFECTS[name];
        if (fn) { try { fn(); } catch (e) {} }
        else { tone({ freq: 440, dur: 0.08 }); }  // fallback beep for unknown names
    }

    // ── Mute button (auto-injected, shared state) ────────────────
    var btn = null;
    function renderBtn() {
        if (!btn) return;
        btn.textContent = muted ? '🔇' : '🔊';
        btn.setAttribute('aria-label', muted ? 'Sound off — click to unmute' : 'Sound on — click to mute');
        btn.title = muted ? 'Sound off' : 'Sound on';
    }
    function setMuted(v) {
        muted = !!v;
        try { localStorage.setItem(STORAGE_KEY, muted ? '1' : '0'); } catch (e) {}
        renderBtn();
    }
    function toggle() { setMuted(!muted); if (!muted) play('click'); }

    function injectButton() {
        if (btn || !document.body) return;
        btn = document.createElement('button');
        btn.type = 'button';
        btn.id = 'arcadeMuteBtn';
        btn.style.cssText = [
            'position:fixed', 'right:12px', 'bottom:12px', 'z-index:99999',
            'width:42px', 'height:42px', 'border-radius:50%', 'border:none',
            'background:rgba(20,24,34,0.72)', 'color:#fff', 'font-size:19px',
            'cursor:pointer', 'line-height:42px', 'text-align:center', 'padding:0',
            'box-shadow:0 2px 8px rgba(0,0,0,0.35)', 'backdrop-filter:blur(2px)',
            '-webkit-tap-highlight-color:transparent'
        ].join(';');
        btn.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); unlock(); toggle(); });
        renderBtn();
        document.body.appendChild(btn);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectButton);
    } else {
        injectButton();
    }

    // ── Public API ──────────────────────────────────────────────
    window.ArcadeSFX = {
        play: play,
        tone: tone,
        sequence: sequence,
        isMuted: function () { return muted; },
        setMuted: setMuted,
        toggle: toggle,
        unlock: unlock
    };
})();
