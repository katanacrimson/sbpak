"use strict";
//
// sbpak - A javascript utility to pack and unpack Starbound pak files.
//
// @copyright (c) 2018 Damian Bushong <katana@odios.us>
// @license MIT license
// @url <https://github.com/damianb/sbpak>
//
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const path = require("path");
const app = require("commander");
const js_starbound_1 = require("js-starbound");
const pkg = require('../package.json');
app
    .version(pkg.version, '-v, --version')
    .arguments('<pak>')
    .action(async (pakPath) => {
    try {
        const target = path.resolve(process.cwd(), pakPath);
        try {
            await fs.access(target, fs.constants.R_OK);
        }
        catch (err) {
            throw new Error('The specified pak file does not exist.');
        }
        const pak = new js_starbound_1.SBAsset6(target);
        const result = await pak.load();
        console.dir(result.metadata);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
})
    .parse(process.argv);
//# sourceMappingURL=sbpak-meta.js.map