var fastaParser = require('./index');

var options = {
    'definition': 'gi|accession|description',
    'delimiter': '|'
};
var fasta = new fastaParser(options);
console.log(fasta);

var sequences = `>1|1|1
asdfasdfasdfasdf
>2|2|2
qwerqwerqwerqwer
>3|3|3
poiupoiupoiu`;

var sequenceData = `>gi|123456|Sequence A
ATCGATCGATCG
ABCABCABC
>gi|567890|Sequence B
CATCATCATGGG`

console.log(fasta.parse(sequenceData));