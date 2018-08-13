//
// sbpak - A javascript utility to pack and unpack Starbound pak files.
//
// @copyright (c) 2018 Damian Bushong <katana@odios.us>
// @license MIT license
// @url <https://github.com/damianb/sbpak>
//

import * as path from 'path'

import * as app from 'commander'

import { SBAsset6 } from 'js-starbound'

const pkg = require('../package.json')

app
  .version(pkg.version, '-v, --version')
  .arguments('<pak> <file>')
  .action(async (pakPath: string, _filename: string) => {
    const target = path.resolve(process.cwd(), pakPath)
    const pak = new SBAsset6(target)
    const result = await pak.load()

    const filename = _filename.replace(/^\/\//, '/')

    if (!result.files.includes(filename)) {
      throw new Error(`The file ${filename} does not exist in the specified pak.`)
    }

    const content = await pak.files.getFile(filename)
    console.log(content.toString())
  })
  .parse(process.argv)
