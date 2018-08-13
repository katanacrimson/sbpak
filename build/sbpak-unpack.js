"use strict";
//
// sbpak - A javascript utility to pack and unpack Starbound pak files.
//
// @copyright (c) 2018 Damian Bushong <katana@odios.us>
// @license MIT license
// @url <https://github.com/damianb/sbpak>
//
Object.defineProperty(exports, "__esModule", { value: true });
const mkdirp = require("mkdirp");
const path = require("path");
const app = require("commander");
const js_starbound_1 = require("js-starbound");
const pkg = require('../package.json');
app
    .version(pkg.version, '-v, --version')
    .arguments('<pak> <directory>')
    .action(async (pakPath, _destination) => {
    const target = path.resolve(process.cwd(), pakPath);
    const destination = path.resolve(process.cwd(), _destination);
    const pak = new js_starbound_1.SBAsset6(target);
    const result = await pak.load();
    const sfile = new js_starbound_1.StreamPipeline();
    const metaTarget = path.join(destination, '/_metadata');
    const sbuf = new js_starbound_1.ExpandingFile(metaTarget);
    await sbuf.open();
    await sfile.load(sbuf);
    await sfile.pump(Buffer.from(JSON.stringify(result.metadata, null, 2)));
    console.log(`extracted ${metaTarget}`);
    for (const file of result.files) {
        const fileTarget = path.join(destination, file);
        mkdirp.sync(path.dirname(fileTarget));
        const sbuf = new js_starbound_1.ExpandingFile(fileTarget);
        await sbuf.open();
        await sfile.load(sbuf);
        await sfile.pump(await pak.files.getFile(file));
        console.log(`extracted ${fileTarget}`);
    }
    console.log('done!');
})
    .parse(process.argv);
//# sourceMappingURL=sbpak-unpack.js.map