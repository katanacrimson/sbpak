//
// sbpak - A javascript utility to pack and unpack Starbound pak files.
//
// @copyright (c) 2018 Damian Bushong <katana@odios.us>
// @license MIT license
// @url <https://github.com/damianb/sbpak>
//

import * as app from 'commander'

const pkg = require('../package.json')

app
  .version(pkg.version, '-v, --version')
  .command('files <pak>', 'get the list of all files in a pak', {
    isDefault: true
  })
  .command('meta <pak>', 'get the metadata for a pak file')
  .command('dump <pak> <file>', 'dump out the contents of a file within a pak')
  .command('pack <directory> <pak>', 'create a new pak file')
  .command('unpack <pak> <directory>', 'unpack a pak file in the given directory')
  .parse(process.argv)
