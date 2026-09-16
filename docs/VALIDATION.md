# Validation — 0.1.0-alpha4

## Executed successfully

- Python static suite after build: **298 checks** (manifest XML, declared payload paths,
  metadata, versions, TR/EN key parity, INI formatting, PHP direct-access guards,
  licence headers, package child IDs, template inheritance and layout translation keys,
  JoomTheme contact metadata, full dates, template language aliases, nested ZIP contents,
  absence of developer manifests in the installer, update identity/version/stability,
  installer SHA-256 and Joomla target-platform matching, new form translations,
  upstream template provenance/branding checks, template PHP translation keys in both
  languages and nine palette colour-pair checks).
- `node --check` on the shipped preferences.js: passed.
- Node VM preference suite: **94 assertions**. Defaults, every scale step,
  spacing/contrast, persistence/reload, duplicate panels, reset, malformed or
  untrusted storage, blocked storage, tab synchronisation, DOM-ready timing,
  all eight visibility combinations, saved preference/default precedence,
  reset to administrator defaults, absent panels and alpha2 storage compatibility.
- These are logic tests with small DOM/storage doubles, NOT real browser tests.
- Build script verifies ZIP CRC after building and uses deterministic entry timestamps.

## Not executed / blocked by local environment

- PHP syntax lint or execution: PHP CLI is not installed.
- Joomla 6.1.3 installation/update/uninstall: no local Joomla/PHP/database runtime.
- JED Checker: not installed/executed. No approval claim.
- Chromium UI fixture: attempted, but no Chromium executable is installed.
  The test script is included for a Playwright-enabled environment.
- Real CSS rendering, zoom/reflow, keyboard and NVDA/VoiceOver verification remain pending.
- No automated accessibility audit or WCAG conformity certification was performed.
- User reported alpha2 JED Checker and Joomla installation successful, with scaling,
  spacing, contrast, reset and persistence working. These reports do not validate alpha3.
- User reported an alpha3 JED missing back-to-top translation key; alpha4 fixes it.
  Alpha4 JED Checker has NOT been run here. The update-server declaration is supplied, but the planned
  remote endpoint is NOT published. Live availability checks remain pending.
- GitHub repository, releases and remote files were NOT created in this turn.

Use docs/ALPHA3-TR.md and docs/TESTING-TR.md for the external integration test. Report failures with
Joomla/PHP versions and exact errors. Treat this build as an alpha, not production-ready.
