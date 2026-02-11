### Upcoming maintenance in Rosenhof (Feb 2026)

For internal reasons, including but not limited to cleaning and battery replacement, we will be performing maintenance at our site in Rosenhof. During this, [all services hosted there](https://github.com/chrissxMedia/chrissx.de.conf.sh?tab=readme-ov-file#infrastructure) (i.e. Email, Mumble and BUcKET) will be unavailable for a period of 10 to 30 minutes. We intend to perform this maintenance on 2026-02-15, and will update this notice with a more detailed timeline as we continue planning.

---

### Removal of unused subdomains (Feb 2026)

The following subdomains have not been used in years:

- ftp.chrissx.de
- get.cpm.chrissx.de
- mc.chrissx.de
- pad.chrissx.de
- penis.chrissx.de

Their DNS entries were removed on 2026-02-11.

---

### Large-scale maintenance/migration (late Jan 2026, almost done)

We have migrated all services previously running on our Nuremberg-based server `sophia`, [which includes most of what we operate](https://github.com/chrissxMedia/chrissx.de.conf.sh?tab=readme-ov-file), to the new server `ruby`. We're going to great lengths to make this switchover as smooth as possible, but there might be short periods of downtime or other disruptions, such as unexpected errors. Most of the migration has taken place on 2026-01-26 between 3:00 and 4:00 (AM) UTC (4:00-5:00 CET). A detailed timeline can be found below.

The following list of chrissx Media websites and services are affected:

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

Additionally, the following third party websites hosted by us are also affected:

- zerm.eu / zerm.link
- emilycatgirl.de

At least a few days after the migration, after 2026-02-07, `sophia` will be taken offline permanently. Please note that after this has taken place, no services will be available at `sophia.chrissx.de` (or its associated IP addresses) anymore. Specifically, make sure that if you use `erwin`, the correct URL is not `http://sophia.chrissx.de:8080/`, but `http://erwin.chrissx.de:8080/` or `https://erwin.chrissx.de/`.

#### Detailed Timeline

We will carefully monitor for breakage after each step. All times are 24-hour UTC.

- [x] (2026-01-25) `ruby` setup, incl. complete testing
- [x] (2026-01-26 3:00) DNS switchover of underutilized domains: `chrisxeric.de`, `cpm.chrissx.de`, `elonisnwichser.de`, `media.chrissx.de`, `wiki.chrissx.de`
- [x] (2026-01-26 3:15) DNS switchover of `erwin.chrissx.de`
- [x] (2026-01-26 3:20) DNS switchover of `lyrics.chrissx.de`, `meme.chrissx.de`, `screwed.chrissx.de`
- [x] (2026-01-26 3:30) DNS switchover of `zerm.link`, `bottom.kinkcheck.top`, `emilycatgirl.de`
- [x] (2026-01-26 3:40) DNS switchover of all remaining domains
- [x] `sophia` traffic decreases to an insignificant amount
- [x] (2026-01-29) Significant reduction of `sophia`'s `nginx` configuration
- [ ] Migration of Discord bots (see below)
- [ ] (after 2026-02-14) Final Shutdown of `sophia`

The final shutdown of `sophia` might be significantly delayed by the pending migration of the Discord bots `jana` and Inspiriererin (insp8n for short). Their migration has not been planned yet and will be announced at a very short notice.

It has not been decided yet when the IP addresses assigned to `sophia` will be given away. We will hold onto them until at least 2026-03-15 to mitigate any confusion arising from their reuse by a third party.

#### Semi-Live Updates

Times are given in 24-hour CET, unless noted otherwise.

- (2026-01-27 12:00) Yesterday `sophia` already saw a >80% reduction in traffic, despite the 4 hours before the migration. Today we're seeing <5% of usual traffic, which is mostly bots, so everything can be shut down in the coming days.
- (2026-01-26 07:50) The issues have been resolved. `zerm.eu` has been switched over and verified.
- (2026-01-26 05:02) successful switchover and verification completed: `chrissx.de`, `fonts.chrissx.de`, `gock.dev`. The main part of the migration is done and this notice will be significantly reworked soon.
- (2026-01-26 05:00) `zerm.eu` has been rolled back to `sophia` because of broken Content-Type headers. This will be fixed soon
- (2026-01-26 04:52) successful switchover and verification completed: `fuxgames.com`, `qa.chrissx.de`, `porn.chrissx.de`, `pixel.chrissx.de`, `new.chrissx.de`
- (2026-01-26 04:43) successful switchover and verification completed: `bottom.kinkcheck.top`, `kinkcheck.top`
- (2026-01-26 04:36) successful switchover and verification completed: `zerm.link`
- (2026-01-26 04:30) switchover and verification completed: `emilycatgirl.de`. Chromium shows a security warning that we will investigate later (possible rollback)
- (2026-01-26 04:25) successful switchover and verification completed: `lyrics.chrissx.de`, `meme.chrissx.de`, `screwed.chrissx.de`
- (2026-01-26 04:14) successful switchover and verification completed: `erwin.chrissx.de`
- (2026-01-26 04:05) successful switchover and verification completed: `cpm.chrissx.de`, `elonisnwichser.de`, `media.chrissx.de`, `wiki.chrissx.de`
- (2026-01-26 03:59) `chrisxeric.de` has been fully verified to work while accessing it through `ruby` (a test image is not available, which is expected)
- (2026-01-26 03:55) First switchover: not officially supported domain `chrisxeric.de`
- (2026-01-26 03:50) Coffee has been made, we are ready.
- (2026-01-25 21:45) All services are working correctly.
- (2026-01-25 12:15) All services are up-and-running. Testing will be conducted later today.
- (2026-01-25 10:45) After 4 test installations, we have arrived at a concise and stable setup. The new server `ruby`, located in Falkenstein, will be set up during the next few hours.

---

### Deprecation and removal of abandoned websites and Gopher protocol support (Jan 2026)

The following websites have not been updated for five years, are partially broken and don't serve any material purpose anymore:

- [old.chrissx.de](https://github.com/chrissxMedia/old.chrissx.de)
- [ampless.chrissx.de](https://github.com/Ampless/ampless.chrissx.de)
- [amplus.chrissx.de](https://github.com/Amplus2/amplus.chrissx.de)

To optimize our deployment processes going forward and reduce unnecessary resource consumption, these websites and their corresponding DNS entries have been removed on 2026-01-25. The code will remain available in the form of public archives on GitHub.

For the same reasons, as well as focusing our development efforts, [the tech demo that we call our Gopher site](https://github.com/chrissxMedia/chrissx.de-70) was taken down on 2026-01-25. The archive will also remain public on GitHub.

---

### Deprecation and upcoming archival of the ludwig Docker image (pygopherd, Mar 2026)

To focus our development efforts, we intend to archive the `chrissx/ludwig` Docker image and stop providing updates after 2026-02-28. A detailed migration guide has been added to [its README](https://github.com/chrissxMedia/chrissx.de.conf.sh/blob/master/ludwig/README.md#migrating).
