//
// sbpak - A javascript utility to pack and unpack Starbound pak files.
//
// @copyright (c) 2018 Damian Bushong <katana@odios.us>
// @license MIT license
// @url <https://github.com/damianb/sbpak>
//

import * as fs from 'fs'
import * as path from 'path'

import * as app from 'commander'

import { SBAsset6 } from 'js-starbound'

const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json')).toString())

app
  .version(pkg.version, '-v, --version')
  .arguments('<pak>')
  .action(async (pakPath: string) => {
    try {
      const target = path.resolve(process.cwd(), pakPath)
      try {
        await fs.promises.access(target, fs.constants.R_OK)
      } catch (err) {
        throw new Error('The specified pak file does not exist.')
      }

      const pak = new SBAsset6(target)
      const result = await pak.load()

      console.dir(result.metadata)
    } catch (err) {
      console.error(err)
      process.exit(1)
    }
  })
  .parse(process.argv)
