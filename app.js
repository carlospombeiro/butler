'use strict';

const fs = require('fs'),
      readline = require('readline'),
      { ipc_maestro } = require('./lib/ipc');

var context = { 
  commands: {}, 
  ipc: { maestro: ipc_maestro },
  path: {
    root: __dirname + '/'
  }
};

context.rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

context.rl.setPrompt('sire? ');
context.rl.prompt();
context.rl.on('line', function(line) {
  var cmd = commandKnown(line);

  if (cmd)
    runCommand(cmd, context);

  context.rl.prompt();

}).on('close',function(){
  process.exit(0);
});




function commandKnown(commandline) {
  const ws = commandline.split(' ');

  if (ws.length == 0 || commandline == '') {
    console.log("sorry, don't understand...");
    return null;
  }
  else {
    const cmd = ws[0].toLowerCase();

    if (cmd == 'quit')
      return { name: 'quit', params: null, isValid: true };;

    if (context.commands[cmd])
      return { name: cmd, params: context.commands[cmd].params(ws), isValid: context.commands[cmd].isValid(ws) };
  }

  console.log("sorry, don't know how...");
  return null;
};

function runCommand(command, context) {
  if (!command.isValid) {
    console.log('Please repeat...');
  }
  else {
    const event = { data: command.params };
    context.commands[command.name](event, context);
  }
};

// load extensions
require('fs').readdirSync(__dirname + '/functions').forEach(function (file) {
  var extension = require(__dirname + '/functions/'+file);

  Object.keys(extension).forEach(function (key) {
    context.commands[key] = extension[key];
  });

  //module.exports[path.basename(file, '.js')] = require(path.join(__dirname, file));
});
