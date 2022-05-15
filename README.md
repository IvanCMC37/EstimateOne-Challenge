# Tennis Calculator

The tennis calculator takes a set of scores as inputs and produces useful statistics based on those scores.

This calculator will used a simplified version of scoring where whoever gets to 6 games first wins the set

## Overview

The Tennis Calculator takes inputs in the form of a list of points of a tennis match.

Given this list of points, it will calculate the "games", "sets" and "matches" results.

From there it can be queried about various statistics around the input matches it received.

## Solution explanation & Assumption made

The solution expected the text file input to <B>have only completed matches</B>, even though it can
be supported in some sense, however that will require a bit of tweaking on the query handler
end.

During the development I have covered all of the edge cases that I can think of, in terms of scaling up to handle large size of text file that will require to replace the in memory cache approaching and replace with something prioritizes performance such as ElasticSearch.

For choice of packages, I have chose Jest for testing, Prettier for code formatting and Eslint for enforcing code quality.

## Quick Start

```bash
# Install dependencies for the application
npm install

# Run the application with sample input text file
npm start -- --file=data/full_tournament.txt

# Run the test cases
npm test
```

## Queries

### Query match result

Query scores for a particular match
Prints who defeated whom, and the result of the sets for the match (winning player score first).

Query: `Score Match <id>`

Example: `Score Match 01`

Example output:

    Person A defeated Person B
    2 sets to 0

### Query games for player

Prints a summary of games won vs lost for a particular player over the tournament
Query: `Games Player <Player Name>`

Example: `Games Player Person A`

Example output:

    23 17

## App Info

### Author

Ivan Chan
[Github](https://github.com/IvanCMC37/)

### Version

1.0.0

### License

This project is licensed under the MIT License
