module.exports = class fastaParser {

  constructor(options) {
    this.definition = this.opt(options, 'definition', 'id');
    this.delimiter = this.opt(options, 'delimiter', '');
    this.defineHeader(this.definition, this.delimiter);
  }

  // From here https://stackoverflow.com/questions/23577632/optional-arguments-in-nodejs-functions
  opt(options, name, default_value){
    return options && options[name]!==undefined ? options[name] : default_value;
  }

  defineHeader(definition, delimiter) {
    if(delimiter === '') {
      this.header_names = ['id'];
    }
    else {
      this.header_names = definition.split(delimiter);
    }
  }

  createEntry(line) {
    var entry = {};
    var values = [];
    if(this.delimiter === '') {
      values = [line];
    }
    else {
      values = line.slice(1).split(this.delimiter);
    }
    for(var i=0; i<values.length; i++) {
      entry[this.header_names[i]] = values[i];
    }
    return entry;
  }

  parse(input_string) {
    var sequences = [];
    var lines = input_string.split('\n');
    var currentEntry = {};
    var sequence = '';

    for(var i=0; i<lines.length; i++) {
      if(lines[i].startsWith('>')) {
        currentEntry['sequence'] = sequence;
        sequences.push(currentEntry);
        currentEntry = this.createEntry(lines[i]);
        sequence = '';
        
      }
      else {
        sequence += lines[i];
      }
    }
    currentEntry['sequence'] = sequence;
    sequences.push(currentEntry);
    sequences.shift();

    return sequences;
  }

};