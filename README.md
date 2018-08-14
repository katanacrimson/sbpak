# sbpak

## A standalone Starbound pak file multitool.

sbpak is a command-line utility for interacting with Starbound pak files.

For help, use the command `sbpak -h`

### Usage

Currently available are the following commands:

`sbpak files $pak` - which dumps out the list of files available in the pak file at **$pak**
`sbpak meta $pak` - which dumps out the metadata for the pak file at **$pak**
`sbpak pack $dir $pak` - create a new pak at **$pak** out of the files in **$dir**
`sbpak unpack $pak $dir` - export all files and metadata contained in the pak at **$pak** to **$dir**
`sbpak dump $pak $file [$dest]` - dump the contents of the file at path **$file** within the pak at **$pak**; outputs to stdout unless optional param **$dest** is specified

**WARNING**: Git for Windows users should be warned that MSys attempts to perform some path auto-translation that will backfire when using the `sbpak dump` command.
This is *not* an sbpak bug.  To work around this issue, try prepending an extra slash to the path specified as indicated in this [StackOverflow answer](https://stackoverflow.com/a/14189687/783103).

### License

Licensed under the MIT license.  See ./LICENSE for the license text.
