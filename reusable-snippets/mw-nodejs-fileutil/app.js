const server = require("mw-nodejs-basic");


console.log("Spinning node server...");
//();
const first_server = new server();
console.log(first_server.startServer());
console.log(first_server.app);


first_server.app.post('/addFile/:id', (req, res) => {
    const id = req.params.id;
    const content = req.body.content;
    console.log("got id as",id);
    console.log("got content as",content);

    first_server.app.get('/getFile/'+id, (req, res) =>{
        console.log("defining the content as",content);
        res.send(content);
    })

    res.send('Added Template.');
});


console.log("Server started....");