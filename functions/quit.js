const name = 'quit';

var cmd = function(event, context) {
  console.log('Goodbye sire!');
  context.rl.close();
};

cmd.isValid = function(args) {
  return true;
};

cmd.params = function(args) {
  return null;
};

cmd.info = {
  syntax: name
};

module.exports[name] = cmd;