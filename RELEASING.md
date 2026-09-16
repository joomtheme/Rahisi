# Publication status — 16 September 2026

## Alpha4

- Public repository: https://github.com/joomtheme/Rahisi, main branch.
- Published tag: `v0.1.0-alpha4`.
- Installer: `pkg_rahisi-0.1.0-alpha4.zip`, 58,808 bytes.
- GitHub asset digest matches the local installer:
  `7f8c91bce043a2220728ffe49b748b02c75ce48bce058a581db8ae4725b867c9`.
- Maintainer reported JED Checker passing and the template update succeeding.
- Sources and update/changelog feeds are supplied in this repository import.
- Packaged code and documentation remain unchanged to preserve installer bytes.

## Remaining manual actions

1. Edit the Alpha4 release and select **Set as a pre-release**. GitHub reported
   `prerelease: false` at inspection, despite the alpha name and release text.
2. Optionally attach `rahisi-source-0.1.0-alpha4.zip`; only the installer was attached
   at inspection. GitHub's automatic source ZIP is not a Joomla installer.
3. The Alpha4 tag predates this source import and points to the initial README/LICENSE
   commit. It has deliberately not been moved. Use main for current source or the
   separately generated developer archive. Future tags must reference tested source.
4. On a backed-up test site, enable the Rahisi update site and verify feed retrieval.
   An actual offered upgrade requires an older installed version and an update
   stability setting that permits alpha releases. Alpha4 should not offer itself
   as a newer version to an already updated Alpha4 installation.

## Future releases

1. Update versions consistently in manifests, assets, tests, README and feeds.
2. Update CHANGELOG.md and updates/changelog.xml.
3. Build with `python3 build.py`; run static, JavaScript, PHP, JED Checker, Joomla
   integration and manual accessibility tests.
4. Commit tested source, then create the matching version tag.
5. Publish installer and optional developer ZIPs as release assets.
6. Verify the asset SHA-256 against updates/update.xml before publishing the feed.
   Mark prereleases appropriately.
7. Verify the public feed, changelog and download; test a Joomla upgrade.

Never overwrite a published installer with different bytes under the same version.
Never commit credentials, site configuration, database exports or private data.
