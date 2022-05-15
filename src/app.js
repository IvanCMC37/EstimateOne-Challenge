const { fileReader } = require('./helper/fileReader');
const yargs = require('yargs');
const { splashPageHandler } = require('./helper/queryHandler');

const command = yargs
  .option('file', {
    alias: 'f',
    description: 'Insert file to be loaded for scoring...',
    type: 'string',
  })
  .demandOption(['file'], 'File is required')
  .help()
  .alias('help', 'h').argv;

try {
  const [_, matchDetailMap, playerStatsMap] = fileReader(command.file);

  splashPageHandler(matchDetailMap, playerStatsMap);
} catch (error) {
  console.error(error);
}
