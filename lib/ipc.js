'use strict';

const ipc=require('node-ipc');
const global = require('./global');

ipc.config.id = global.ipc.butler.id;
ipc.config.retry = 1500;
ipc.config.silent = true;

ipc.connectToNet(global.ipc.maestro.id, global.ipc.maestro.port, function(){
    ipc.of[global.ipc.maestro.id].on('connect', function(){
        ipc.log('## connected to ' + global.ipc.maestro.id + ' ##', ipc.config.delay);
        //ipc.of[global.IPC_MAESTRO].emit('message',{msg:"hello"});
    });
    ipc.of[global.ipc.maestro.id].on('disconnect', function(){
        ipc.log('disconnected from ' + global.ipc.maestro.id);
    });
    ipc.of[global.ipc.maestro.id].on('message', function(data){
        ipc.log('got a message from ' + global.ipc.maestro.id + ': ', data);
    });
});

module.exports.ipc = ipc;
module.exports.ipc_maestro = ipc.of[global.ipc.maestro.id];