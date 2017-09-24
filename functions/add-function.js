const name = 'add-function';

const fs = require('fs');
const { fileExistsSync } = require('../lib/utils');

var cmd = function(event, context) {
  let path = event.data.file;

  if (!path.startsWith('/'))
    path = context.path.root + path;
  
  if (!fileExistsSync(path)) {
    console.log("Can't find file " + path);
  }
  else {
    const pathFn = path.replace('.json', '.js');

    if (!fileExistsSync(pathFn)) {
      console.log("Can't find function file " + pathFn);
    }
    else {
      context.ipc.maestro.emit('message', { msg: path });
      console.log('Instruction uploaded.');
    }
  }
};

cmd.isValid = function(args) {
  if (args.length < 2) return false;
  if (!args[1]) return false;

  return true;
};

cmd.params = function(args) {
  if (!cmd.isValid(args))
    return null;

  return {
    file: args[1]
  };
};

cmd.info = {
  syntax: name + ' <file>'
};

module.exports[name] = cmd;