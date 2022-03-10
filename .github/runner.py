#!/usr/bin/python3

import json
import os
import urllib.parse

def commit():
    os.system('git config --global user.name "github.actions"')
    os.system('git config --global user.email "actions@aknologia.dev"')
    os.system('git add .')
    os.system('git commit -m "Update Files"')
    os.system('git push')

plStart, plEnd = '<!-- START -->', '<!-- END -->';
bgStart, bgEnd = '<!-- BADGE START -->', '<!-- BADGE END -->';

with open(os.path.join(os.getcwd(), 'package.json'), 'r') as packageFile:
    packages = json.loads(packageFile.read())
    with open(os.path.join(os.getcwd(), 'README.md'), 'r') as readmeFile:
        data = readmeFile.read(); ref = data

        # Normalize Packages as Table Rows
        lines = [[], []]
        depKeys = list(packages['dependencies'].keys())
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
            else: flines[i] += lines[1][i]
        
        # Replace Old Data
        start, end = data.index(plStart) + len(plStart), data.index(plEnd)-1
        oldData = data[start:end]
        data = data.replace(oldData, "\n| Package | Version | | |\n| ------- | ------- | ------- | ------- |\n"+"\n".join(flines))
        
        start2, end2 = data.index(bgStart) + len(bgStart), data.index(bgEnd)-1
        oldData2 = data[start2:end2]
        nodeVersion, npmVersion = urllib.parse.quote_plus(packages['engines']['node']), urllib.parse.quote_plus(packages['engines']['npm'])
        data = data.replace(oldData2, '\n' + f'![NodeJS](https://img.shields.io/badge/node-{nodeVersion}-brightgreen) ![NPM](https://img.shields.io/badge/npm-{npmVersion}-blue)')

        # Write new Data if changed
        if data != ref:
            with open(os.path.join(os.getcwd(), 'README.md'), 'w') as writable:
                writable.write(data)
                writable.close()
                commit()
        readmeFile.close()
    packageFile.close()


