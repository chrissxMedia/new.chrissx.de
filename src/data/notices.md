### ⚠️ Upcoming large-scale maintenance/migration (late Jan 2026)

We are currently planning to migrate all services running on our primary Nuremberg-based server `sophia`, [which includes most of what we operate](https://github.com/chrissxMedia/chrissx.de.conf.sh?tab=readme-ov-file#infrastructure), to a new server. We're going to great lengths to make this switchover as smooth as possible, but there might be short periods of downtime or other disruptions, such as unexpected errors. This migration will take place after 2026-01-23 and we will update this notice with an exact date and time as we continue planning.

The following list of chrissx Media websites and services will be affected:

- chrissx.de
- fuxgames.com
- kinkcheck.top / bottom.kinkcheck.top
- fonts.chrissx.de
- lyrics.chrissx.de
- screwed.chrissx.de
- meme.chrissx.de
- erwin (please read the warning below) / erwin.chrissx.de
- gock.dev / pixel.chrissx.de
- elonisnwichser.de

Additionally, the following third party websites hosted by us will also be affected:

- zerm.eu / zerm.link
- emilycatgirl.de

We are currently in the process of setting up the new server. During the migration, the DNS entries will be gradually switched over, while we carefully monitor for any breakage.

A few days after the migration, in February, `sophia` will be taken offline permanently. Please note that after this has taken place, no services will be available at `sophia.chrissx.de` (or its associated IP addresses) anymore. Specifically, make sure that if you use `erwin`, the correct URL is not `http://sophia.chrissx.de:8080/`, but `http://erwin.chrissx.de:8080/` or `https://erwin.chrissx.de/`.

---

### Deprecation and upcoming removal of abandoned websites and Gopher protocol support (Jan 2026)

The following websites have not been updated for five years, are partially broken and don't serve any material purpose anymore:

- [old.chrissx.de](https://github.com/chrissxMedia/old.chrissx.de)
- [ampless.chrissx.de](https://github.com/Ampless/ampless.chrissx.de)
- [amplus.chrissx.de](https://github.com/Amplus2/amplus.chrissx.de)

To optimize our deployment processes going forward and reduce unnecessary resource consumption we intend to remove the content hosted on these sites from our servers after 2026-01-21. The corresponding DNS entries may also be removed after 2026-01-22. The code will remain available in the form of public archives on GitHub.

For the same reasons, as well as focusing our development efforts, [the tech demo that we call our Gopher site](https://github.com/chrissxMedia/chrissx.de-70) will gradually become unavailable after 2026-01-23. The archive will also remain public on GitHub.

---

### Upcoming maintenance in Rosenhof (Feb 2026)

For internal reasons, including but not limited to cleaning and battery replacement, we will be performing maintenance at our site in Rosenhof. During this, [all services hosted there](https://github.com/chrissxMedia/chrissx.de.conf.sh?tab=readme-ov-file#infrastructure) (i.e. Email, Mumble and BUcKET) will be unavailable for a period of 10 to 30 minutes. We intend to perform this maintenance in early February, and will update this notice with a more detailed timeline as we continue planning.

---

### Deprecation and upcoming archival of the ludwig Docker image (pygopherd, Mar 2026)

To focus our development efforts, we intend to archive the `chrissx/ludwig` Docker image and stop providing updates after 2026-02-31. A detailed migration guide has been added to [its README](https://github.com/chrissxMedia/chrissx.de.conf.sh/blob/master/ludwig/README.md#migrating).
