# NHM Variant Calling — course manual

A [MkDocs Material](https://squidfunk.github.io/mkdocs-material/) site serving as the
manual for the NHM 2-day variant calling course. Content pages are currently stubs to be
filled in.

## Run it locally

```bash
# 1. Create and activate a virtual environment
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate

# 2. Install the toolchain
pip install -r requirements.txt

# 3. Live-preview with hot reload at http://127.0.0.1:8000
mkdocs serve
```

Edit any file under `docs/` and the browser reloads automatically.

To produce the static site once (output in `site/`):

```bash
mkdocs build --strict   # --strict fails on broken links / nav — good habit before publishing
```

## Project layout

```
mkdocs.yml     # theme, navigation and markdown-extension config (the one config file)
docs/          # all content — one Markdown file per page (see the `nav:` in mkdocs.yml)
requirements.txt
.github/workflows/deploy.yml   # auto-publish to GitHub Pages (see below)
```

To add or reorder pages, create the Markdown file under `docs/` and add an entry to the
`nav:` tree in `mkdocs.yml`.

## Collaboration & hosting

The repo lives (privately) at **`SpeciationGroup/nhm-variant-calling`**. Coordinates are
already wired into `mkdocs.yml` (`repo_url`, `repo_name`, `edit_uri`).

**While private (now):** collaborators with write access edit the Markdown directly —
either in GitHub's web editor (navigate to the file → pencil icon) or locally after
`git clone`. Preview the real rendered site with `mkdocs serve`; GitHub's own file view
shows plain Markdown (admonition boxes appear as raw `!!!` text).

**Going public / enabling the live site** (later, when the manual is ready):

1. **Make the repo public** — GitHub → repo **Settings → General → Danger Zone →
   Change visibility → Public**.
2. **Turn the deploy workflow back on** — in `.github/workflows/deploy.yml`, uncomment
   the `push:` trigger, and in `mkdocs.yml` uncomment the `site_url` line.
3. **Enable Pages** — **Settings → Pages → Build and deployment → Source: Deploy from a
   branch → Branch: `gh-pages` / `root`**. The site goes live at
   `https://speciationgroup.github.io/nhm-variant-calling/`.

> The workflow runs `mkdocs gh-deploy --force`. You can also deploy manually any time
> with `mkdocs gh-deploy` (needs push access and Pages enabled).
