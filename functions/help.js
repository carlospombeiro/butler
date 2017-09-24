const name = 'help';

var cmd = function(event, context) {
  console.log('Available commands:');
  Object.keys(context.commands).forEach(function (name) {
    console.log(context.commands[name].info && context.commands[name].info.syntax ? 
      context.commands[name].info.syntax 
      : name);
  });
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