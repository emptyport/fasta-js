var fastaParser = require('./index');

var options = {
    'definition': 'gi|accession|something',
    'delimiter': '|'
};
var fasta = new fastaParser(options);
console.log(fasta);

var sequences = `
>1|1|1
asdfasdfasdfasdf
>2|2|2
qwerqwerqwerqwer
>3|3|3
poiupoiupoiu
`;

console.log(fasta.parse(sequences));