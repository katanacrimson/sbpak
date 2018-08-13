//
// sbpak - A javascript utility to pack and unpack Starbound pak files.
//
// @copyright (c) 2018 Damian Bushong <katana@odios.us>
// @license MIT license
// @url <https://github.com/damianb/sbpak>
//

import * as fs from 'fs-extra'
import * as path from 'path'
import * as readdir from 'recursive-readdir'

import * as app from 'commander'

import { SBAsset6 } from 'js-starbound'

const pkg = require('../package.json')

app
  .version(pkg.version, '-v, --version')
  .arguments('<directory> <pak>')
  .action(async (_source: string, pakPath: string) => {
    const source = path.resolve(process.cwd(), _source)
    const target = path.resolve(process.cwd(), pakPath)

    const pak = new SBAsset6(target)

    console.log(`creating pak ${target}`)
    console.log(`using files from ${source}`)
    const files = await readdir(source)

    const metadataFile = files.find((filename) => {
      return ['_metadata', '.metadata'].includes(path.basename(filename))
    })
    let metadata: any = null

    if (metadataFile) {
      try {
        metadata = await fs.readJson(metadataFile)
      } catch (err) {
        throw new Error(`Failed to read and parse metadata file ${metadataFile}`)
      }

      console.log('setting metadata')
      pak.metadata = metadata
    }

    files
      .filter((filename) => {
        return !(['_metadata', '.metadata'].includes(path.basename(filename)))
      })
      .forEach((filename) => {
        let pakPath = filename.substring(source.length)
        if (process.platform === 'win32') {
          pakPath = pakPath.replace(/\\/g, '/')
        }
        pak.files.setFile(pakPath, {
          source: {
            path: filename
          }
        })

        console.log(`added ${pakPath}`)
      })

    await pak.save()
    console.log('done!')
  })
  .parse(process.argv)
