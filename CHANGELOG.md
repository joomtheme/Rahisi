# Rahisi changelog

## 0.1.0-alpha4 — 16 September 2026

- Replace the inherited Cassiopeia back-to-top language key with Rahisi's own key.
- Supply English and Turkish translations and regression coverage for template PHP keys.
- Fix the alpha3 JED Checker finding reported by the user.
- Maintainer subsequently reported Alpha4 passing JED Checker and a successful template update on Joomla 6.1.3.

## 0.1.0-alpha3 — 16 September 2026

- Add local logo selection, alternative text and site-title/Joomla-site-name fallback.
- Add default text scale, line height, article width and three reading palettes.
- Add module controls for initial expansion, option visibility and explanatory text.
- Preserve stored preferences when controls are hidden; Reset uses current site defaults.
- Keep alpha2 localStorage format and manual activation behaviour.
- Base one template index override on official Cassiopeia 6.1.3 with GPL attribution.
- Extend tests for hidden controls, default precedence, translations and palette contrast.
- User reported JED, installation and basic front-end flows passing on alpha2.
  Alpha3 requires fresh integration/JED testing. Remote publishing remains pending.

## 0.1.0-alpha2 — 16 September 2026

- Separate source/developer files from the Joomla installer ZIP.
- Add rahisi.sys.ini aliases for the template name expected by JED Checker;
  retain the canonical tpl_rahisi runtime language files.
- Add full creation dates and JoomTheme author email/site to all four manifests.
- Add package update-server and changelog URLs for the planned JoomTheme/rahisi repo.
- Generate the installer SHA-256 into updates/update.xml during builds.
- Add regression checks for the reported JED packaging findings.
- GitHub publication, live update installation and repeat JED scan remain pending.

## 0.1.0-alpha1 — 16 September 2026

- Initial Cassiopeia child template, system plugin and reading preferences module.
- Text scaling, article spacing/contrast, local persistence and reset.
- English/Turkish translations and static/JavaScript tests.
