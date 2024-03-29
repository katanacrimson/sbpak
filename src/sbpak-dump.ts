//
// sbpak - A javascript utility to pack and unpack Starbound pak files.
//
// @copyright (c) 2018 Damian Bushong <katana@odios.us>
// @license MIT license
// @url <https://github.com/damianb/sbpak>
//

import * as fs from 'fs'
import * as path from 'path'
import { StringDecoder } from 'string_decoder'

import * as app from 'commander'

import { ExpandingFile, SBAsset6, StreamPipeline } from 'js-starbound'

const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json')).toString())

app
  .version(pkg.version, '-v, --version')
  .arguments('<pak> <file> [destination]')
  .action(async (pakPath: string, _filename: string, _destination?: string) => {
    try {
      const target = path.resolve(process.cwd(), pakPath)
      try {
        await fs.promises.access(target, fs.constants.R_OK)
      } catch (err) {
        throw new Error('The specified pak file does not exist.')
      }

      const pak = new SBAsset6(target)
      const result = await pak.load()
      const destination = _destination !== undefined ? path.resolve(process.cwd(), _destination) : undefined

      const filename = _filename.replace(/^\/\//, '/')

      if (!result.files.includes(filename)) {
        throw new Error(`The file ${filename} does not exist in the specified pak.`)
      }

      const content = await pak.files.getFile(filename)

      if (destination !== undefined) {
        try {
          await fs.promises.access(path.dirname(destination), fs.constants.R_OK)
        } catch (err) {
          throw new Error('The specified destination does not exist.')
        }

        const sfile = new StreamPipeline()

        const sbuf = new ExpandingFile(destination)
        await sbuf.open()
        await sfile.load(sbuf)

        await sfile.pump(content)
      } else {
        const decoder = new StringDecoder('utf8')
        console.log(decoder.end(content))
      }
    } catch (err) {
      console.error(err)
      process.exit(1)
    }
  })
  .parse(process.argv)
