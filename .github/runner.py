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
    packages = json.loads(packageFile.read())
    with open(os.path.join(os.getcwd(), 'README.md'), 'r') as readmeFile:
        data = readmeFile.read(); ref = data

        # Normalize Packages as Table Rows
        lines = [[], []]
        depKeys = packages['dependencies'].keys()
        firstHalf = depKeys[:round(len(depKeys)/2)]
        latterHalf = depKeys[round(len(depKeys)/2):]
        for pkg in list(firstHalf):
            ver = packages['dependencies'][pkg]
            lines[0].append(f'| [{pkg}](https://www.npmjs.com/package/{pkg}) | `{ver}` |')
        for pkg in list(latterHalf):
            ver = packages['dependencies'][pkg]
            lines[1].append(f' [{pkg}](https://www.npmjs.com/package/{pkg}) | `{ver}` |')
        flines = []
        for l in lines[0]: flines.append(l)
        for i in range(len(lines[1])):
            if(len(lines[1]) <= i): flines.append('|'+lines[1][i] + ' | |')
            else: flines.append(lines[1][i])
        
        # Replace Old Data
        start, end = data.index(plStart) + len(plStart), data.index(plEnd)-1
        oldData = data[start:end]
        data = data.replace(oldData, "\n| Package | Version | | |\n| ------- | ------- | ------- | ------- |\n"+"\n".join(lines))
        
        # Write new Data if changed
        if data != ref:
            with open(os.path.join(os.getcwd(), 'README.md'), 'w') as writable:
                writable.write(data)
                writable.close()
                commit()
        readmeFile.close()
    packageFile.close()


