import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import commandConvert from './commands/convert.js'

export function runCli(processArgv) {
  yargs(hideBin(processArgv))
    .example(
      '$0 example.png example.schem',
      'Convert image example.png and save schem'
    )
    .command(
      ['$0 <image> [schem]'],
      'Convert image file Sponge/WorldEdit schem file',
      () => {},
      commandConvert
    )
    .positional('image', {
      describe: 'path to image file',
      type: 'string',
      demandOption: true,
      normalize: true,
    })
    .positional('schem', {
      describe: 'path where schem file write to',
      type: 'string',
      normalize: true,
      implies: ['schem'],
    })
    .detectLocale(false)
    .version('0.0.0')
    .help()
    .parse()
}
