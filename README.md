# fasta-js

This module provides simple yet flexible FASTA parsing functionality.

## Installation
npm install fasta-js --save

## Usage
```javascript
var fastaParser = require('fasta-js');

var options = {
  'definition': 'gi|accession|description',
  'delimiter': '|'
};

var fasta = new fastaParser(options);

var sequenceData = `>gi|123456|Sequence A
ATCGATCGATCG
>gi|567890|Sequence B
CATCATCATGGG`

console.log(fasta.parse(sequenceData));
```

Output
```javascript
[ 
  { 
    gi: 'gi',
    accession: '123456',
    description: 'Sequence A',
    sequence: 'ATCGATCGATCG'
  },
  {
      gi: 'gi',
      accession: '567890',
      description: 'Sequence B',
      sequence: 'CATCATCATGGG' 
  } 
]
```

The options are of course optional. The default values are 
```javascript
{
  'definition': 'id',
  'delimiter': ''
}
```
In this case, the entire definition line for the sequence will be saved as the ID for the sequence and no delimiting will take place. If you do decide to pass in the options, then the definition will be the title of each field separated by the delimiter that you specify as the other option.

The parse function does not care whether or not you are giving it DNA/RNA/protein/whatever, but the string of fasta data must have line separations (\n). Sequences can span multiple lines.

## Tests
You can run `npm test` to run the tests after installing the development dependencies.

## Future functionality
No future functionality is planned.

## License
This software is released under the MIT license.
