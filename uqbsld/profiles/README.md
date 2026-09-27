# UQBS Course Profile Viewer

This folder is the viewer, served at `teach.business.uq.edu.au/ld/uqbsld/profiles/`
(the school server mirrors this repo with about a 15 minute delay). Edit it here;
there is no other copy.

The data is not here. Every JSON the pages read (course profiles, manifests, the
program taxonomies, LO overrides, teaching periods and the Assurance of Learning
feed `taxonomy/aol-status.json`) is fetched from the data host set in
`assets/site-config.js`: the GitHub Pages site of
`UQ-Business-School/uqbs-course-profiles`. That repo is where the scraper runs
and where the AoL register export lands, so a data change never needs a change
here.

Files: `index.html` (landing), `business.html` (UQBS browser), `browse-all.html`
(all of UQ), `course.html`, `program.html`, `aol.html`, `security.html`, and `assets/app.js`,
`assets/styles.css`, `assets/site-config.js`. Statuses in `AOL_STATUS` in
`app.js` mirror the AoL register's Lists tab and `scraper/import_aol.py` in the
data repo: change the register first, then both.

`security.html` is the assessment security dashboard. It reads
`assets/security-courses.csv` and `assets/security-items.csv` from the data host,
which `scraper/build_security.py` in the data repo rebuilds at every Pages
deploy. The band (under 30%, 30% to 59%, 60% or more) is computed on the page
from the secure share; learning designer overrides in the assessment register
workbook are not in the feed. Status and band icons are inline keyline SVGs in
`UQ_ICONS` in `app.js`, on the same grid as the team's uq-icons library.
