"use strict";
//
// sbpak - A javascript utility to pack and unpack Starbound pak files.
//
// @copyright (c) 2018 Damian Bushong <katana@odios.us>
// @license MIT license
// @url <https://github.com/damianb/sbpak>
//
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const mkdirp = require("mkdirp");
const path = require("path");
const app = require("commander");
const js_starbound_1 = require("js-starbound");
const pkg = JSON.parse(fs.readFileSync('../package.json').toString());
app
    .version(pkg.version, '-v, --version')
    .arguments('<pak> <directory>')
    .action(async (pakPath, _destination) => {
    try {
        const target = path.resolve(process.cwd(), pakPath);
        try {
            await fs.promises.access(target, fs.constants.R_OK);
        }
        catch (err) {
            throw new Error('The specified pak file does not exist.');
        }
        const destination = path.resolve(process.cwd(), _destination);
        try {
            await fs.promises.access(path.dirname(destination), fs.constants.R_OK);
        }
        catch (err) {
            throw new Error('The specified destination does not exist.');
        }
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
            try {
                await fs.promises.access(path.dirname(fileTarget), fs.constants.R_OK);
            }
            catch (err) {
                mkdirp.sync(path.dirname(fileTarget));
            }
            const sbuf = new js_starbound_1.ExpandingFile(fileTarget);
            await sbuf.open();
            await sfile.load(sbuf);
            await sfile.pump(await pak.files.getFile(file));
            await sbuf.close();
            console.log(`extracted ${fileTarget}`);
        }
        console.log('done!');
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
})
    .parse(process.argv);
//# sourceMappingURL=sbpak-unpack.js.map