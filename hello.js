const name = 'hello';

var cmd = function(event, context) {
  console.log('Hello!!!!');
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