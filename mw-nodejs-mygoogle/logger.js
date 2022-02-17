console.log("__filename:"+__filename);
console.log("__dirname:"+__dirname);
var EventEmitter = require('events');
var url = 'http://mylogger.io/log';
class Logger extends EventEmitter {

     log(message){
        //send an http request.
        console.log("Logging from Logger",message);
        //Rasie and event 
        this.emit('messageLogged',{id:1,url:'http://'});
    }
}

module.exports = Logger;