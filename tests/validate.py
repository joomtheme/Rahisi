#!/usr/bin/env python3
"""Static checks, not a Joomla runtime or JED Checker substitute."""
from pathlib import Path
import re
import hashlib
import io
from zipfile import ZipFile
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
checks = 0


def check(condition, message):
    global checks
    assert condition, message
    checks += 1


for manifest in [*ROOT.glob('src/*/*.xml'), ROOT / 'package/pkg_rahisi.xml']:
    xml = ET.parse(manifest).getroot()
    check(xml.tag == 'extension', str(manifest))
    check(xml.findtext('version') == '0.1.0-alpha4', 'Version mismatch')
    for field in ('name', 'author', 'authorEmail', 'authorUrl', 'license', 'description', 'creationDate'):
        check(bool(xml.findtext(field)), f'Missing {field}')
    check(xml.findtext('author') == 'JoomTheme', 'Author')
    check(xml.findtext('authorEmail') == 'support@joomtheme.com', 'Author email')
    check(xml.findtext('authorUrl') == 'https://joomtheme.com', 'Author URL')
    check(xml.findtext('creationDate') == '16 September 2026', 'Full creation date')
    for section in ('files', 'media', 'languages'):
        node = xml.find(section)
        if node is None or xml.attrib['type'] == 'package' and section == 'files':
            continue
        for item in node:
            if item.text == 'LICENSE.txt':
                check((ROOT / 'LICENSE.txt').is_file(), 'Missing GPL text')
            else:
                check((manifest.parent / node.get('folder', '') / item.text).exists(), f'Missing {item.text}')

for extension in [*ROOT.glob('src/*'), ROOT / 'package']:
    english = next((extension / 'language/en-GB').glob('*.ini'))
    turkish = extension / 'language/tr-TR' / english.name
    def parse(path):
        lines = [x for x in path.read_text().splitlines() if x and not x.startswith(';')]
        check(all(re.fullmatch(r'[A-Z0-9_]+="[^"\n]*"', x) for x in lines), f'Invalid INI: {path}')
        keys = [x.split('=', 1)[0] for x in lines]
        check(len(keys) == len(set(keys)), f'Duplicate language keys: {path}')
        return set(keys)
    check(parse(english) == parse(turkish), f'Language mismatch: {extension}')
    for language in extension.glob('language/*/*.ini'):
        parse(language)

for path in ROOT.rglob('*.php'):
    text = path.read_text()
    check("defined('_JEXEC') or die;" in text, f'Missing direct-access guard: {path}')
    check('@license' in text and '@copyright' in text, f'Missing header: {path}')

package = ET.parse(ROOT / 'package/pkg_rahisi.xml')
check([(x.get('type'), x.get('id'), x.get('group')) for x in package.findall('files/file')] == [
    ('template', 'rahisi', None), ('plugin', 'rahisi', 'system'), ('module', 'mod_rahisi', None)
], 'Package constituent IDs')
check(ET.parse(ROOT / 'src/tpl_rahisi/templateDetails.xml').findtext('parent') == 'cassiopeia', 'Parent')
template_code = (ROOT / 'src/tpl_rahisi/index.php').read_text()
template_keys = set(re.findall(r"Text::(?:_|sprintf|plural|script)\(\s*['\"]([A-Z][A-Z0-9_]+)['\"]", template_code))
for lang in ('en-GB', 'tr-TR'):
    available_keys = parse(ROOT / f'src/tpl_rahisi/language/{lang}/tpl_rahisi.ini')
    check(template_keys <= available_keys, f'Missing template translations ({lang}): {template_keys - available_keys}')
check('Joomla 6.1.3' in template_code and 'Open Source Matters' in template_code, 'Upstream provenance and licence')
check("'logo.svg'" not in template_code, 'No Cassiopeia branding fallback')
check("$app->get('sitename', '')" in template_code, 'Joomla site name fallback')
check("get('logoAlt', '')" in template_code, 'Logo alt text')
layout = (ROOT / 'src/mod_rahisi/tmpl/default.php').read_text()
keys = set(re.findall(r"\$translate\('([A-Z_]+)'\)", layout))
available = parse(ROOT / 'src/mod_rahisi/language/en-GB/mod_rahisi.ini')
check(keys <= available, 'Missing layout translation')
for extension, prefix in [('tpl_rahisi', 'TPL_RAHISI_'), ('mod_rahisi', 'MOD_RAHISI_')]:
    filename = 'templateDetails.xml' if extension == 'tpl_rahisi' else 'mod_rahisi.xml'
    definition = ET.parse(ROOT / 'src' / extension / filename)
    for lang in ['en-GB', 'tr-TR']:
        language_keys = parse(ROOT / 'src' / extension / f'language/{lang}/{extension}.ini')
        for field in definition.findall('.//field') + definition.findall('.//fieldset'):
            for attr in ('label', 'description'):
                key = field.get(attr, '')
                if key.startswith(prefix):
                    check(key in language_keys, f'Missing {lang}: {key}')
        for option in definition.findall('.//option'):
            if (option.text or '').startswith(prefix):
                check(option.text in language_keys, f'Missing option {lang}: {option.text}')

def luminance(colour):
    rgb = [int(colour[i:i+2], 16) / 255 for i in (1, 3, 5)]
    linear = [x / 12.92 if x <= .04045 else ((x + .055) / 1.055) ** 2.4 for x in rgb]
    return sum(x * weight for x, weight in zip(linear, [.2126, .7152, .0722]))

def contrast(a, b):
    light, dark = sorted([luminance(a), luminance(b)], reverse=True)
    return (light + .05) / (dark + .05)

for colours in re.findall(r"'(?:teal|slate|earth)' => \[([^\]]+)\]", template_code):
    ink, paper, link, accent = re.findall(r'#[0-9a-f]{6}', colours)
    for fg, bg in [(ink, paper), (link, paper), ('#ffffff', accent)]:
        check(contrast(fg, bg) >= 4.5, f'Palette contrast: {fg}/{bg}')
server = package.find('updateservers/server')
check(server is not None and server.get('type') == 'extension', 'Package update server')
check(server.text == 'https://raw.githubusercontent.com/JoomTheme/rahisi/main/updates/update.xml', 'Planned update URL')
for tag in ('en-GB', 'tr-TR'):
    check((ROOT / f'src/tpl_rahisi/language/{tag}/rahisi.sys.ini').is_file(), 'JED template alias')

# Check the actual built payload, not only source files. This catches the alpha1 regression.
installer = ROOT / 'dist/pkg_rahisi-0.1.0-alpha4.zip'
if installer.exists():
    with ZipFile(installer) as outer:
        check(outer.testzip() is None, 'Installer CRC')
        check(not any(n.startswith('developer/') for n in outer.namelist()), 'No developer tree in installer')
        manifests = [n for n in outer.namelist() if n.endswith('.xml')]
        check(manifests == ['pkg_rahisi.xml'], 'Only package manifest at outer level')
        root_manifest = ET.fromstring(outer.read('pkg_rahisi.xml'))
        for item in root_manifest.findall('files/file'):
            payload = 'constituents/' + item.text
            check(payload in outer.namelist(), f'Constituent: {payload}')
            with ZipFile(io.BytesIO(outer.read(payload))) as child:
                check(child.testzip() is None, f'Child CRC: {payload}')
                check('LICENSE.txt' in child.namelist(), 'Child GPL text')
                name = next(n for n in child.namelist() if n.endswith('.xml') and '/' not in n)
                definition = ET.fromstring(child.read(name))
                for section in ('files', 'media', 'languages'):
                    node = definition.find(section)
                    if node is None:
                        continue
                    for entry in node:
                        p = '/'.join(filter(None, [node.get('folder'), entry.text]))
                        exists = p in child.namelist() or any(n.startswith(p + '/') for n in child.namelist())
                        check(exists, f'Archive missing {payload}/{p}')
                if item.get('type') == 'template':
                    check('language/en-GB/rahisi.sys.ini' in child.namelist(), 'Packaged template sys alias')
    feed = ET.parse(ROOT / 'updates/update.xml')
    check(feed.findtext('update/version') == '0.1.0-alpha4', 'Feed version')
    check(feed.findtext('update/element') == 'pkg_rahisi', 'Feed element')
    check(feed.findtext('update/type') == 'package', 'Feed type')
    check(feed.findtext('update/tags/tag') == 'alpha', 'No stable prerelease')
    check(feed.findtext('update/sha256') == hashlib.sha256(installer.read_bytes()).hexdigest(), 'Update checksum')
    pattern = feed.find('update/targetplatform').get('version')
    for version in ('6.1', '6.1.3', '6.2.0', '6.10.0'):
        check(bool(re.search(pattern, version)), f'Target allow {version}')
    for version in ('5.4.0', '6.0', '6.0.9', '7.0.0', '16.1.0'):
        check(not re.search(pattern, version), f'Target reject {version}')
    changelog = ET.parse(ROOT / 'updates/changelog.xml')
    check(changelog.findtext('changelog/version') == '0.1.0-alpha4', 'Changelog version')
    print('Archive and update-feed checks included; endpoint availability NOT checked.')
print(f'PASS: {checks} static checks. PHP execution and Joomla installation NOT tested.')
