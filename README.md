# NHM Variant Calling

A manual for the variant calling course at Natural History Museum London (September 2026).

## View the manual locally

```bash
# 1. Create and activate a virtual environment
python -m venv .venv
source .venv/bin/activate

# 2. Install the toolchain
pip install -r requirements.txt

# 3. Live-preview with hot reload at http://127.0.0.1:8000
mkdocs serve
```

Edit any file under `docs/` and the browser reloads automatically!

## What's in the repo?

```
mkdocs.yml     # theme, navigation and markdown-extension config (the one config file)
docs/          # all content — one Markdown file per page (see the `nav:` in mkdocs.yml)
requirements.txt
manual_plan.md  # edit & send to Tymek to suggest structural changes
```

## Suggested edit cycle

The repo lives at `SpeciationGroup/nhm-variant-calling`.

The idea is to collaborate through **local edits and pull requests**. For section content, nobody
commits straight to `main` — each change is drafted on its own branch and merged only after review. I (Tymek) will handle the design of the manual; just send me a modified `manual_plan.md`, or other suggestions.

1. **Clone** (do it once):
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
   git checkout -b your-branch-name
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