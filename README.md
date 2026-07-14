# NHM Variant Calling

A manual for the variant calling course at Natural History Museum London (September 2026).

## View the manual locally

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

## What's in the repo?

```
mkdocs.yml     # theme, navigation and markdown-extension config (the one config file)
docs/          # all content — one Markdown file per page (see the `nav:` in mkdocs.yml)
requirements.txt
.github/workflows/deploy.yml   # auto-publish to GitHub Pages (see below)
```

To add or reorder pages, create the Markdown file under `docs/` and add an entry to the
`nav:` tree in `mkdocs.yml`.

## Suggested edit cycle

The repo lives (privately) at **`SpeciationGroup/nhm-variant-calling`**. Coordinates are
already wired into `mkdocs.yml` (`repo_url`, `repo_name`, `edit_uri`).

We collaborate through **local edits and pull requests**: nobody commits straight to
`main`; each change is drafted on its own branch and merged only after review.

1. **Clone once** (first time only):
   ```bash
   git clone git@github.com:SpeciationGroup/nhm-variant-calling.git
   cd nhm-variant-calling
   ```
2. **Start from the latest `main`:**
   ```bash
   git checkout main && git pull
   ```
3. **Branch** for your change (any short, descriptive name):
   ```bash
   git checkout -b read-qc-draft
   ```
4. **Edit and preview.** Change files under `docs/`, previewing live with `mkdocs serve`
   (see *View the manual locally* above).
5. **Commit and push the branch:**
   ```bash
   git add -A
   git commit -m "Draft the Read QC section"
   git push -u origin read-qc-draft
   ```
6. **Open a pull request.** The `git push` prints a link, or use *Compare & pull request*
   on the repo page. Say what you changed.
7. **Review and merge.** The other person reviews the diff on GitHub, comments if needed,
   then clicks **Merge**. Delete the branch afterwards, and everyone `git pull`s `main`.

> **To enforce this** (block direct pushes to `main`): repo **Settings → Branches → Add
> branch protection rule** for `main`, tick *Require a pull request before merging*.
> Recommended, so nothing reaches `main` unreviewed.

## Publishing the live site (later)

Held off while the repo is private — GitHub Pages can't serve a private repo on the free
plan. When the manual is ready to go public:

1. **Make the repo public** — **Settings → General → Danger Zone → Change visibility →
   Public**.
2. **Turn the deploy workflow back on** — in `.github/workflows/deploy.yml` uncomment the
   `push:` trigger, and in `mkdocs.yml` uncomment the `site_url` line.
3. **Enable Pages** — **Settings → Pages → Build and deployment → Source: Deploy from a
   branch → Branch: `gh-pages` / `root`**. The site goes live at
   `https://speciationgroup.github.io/nhm-variant-calling/`.

> The workflow runs `mkdocs gh-deploy --force`. You can also deploy manually any time
> with `mkdocs gh-deploy` (needs push access and Pages enabled).
