//
// sbpak - A javascript utility to pack and unpack Starbound pak files.
//
// @copyright (c) 2018 Damian Bushong <katana@odios.us>
// @license MIT license
// @url <https://github.com/damianb/sbpak>
//

import * as mkdirp from 'mkdirp'
import * as path from 'path'

import * as app from 'commander'

import { SBAsset6, StreamPipeline, ExpandingFile } from 'js-starbound'

const pkg = require('../package.json')

app
  .version(pkg.version, '-v, --version')
  .arguments('<pak> <directory>')
  .action(async (pakPath: string, _destination: string) => {
    const target = path.resolve(process.cwd(), pakPath)
    const destination = path.resolve(process.cwd(), _destination)

    const pak = new SBAsset6(target)
    const result = await pak.load()

    const sfile = new StreamPipeline()

    const metaTarget = path.join(destination, '/_metadata')

    const sbuf = new ExpandingFile(metaTarget)
    await sbuf.open()
    await sfile.load(sbuf)

    await sfile.pump(Buffer.from(JSON.stringify(result.metadata, null, 2)))
    console.log(`extracted ${metaTarget}`)

    for (const file of result.files) {
      const fileTarget = path.join(destination, file)
      mkdirp.sync(path.dirname(fileTarget))

      const sbuf = new ExpandingFile(fileTarget)
      await sbuf.open()
      await sfile.load(sbuf)

      await sfile.pump(await pak.files.getFile(file))
      console.log(`extracted ${fileTarget}`)
    }

    console.log('done!')
  })
  .parse(process.argv)
