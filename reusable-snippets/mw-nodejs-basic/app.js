const path = require('path');

//require('path'); // node assumes built in module.. if no slash or period.
const os = require('os');
var totalMemory = os.totalmem();
var freeMemory = os.freemem();

console.log('Total memory: ' + totalMemory);
console.log(`Total Memory ${totalMemory}`);
console.log(`Total Memory ${freeMemory}`);

var fs = require('fs');
//synchronous method.
const files = fs.readdirSync('./');
console.log(files);
//asynchronous method. and the callback funda...
fs.readdir('./',function(err,files){
    if(err) console.log('Error',err);
    else console.log('Result',files);
});

var pathObj = path.parse(__filename);

/********* using the extended Event Emitter  */
const Logger = require('./logger');
const logger = new Logger();

logger.on('messageLogged', (args) => {
    console.log('Listener called',args);
})

logger.log('My Message');

/*************************  HTTP Package... */
const http = require('http');
//server is an event emitter..
/*
server.on('connection',(socket)=>{
    console.log('New Connection');
    
});*/
server = http.createServer((req,res) => {
    if(req.url ==='/'){ res.write('Hello world');
        res.end();
    }
    else if(req.url ==='/api/courses'){
        res.write(JSON.stringify([1,2,3]));
        res.end();
    }

});
server.listen(3000);
console.log('Listening on http://localhost:3000');



