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
const app = require("commander");
const js_starbound_1 = require("js-starbound");
const pkg = require('../package.json');
app
    .version(pkg.version, '-v, --version')
    .arguments('<pak>')
    .action(async (pakPath) => {
    const target = path.resolve(process.cwd(), pakPath);
    const pak = new js_starbound_1.SBAsset6(target);
    const result = await pak.load();
    console.log(target);
    console.dir(result.metadata);
})
    .parse(process.argv);
//# sourceMappingURL=sbpak-meta.js.map