#!/usr/bin/python3

import json
import os

def commit():
    os.system('git config --global user.name "github.actions"')
    os.system('git config --global user.email "actions@aknologia.dev"')
    os.system('git add .')
    os.system('git commit -m "Update Files"')
    os.system('git push')

plStart, plEnd = '<!-- START -->', '<!-- END -->';

with open(os.path.join(os.getcwd(), 'package.json'), 'r') as packageFile:
    packages = json.loads(packageFile)
    with open(os.path.join(os.getcwd(), 'README.md'), 'r') as readmeFile:
        data = readmeFile.read(); ref = data
        lines = []
        for pkg in list(packages['dependencies'].keys()):
            ver = packages['dependencies'][pkg]
            lines.append(f'| [{pkg}](https://www.npmjs.com/package/{pkg}) | `{ver}` |')
        start, end = data.index(plStart) + len(plStart), data.index(plEnd)-1
        oldData = data[start:end]
        data = data.replace(oldData, "| Package | Version |\n| ------- | ------- |\n"+"\n".join(lines))
        if data != ref:
            with open(os.path.join(os.getcwd(), 'README.md'), 'w') as writable:
                writable.write(data)
                writable.close()
                commit()
        readmeFile.close()
    packageFile.close()


