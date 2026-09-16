# Rahisi — architecture and official references

Target: Joomla 6.1.x, PHP 8.3+, existing Cassiopeia. Requested integration target: 6.1.3.
This release deliberately does not claim support for earlier Joomla 6.0 or Joomla 5.

- Template `rahisi`: `<parent>cassiopeia</parent>`, own `media/css/user.css` and, from alpha3,
  a site index override derived from Cassiopeia 6.1.3. Other layouts are inherited.
- Plugin `system/rahisi`: PSR-4, service provider, Joomla 6.1 config-only CMSPlugin
  construction, SubscriberInterface and typed BeforeCompileHeadEvent.
- Module `mod_rahisi`: service provider, AbstractModuleDispatcher, escaped translated layout.
- Package `pkg_rahisi`: matching child IDs, upgrade install, blockChildUninstall.
- Web Asset Manager registers local assets. No duplicated Bootstrap, jQuery, CDN or font downloads.
- Plugin runs only on the site HTML document with active template `rahisi`.
- Browser preferences are validated, stored under a site-path-specific localStorage key,
  synchronised across module instances/tabs, and resettable. No account or server writes.
- UI remains disabled if JS fails; base readable template and browser zoom remain usable.
- No installer database queries or forced template/plugin/module activation.
- Normal default text is 1.125rem; percentage selection scales the root and rem-based controls.
- Spacing and contrast affect standard single-article body markup only. Inline author colours,
  custom overrides and third-party components need separate review. No blanket CSS inversion.

## Official sources consulted

https://manual.joomla.org/docs/

https://manual.joomla.org/docs/building-extensions/plugins/basic-content-plugin/

https://manual.joomla.org/docs/building-extensions/plugins/plugin-events/application/

https://manual.joomla.org/docs/general-concepts/web-asset-manager/

https://manual.joomla.org/docs/building-extensions/modules/module-development-tutorial/step8-dependency-injection/

https://manual.joomla.org/docs/building-extensions/modules/module-development-tutorial/step10_abstract_module_dispatcher/

https://manual.joomla.org/docs/building-extensions/install-update/installation/package/

https://manual.joomla.org/docs/building-extensions/templates/template-details-file/

https://guide.joomla.org/user-manual/templates/templates-child-templates

The Manual's general template implementation page is unfinished; the official user
guide supplements it for inheritance/user.css. Alpha3's branding override was checked
against the official 6.1.3 index.php (SHA recorded in the file header):
https://github.com/joomla/joomla-cms/blob/6.1.3/templates/cassiopeia/index.php

The override retains the upstream GPL copyright header. It replaces only the branding
block and adds allowlisted reading-default CSS; this creates a maintenance obligation
to compare the override with upstream on subsequent Joomla releases.
New alpha3 rendering/installation still requires integration verification.

https://manual.joomla.org/docs/general-concepts/forms-fields/standard-fields/media/

## Alpha3 behaviour

- Logo is selected with Joomla's media field; only relative local paths are used.
- Brand precedence: valid logo, custom site title, Joomla site name, then Rahisi.
- Alt text precedence: configured alternative text, then effective site title.
- Saved site-wide reading preferences override active style defaults; Reset removes
  storage and uses the current style's default scale. Storage key remains v1, so alpha2
  saved values survive the upgrade. No settings/content database migration.
- Module visibility is presentation-only, per instance. Hidden values still apply and
  are not erased when another visible control changes. Reset is always present.
- Help uses translated, escaped text and aria-describedby with per-module IDs.
- Default scale, line height, width and palette use fixed allowlists before CSS output.
- Palette colour-pair calculations are not a whole-site WCAG conformity audit.

## Intentionally deferred

Reader mode, editor audit, content mutation, speech synthesis, site-wide contrast,
live update publication/testing, full WCAG audit and public JED submission.

## Alpha2 packaging changes

Installer and source archives are separate. Full creation dates and JoomTheme
contact metadata are in all manifests. Canonical tpl_rahisi language files remain,
with rahisi.sys.ini aliases added for the name expected by the supplied JED report.
Updates are package-level only to avoid partial, mismatched child upgrades.
updates/update.xml uses alpha stability, Joomla 6.1+ within 6.x, PHP 8.3+, SHA-256,
and the exact release asset name. Planned GitHub URLs are not yet live.

Additional official references:

https://manual.joomla.org/docs/building-extensions/install-update/update-server/

https://manual.joomla.org/docs/building-extensions/install-update/installation/change-log/

Joomla is a trademark of Open Source Matters, Inc. Rahisi is an independent project;
no endorsement or affiliation is claimed. Brand clearance is pending.
