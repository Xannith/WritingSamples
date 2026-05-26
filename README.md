# JoshWritingSamples.com

**Status:** Cover page + owner dashboard.
Public visitors are directed to [JoshuaBechtel.com](https://joshuabechtel.com).

---

## What this repo is now

This repo serves two things from the same GitHub Pages deployment at `joshwritingsamples.com`:

| Path | Audience | Purpose |
|---|---|---|
| `/` (`index.html`) | Public | Cover page — explains the writing samples site has moved to JoshuaBechtel.com, links there |
| `/login.html` | Owner | UI-only login gate (see security note below) |
| `/dashboard.html` | Owner | Agent dashboard — reference and launch guide for tools in `Xannith/ai-agents` |
| `/samples/` | Legacy | Original writing sample HTML pages (preserved, not linked from new homepage) |
| `/knowledge.html` | Legacy | SKA framework content (preserved, not linked from new homepage) |

---

## Where the writing samples went

All writing samples, portfolio case studies, and the SKA framework are now live at
**[JoshuaBechtel.com](https://joshuabechtel.com)** — specifically:

- [joshuabechtel.com/writing-samples.html](https://joshuabechtel.com/writing-samples.html)
- [joshuabechtel.com/portfolio.html](https://joshuabechtel.com/portfolio.html)
- [joshuabechtel.com/knowledge.html](https://joshuabechtel.com/knowledge.html)

The old HTML in `/samples/` and `knowledge.html` in this repo is preserved but no longer
linked from the public homepage. It can be migrated or removed at any time.

---

## Dashboard overview

The owner dashboard (`/dashboard.html`) connects to the tools in
[Xannith/ai-agents](https://github.com/Xannith/ai-agents).

**Agents and tools documented:**

| Name | Type | Entry point |
|---|---|---|
| Pipeline GUI | Streamlit web app | `agents/pipeline-gui/app.py` → `localhost:8501` |
| Pipeline Runner | Python CLI coordinator | `agents/pipeline-runner/src/run_pipeline.py` |
| Content Type Classifier | Python CLI | `agents/content-type-classifier/src/classify.py` |
| Crawl/Walk/Run Assessor | Python CLI | `agents/crawl-walk-run-assessor/src/assess.py` |
| Content Gap Scout | Python CLI | `agents/content-gap-scout/src/scout.py` |
| Metadata Generator | Python CLI | `agents/metadata-generator/src/generate_metadata.py` |

The dashboard does **not** execute agents from the browser.
It provides launch commands, dependency instructions, `.env` variable references,
and GitHub links. All agents run locally on Kelix.

---

## ⚠️ Security — dashboard login is NOT real authentication

The login at `/login.html` is a **frontend-only, UI-flow gate**.

- It checks a plain-text password stored in the JavaScript of `login.html`.
- Anyone who views page source can read the password and bypass the gate.
- Setting `sessionStorage.setItem('hls-dashboard', '1')` in browser DevTools
  grants access without a password.
- This is intentional and clearly documented in both `login.html` and `dashboard.html`.

**To set your password:** Open `login.html`, find `DASHBOARD_PASSWORD`, and change `'changeme'`
to any value. Commit and deploy.

**To add real authentication (TODO):**

| Option | Notes |
|---|---|
| [Netlify Identity](https://docs.netlify.com/visitor-access/identity/) | Free tier, integrates with Netlify deploys |
| [Cloudflare Access](https://www.cloudflare.com/products/zero-trust/access/) | Free for personal use, zero-trust, no backend required |
| [Supabase Auth](https://supabase.com/docs/guides/auth) | Open-source, free tier, requires a small serverless function |
| [Firebase Authentication](https://firebase.google.com/docs/auth) | Google-hosted, free tier available |

---

## Credentials

Credentials for the agents live in a local `.env` file in the `ai-agents` repo root.
They are **never committed to git** and **never appear in any HTML or JS file**.

Template: `ai-agents/.env.example`

Key variables:
```
ANTHROPIC_API_KEY=your_key_here
OPENAI_API_KEY=your_key_here
GOOGLE_API_KEY=your_key_here
HA_URL=http://your-ha-ip:8123
HA_TOKEN=your_ha_token
N8N_URL=http://your-n8n-ip:5678
N8N_API_KEY=your_n8n_key
```

---

## Local development

This is a static site — no build step, no Node, no framework.

```bash
# Clone
git clone https://github.com/Xannith/WritingSamples.git
cd WritingSamples

# Serve locally (Python built-in server)
python -m http.server 8080
# → http://localhost:8080
```

Alternatively, use VS Code Live Server or any other static file server.

---

## Deployment

The site deploys via GitHub Pages.
- Push to `main` → the live site at `joshwritingsamples.com` updates automatically.
- `CNAME` file contains `joshwritingsamples.com`.
- No build step required.

---

## TODO — real hosted agent execution

The current dashboard is a reference and launch guide only.
Real in-browser agent execution would require one of:

- A **serverless function** (Netlify Functions, Cloudflare Workers, Vercel Functions)
  that receives a document and calls the Python agents via subprocess or a hosted API.
- A **containerized backend** (Docker + FastAPI or Flask) running on a VPS,
  with authenticated API endpoints the dashboard can call.
- A **hosted Streamlit deployment** (Streamlit Community Cloud, Hugging Face Spaces)
  — note the Pipeline GUI has no auth, so keep it private or add auth before hosting.

All of these are future work. For now, agents run locally on Kelix.

---

## File structure

```
WritingSamples/
├── index.html          ← Public cover page (NEW)
├── login.html          ← UI-only login gate (NEW)
├── dashboard.html      ← Owner agent dashboard (NEW)
├── dashboard.css       ← Dashboard styles (NEW)
├── style.css           ← Shared public stylesheet (unchanged)
├── nav.js              ← Legacy nav helper (unchanged)
├── footer.js           ← Legacy footer helper (unchanged)
├── CNAME               ← joshwritingsamples.com
├── README.md           ← This file (updated)
├── about.html          ← Legacy page (preserved)
├── contact.html        ← Legacy page (preserved)
├── knowledge.html      ← SKA framework (preserved)
├── samples/            ← Writing sample HTML files (preserved)
├── ska_prototype/      ← SKA prototype (preserved)
└── files/              ← Resume PDFs (preserved)
```
