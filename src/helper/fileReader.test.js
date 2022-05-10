/* eslint-disable no-undef */
const { fileReader, lineReader } = require('./fileReader');

describe('File reader testing', () => {
  it('File not located', () => {
    expect(() => fileReader('')).toThrowError('ENOENT');
  });

  it('File content cannot be empty', () => {
    expect(() => lineReader('')).toThrow(SyntaxError);
  });

  it('File content cannot be \n (lineBreaker)', () => {
    expect(() => lineReader('\n')).toThrow(SyntaxError);
  });

  it('Full loaded successfully', () => {
    const result = fileReader('data/test_data/file_load.txt');
    expect(result[0]).toStrictEqual(true);
  });

  it('matchParser error', () => {
    expect(() =>
      fileReader('data/test_data/matchParser_error.txt')
    ).toThrowError('Parser error with line 0 : Person A vs Person B');
  });

  it('playerParser error', () => {
    expect(() =>
      fileReader('data/test_data/playerParser_error.txt')
    ).toThrowError('Parser error with line 1 : Match: 01');
  });

  it('scoreParser error', () => {
    expect(() =>
      fileReader('data/test_data/scoreParser_error.txt')
    ).toThrowError('Parser error with line 5 : Person A vs Person B');
  });

  it('empty line will be skipped', () => {
    const result = fileReader('data/test_data/empty_file.txt');
    expect(result[0]).toStrictEqual(true);
  });

  it('Finished parsing full match', () => {
    const result = fileReader('data/test_data/full_tournament.txt');
    expect(result[0]).toStrictEqual(true);
  });
});
