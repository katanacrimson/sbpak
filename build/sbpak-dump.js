"use strict";
//
// sbpak - A javascript utility to pack and unpack Starbound pak files.
//
// @copyright (c) 2018 Damian Bushong <katana@odios.us>
// @license MIT license
// @url <https://github.com/damianb/sbpak>
//
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const string_decoder_1 = require("string_decoder");
const app = require("commander");
const js_starbound_1 = require("js-starbound");
const pkg = require('../package.json');
app
    .version(pkg.version, '-v, --version')
    .arguments('<pak> <file>')
    .action(async (pakPath, _filename) => {
    const target = path.resolve(process.cwd(), pakPath);
    const pak = new js_starbound_1.SBAsset6(target);
    const result = await pak.load();
    const filename = _filename.replace(/^\/\//, '/');
    if (!result.files.includes(filename)) {
        throw new Error(`The file ${filename} does not exist in the specified pak.`);
    }
    const decoder = new string_decoder_1.StringDecoder('utf8');
    const content = decoder.end(await pak.files.getFile(filename));
    console.log(content);
})
    .parse(process.argv);
//# sourceMappingURL=sbpak-dump.js.map