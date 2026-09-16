#!/usr/bin/env python3
"""Build reproducible Joomla packages using only the Python standard library.
Copyright (C) 2026 Rahisi Contributors. GPL-2.0-or-later.
"""
from pathlib import Path
from zipfile import ZipFile, ZipInfo, ZIP_DEFLATED
import hashlib
import io
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parent
VERSION = ET.parse(ROOT / 'package/pkg_rahisi.xml').findtext('version')
DIST = ROOT / 'dist'


def archive(files):
    output = io.BytesIO()
    with ZipFile(output, 'w', ZIP_DEFLATED) as target:
        for name, data in sorted(files):
            info = ZipInfo(name, (2026, 9, 16, 0, 0, 0))
            info.compress_type = ZIP_DEFLATED
            info.external_attr = 0o100644 << 16
            target.writestr(info, data)
    return output.getvalue()


def tree(path):
    return [(p.relative_to(path).as_posix(), p.read_bytes()) for p in path.rglob('*') if p.is_file()]


def main():
    DIST.mkdir(exist_ok=True)
    files = tree(ROOT / 'package')
    license_bytes = (ROOT / 'LICENSE.txt').read_bytes()
    for extension in ('tpl_rahisi', 'plg_system_rahisi', 'mod_rahisi'):
        contents = tree(ROOT / 'src' / extension)
        contents.append(('LICENSE.txt', license_bytes))
        files.append((f'constituents/{extension}.zip', archive(contents)))
    files.extend(('docs/' + n, d) for n, d in tree(ROOT / 'docs'))
    files.append(('LICENSE.txt', license_bytes))
    output = DIST / f'pkg_rahisi-{VERSION}.zip'
    output.write_bytes(archive(files))
    with ZipFile(output) as check:
        assert check.testzip() is None
    digest = hashlib.sha256(output.read_bytes()).hexdigest()
    # Feed is outside the installer, avoiding a circular ZIP/checksum dependency.
    feed = ET.parse(ROOT / 'updates/update.xml')
    entry = feed.find('update')
    assert entry.findtext('version') == VERSION, 'Update feed version mismatch'
    entry.find('sha256').text = digest
    ET.indent(feed, space='    ')
    feed.write(ROOT / 'updates/update.xml', encoding='utf-8', xml_declaration=True)
    sources = []
    for folder in ('src', 'tests', 'docs', 'package', 'updates'):
        sources.extend((folder + '/' + n, d) for n, d in tree(ROOT / folder)
                       if '__pycache__' not in n)
    for name in ('build.py', 'README.md', 'LICENSE.txt', 'CHANGELOG.md', '.gitignore'):
        sources.append((name, (ROOT / name).read_bytes()))
    source_output = DIST / f'rahisi-source-{VERSION}.zip'
    source_output.write_bytes(archive(sources))
    with ZipFile(source_output) as check:
        assert check.testzip() is None
    print(f'{output}\nSHA256 {digest}\n{source_output}')


if __name__ == '__main__':
    main()
