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
  .arguments('<pak>')
  .action(async (pakPath: string) => {
    const target = path.resolve(process.cwd(), pakPath)
    const pak = new SBAsset6(target)
    const result = await pak.load()

    console.log(target)
    console.dir(result.metadata)
  })
  .parse(process.argv)
