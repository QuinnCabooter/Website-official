# Academic Portfolio Website (Hugo)

This is a Hugo-based academic portfolio site. The pages are generated from:
- Hugo templates in `layouts/`
- Markdown pages in `content/` (for publications + research)
- YAML data in `data/` (for home/about and contact)

Netlify builds the site using `hugo` and publishes the `public/` directory.

## Run locally

1. Install Hugo (extended recommended).
2. Start the dev server:

```bash
hugo server --disableFastRender
```

3. Open `http://localhost:1313`.

Tip: if you only changed a static file (CSS/JS), a hard reload is usually enough.

## Deploy to Netlify

1. Push this repo to GitHub.
2. In Netlify: **Add new site** -> **Import an existing project**.
3. Build command: `hugo`
4. Publish directory: `public`
5. Deploy.

Netlify settings are captured in `netlify.toml` (notably the HTTP headers).

## How the site is structured

### Configuration
- `config.toml`: site metadata (title/description/author), and build settings.

### Templates
- `layouts/_default/baseof.html`: the global HTML shell. It loads:
  - fonts (Google Fonts)
  - site CSS (`/css/styles.css`)
  - the header/footer partials
- `layouts/partials/header.html` and `layouts/partials/footer.html`: top nav + footer.
- `layouts/partials/page_title.html`: consistent H1 + optional subtitle styling.
- `layouts/index.html`: the home page (“About” content + hero).
- `layouts/publications/list.html`: the publications list page.
- `layouts/publications/single.html`: the publication detail page.
- `layouts/research/list.html`: the research list page (cards).
- `layouts/research/single.html`: the research detail page.
- `layouts/contact/single.html`: contact page.

### Content
The `content/` folder provides actual pages (Hugo “page resources”) and section indexes:
- `content/_index.md`: the home route (“Home” title stub; home content is mostly from `data/profile.yaml`).
- `content/publications/_index.md`: “Publications” section intro text.
- `content/publications/*.md`: one Markdown page per publication (front matter drives the list card + detail view).
- `content/research/_index.md`: “Research” section title stub.
- `content/research/*.md`: research notes/pages (front matter drives the list cards).
- `content/contact.md`: contact page title + optional body text (the contact links/details come from YAML).

### Data (YAML)
YAML in `data/` is loaded via `site.Data...`:
- `data/profile.yaml`: hero/about content used on the home page (`layouts/index.html`).
- `data/contact.yaml`: email + external profile links used on the contact page (`layouts/contact/single.html`).

### Assets / styling / behavior
- CSS: `static/css/styles.css`
- JS:
  - `static/js/site.js`: publications tag filter + mobile menu toggle
- Static assets: `static/assets/` (favicon, `cv.pdf`, images)

## Publications: required front matter

Publications live in `content/publications/*.md` and must include at least the fields used by `layouts/publications/list.html` and `layouts/publications/single.html`.

The publications list card reads:
- `title`
- `date` (for sorting)
- `authors` (string, used in a paragraph; one author is bolded by name match)
- `venue` (string)
- `abstract` (string; truncated on the card)
- `pub_type` (string; shown as a pill)
- `tags` (array; used for the filter)
- `link` (main “Open” link)
- `links` (optional array of `{ name, url }` objects; shown as extra links)

Example:

```yaml
---
title: "My paper title"
date: 2024-01-01
authors: "A. Author; You; B. Author"
venue: "Journal Name"
pub_type: "Journal article"
tags:
  - Some tag
  - Another tag
link: "https://doi.org/..."
links:
  - name: "PDF"
    url: "https://..."
abstract: "Abstract text..."
---
```

## Publications: tag filtering behavior

The publications list page renders:
- a `<select id="pub-filter">` with all unique tags found in the publication pages
- each publication card as an `<article class="card pub-card" data-tags="tag1|tag2|...">`

`static/js/site.js` listens for changes on `#pub-filter` and shows/hides cards by reading `data-tags`.

## Research cards

Research pages are under `content/research/*.md`.

`layouts/research/list.html` renders each child page as a card and expects:
- `date` (for sorting)
- `summary` (optional; displayed as the paragraph under the title)

## Contact

`content/contact.md` provides the section title and optional body.

`layouts/contact/single.html` loads the actual contact links from:
- `data/contact.yaml` (`email`, `orcid`, `github`, `linkedin`, etc.)

## Notes about CSS updates during development

During development, browsers can sometimes reuse a cached `styles.css` even after Hugo rebuilds.

To make spacing changes reliable, `layouts/_default/baseof.html` loads CSS with a query-string version:
- `/css/styles.css?v=20260325`

