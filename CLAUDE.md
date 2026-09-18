# Working in this repo

Public repository under the UQ-Business-School organisation. The teach.business
server pulls it every quarter hour or so, so anything committed here is
published.

## Commits

Never put attribution trailers in a commit message. No `Co-Authored-By` line
naming an AI, no `Claude-Session` link, no "Generated with" footer. GitHub reads
a co-author line as a repository contributor and shows it on the Insights page,
and a session link on a public repo points at a private conversation. Sean
Mitchell is the author of commits made on his behalf.

Plain Australian English in commit messages. No em dashes.

## The course profile viewer

`uqbsld/profiles` is the only copy of the viewer. It reads every JSON file,
`taxonomy/aol-status.json` included, from the data host at
uq-business-school.github.io/uqbs-course-profiles, set by `dataBase` in
`assets/site-config.js`. Profile data does not belong in this repo.
