function invalidParserError(index, line) {
  const parserError = `Parser error with line ${index} : ${line}`;
  return parserError;
}

function invalidInputError(line) {
  const inputError = `Command "${line}" is not valid, please try again`;
  return inputError;
}

module.exports = { invalidParserError, invalidInputError };
