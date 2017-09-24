module.exports = {
  package: "butler",
  type: "add-command",
  command: {
    name: "commands",
    fn: function(params) {
      //ipc_maestro.emit('message', { msg:params.file });
      //console.log('Instruction uploaded.');
      console.log('test AAA.');
    }
  } 
}
