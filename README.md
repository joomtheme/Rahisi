# Rahisi

Reading preferences for Joomla 6, by [JoomTheme](https://joomtheme.com).
A Cassiopeia child template, system plugin and reading preferences module, with
English and Turkish translations.

**Current release: 0.1.0-alpha4 — testing only.** An independent project, not an
official Joomla product or a WCAG conformance certification.

## Download and install

Download [pkg_rahisi-0.1.0-alpha4.zip](https://github.com/joomtheme/Rahisi/releases/download/v0.1.0-alpha4/pkg_rahisi-0.1.0-alpha4.zip)
from the [release page](https://github.com/joomtheme/Rahisi/releases/tag/v0.1.0-alpha4).
Do not install GitHub's automatically generated source-code ZIP in Joomla.

Requirements: Joomla 6.1 or later within the 6.x series, PHP 8.3 or later, and
Cassiopeia installed. User testing targets Joomla 6.1.3; not every supported
combination has been verified.

1. Back up your site and use a staging environment.
2. Upload the package through Joomla's extension installer.
3. For a first installation, select the Rahisi child template, enable
   **System - Rahisi**, and publish the Rahisi module in `main-top` on test pages.
4. Existing users can install over their current Rahisi installation without
   uninstalling. Clear caches and verify the preferences.

Installation does not automatically change the default template, enable the
plugin, publish a module or modify existing content.

Installer SHA-256:

```text
7f8c91bce043a2220728ffe49b748b02c75ce48bce058a581db8ae4725b867c9
```

## Features

- Text scaling from 100% to 200%, article spacing and article contrast controls.
- Browser-local preference persistence and reset to current template defaults.
- Local logo, alternative text and site-name branding fallback.
- Default text scale, line height, article width and three colour palettes.
- Module control visibility, help text and initial expansion settings.
- English and Turkish; no telemetry or remote reading service.

Article controls target `.com-content-article__body`, not every site component.
Hidden controls retain saved preferences. The child template's `index.php` is
based on official Cassiopeia 6.1.3; other layouts remain inherited. No Joomla
core files are changed. Compare this override with upstream on future upgrades.

## Validation

- 298 static checks and 94 Node VM preference-logic assertions passed locally.
- The maintainer reported Alpha4 passing JED Checker and a successful template
  update on Joomla 6.1.3. This is not a JED listing or approval claim.
- Earlier user testing confirmed scaling, spacing, contrast, reset and persistence.

## Update feed

- [Update XML](https://raw.githubusercontent.com/joomtheme/Rahisi/main/updates/update.xml)
- [Joomla changelog XML](https://raw.githubusercontent.com/joomtheme/Rahisi/main/updates/changelog.xml)
- [Human-readable changelog](CHANGELOG.md)

The feed identifies this release as **alpha** and references the published
installer and its verified GitHub-reported SHA-256 digest.

## Development

```sh
python3 build.py
python3 tests/validate.py
node --check src/plg_system_rahisi/media/js/preferences.js
node tests/preferences.cjs
```

The build uses Python's standard library and produces installer/source ZIPs in
`dist/`. It updates the local feed checksum to match the generated installer.
Do not publish a changed checksum without its matching installer. Never overwrite
an existing published release with different bytes.

No Composer/npm packages are required by the extensions at runtime.
`node tests/browser.cjs` is an optional isolated fixture requiring Playwright
and Chromium, not a Joomla integration test. Run PHP syntax lint with a compatible
PHP CLI before future releases.

## Documentation

- [Current publication status and release checklist](RELEASING.md)
- [Alpha4 fix and tests (Turkish)](docs/ALPHA4-TR.md)
- [Alpha3 settings guide (Turkish)](docs/ALPHA3-TR.md)
- [Integration tests (Turkish)](docs/TESTING-TR.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Build-time validation report](docs/VALIDATION.md)

The `docs/` files retain their original Alpha4 build-time state, including notes
that publication/JED testing was pending. This README and RELEASING.md record
subsequent progress. Keeping packaged files unchanged preserves the installer hash.

## Support and license

Report reproducible bugs through [GitHub Issues](https://github.com/joomtheme/Rahisi/issues)
with Joomla/PHP versions, Rahisi version, steps and exact errors. Do not include
credentials or private site data.

Contact: support@joomtheme.com · [joomtheme.com](https://joomtheme.com)

GPL-2.0-or-later; see [LICENSE.txt](LICENSE.txt). The original repository
[LICENSE](LICENSE) is preserved.
