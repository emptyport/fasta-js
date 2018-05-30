var test = require('tape');
var fastaParser = require('../index');

test('Default options work', function(t) {
  var fasta = new fastaParser();
  t.equal(fasta.header_names.length, 1, 'Header is not split up');
  t.equal(fasta.header_names[0], 'id', 'Header names are correct');
  t.equal(fasta.delimiter, '', 'Delimiter is correct');
  t.end();
});

test('Can set a custom header', function(t) {
  var options = {
    'definition': 'gi|accession|description',
    'delimiter': '|'
  };
  var fasta = new fastaParser(options);
  t.equal(fasta.header_names.length, 3, 'Header is correct length');
  t.equal(fasta.header_names[0], 'gi', 'gi is set');
  t.equal(fasta.header_names[1], 'accession', 'accession is set');
  t.equal(fasta.header_names[2], 'description', 'description is set');
  t.equal(fasta.delimiter, '|', 'delimiter is correct');
  t.end();
});

test('Can parse fasta data correctly', function(t) {
  var options = {
    'definition': 'gi|accession|description',
    'delimiter': '|'
  }
  var fasta = new fastaParser(options);
  var sequenceData = `>gi|123456|Sequence A\nATCGATCGATCG\n>gi|567890|Sequence B\nCATCATCATGGG`
  var data = fasta.parse(sequenceData);

  t.equal(data.length, 2, 'Correct number of sequences parsed');
  t.equal(data[0]['accession'], '123456', 'Accession for Sequence A is correct');
  t.equal(data[0]['description'], 'Sequence A', 'Description for Sequence A is correct');
  t.equal(data[0]['sequence'], 'ATCGATCGATCG', 'Sequence for Sequence A is correct');
  t.equal(data[1]['accession'], '567890', 'Accession for Sequence B is correct');
  t.equal(data[1]['description'], 'Sequence B', 'Description for Sequence B is correct');
  t.equal(data[1]['sequence'], 'CATCATCATGGG', 'Sequence for Sequence B is correct');

  t.end();
});

test('Can parse multiline sequences', function(t) {
  var options = {
    'definition': 'gi|accession|description',
    'delimiter': '|'
  }
  var fasta = new fastaParser(options);
  var sequenceData = `>gi|123456|Sequence A\nATCGATCGATCG\nABCABCABC\n>gi|567890|Sequence B\nCATCATCATGGG`
  var data = fasta.parse(sequenceData);

  t.equal(data.length, 2, 'Correct number of sequences parsed');
  t.equal(data[0]['accession'], '123456', 'Accession for Sequence A is correct');
  t.equal(data[0]['description'], 'Sequence A', 'Description for Sequence A is correct');
  t.equal(data[0]['sequence'], 'ATCGATCGATCGABCABCABC', 'Sequence for Sequence A is correct');
  t.equal(data[1]['accession'], '567890', 'Accession for Sequence B is correct');
  t.equal(data[1]['description'], 'Sequence B', 'Description for Sequence B is correct');
  t.equal(data[1]['sequence'], 'CATCATCATGGG', 'Sequence for Sequence B is correct');
  t.end();
});