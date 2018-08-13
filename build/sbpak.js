"use strict";
//
// sbpak - A javascript utility to pack and unpack Starbound pak files.
//
// @copyright (c) 2018 Damian Bushong <katana@odios.us>
// @license MIT license
// @url <https://github.com/damianb/sbpak>
//
Object.defineProperty(exports, "__esModule", { value: true });
const app = require("commander");
const pkg = require('../package.json');
app
    .version(pkg.version, '-v, --version')
    .command('pack <directory> <pak>', 'create a new pak file')
    .command('unpack <pak> <directory>', 'unpack a pak file in the given directory')
    .command('meta <pak>', 'get the metadata for a pak file')
    .command('files <pak>', 'get the list of all files in a pak', {
    isDefault: true
})
    .parse(process.argv);
//# sourceMappingURL=sbpak.js.map