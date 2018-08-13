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
    .arguments('<pak> <file> [destination]')
    .action(async (pakPath, _filename, _destination) => {
    const target = path.resolve(process.cwd(), pakPath);
    const pak = new js_starbound_1.SBAsset6(target);
    const result = await pak.load();
    const destination = _destination ? path.resolve(process.cwd(), _destination) : undefined;
    const filename = _filename.replace(/^\/\//, '/');
    if (!result.files.includes(filename)) {
        throw new Error(`The file ${filename} does not exist in the specified pak.`);
    }
    const content = await pak.files.getFile(filename);
    if (destination) {
        const sfile = new js_starbound_1.StreamPipeline();
        const sbuf = new js_starbound_1.ExpandingFile(destination);
        await sbuf.open();
        await sfile.load(sbuf);
        await sfile.pump(content);
    }
    else {
        const decoder = new string_decoder_1.StringDecoder('utf8');
        console.log(decoder.end(content));
    }
})
    .parse(process.argv);
//# sourceMappingURL=sbpak-dump.js.map