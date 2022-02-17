const express = require('express');
const app = express();
const Joi = require('joi');
const fs = require("fs")


function startNodeExpressServer() {

    //middleware to request handle pipeline...
    app.use(express.json());

    const data = [
        {
            id: 1,
            name: 'data1',
            content: '${this.var1}',
            contentType: 'string',
            tags: 'first,', //for tags..it should be appended with comma.
            categoryRoot: 'ui',
            categorySubject: 'react',
            categoryContext: 'tutorial',
            about: '',
            var1: '{{id::2}}'
        },
        {
            id: 2,
            name: 'hdoc',
            contentType: 'html',
            content: "<!DOCTYPE html> <html lang='en'>"+
                     "<head> <meta charset='utf-8'> <title>${this.var1}</title>"+
                     "</head> <body>  <pre>Cannot GET /api/getDataByCategory/ui</pre>"+
                     "${this.var2}  </body> </html>",
            tags: 'emmet,',//for tags..it should be appended with comma.
            categoryRoot: 'ui',
            categorySubject: 'html',
            categoryContext: 'snippet',
            about: 'plain html document snippet',
            var1: '{{id::3}}',
            var2: '{{id::4}}'
        },
        {
            id: 3,
            name: 'data3',
            content: 'Application Name',
            contentType: 'string',
            tags: 'last,third,test,', //for  tags..it should be appended with comma.
            categoryRoot: 'ui',
            categorySubject: 'react',
            categoryContext: 'test',
            about: 'Application Name which comes in automatically'
        },
        {
            id: 4,
            name: 'applogo',
            content: "<img title='${this.var4}' href='${this.var3}' class='${this.var1}'>${this.var2}</img>",
            contentType: 'string',
            tags: 'last,third,test,', //for  tags..it should be appended with comma.
            categoryRoot: 'ui',
            categorySubject: 'html',
            categoryContext: 'snippet',
            about: 'Application Name which comes in automatically',
            var1: "container",
            var2: "Just an Image.",
            var3: "https://fakeimg.pl/250x100/",
            var4: "{{id::3}}"
        }
    ]

    app.get("/",(req,res)=> {
        res.writeHead(200, { 'content-type': 'text/html' })
  fs.createReadStream('index.html').pipe(res)

    });
    app.get("style.css",(req,res)=> {
        res.writeHead(200, { 'content-type': 'text/css' })
  fs.createReadStream('style.html').pipe(res)

    });

    app.get("image-utils.js",(req,res)=> {
        res.writeHead(200, { 'content-type': 'text/javascript' })
  fs.createReadStream('image-utils.js').pipe(res)

    });


    //expressjs.com
    app.get('/helloworld', (req, res) => {
        res.send('Hello World');
    });

    app.post('/api/save/image/:name', (req, res) => {
        var fileName = req.params.name;
        var base64Data = req.body.image.replace(/^data:image\/png;base64,/, "");
        fs.writeFile(fileName+".png", base64Data, 'base64', function(err) {
        console.log(err);
        });
    });

    app.get('/usage', (req, res) => {
        res.send("simple express server with http endpoints for serving sample data, " +
            "dynamic template substitution at server side., " +
            "validate a request object using joi " +
            "setting the port number using the process.env");
    });

    app.get('/api/data', (req, res) => {
        console.log("/api/data");
        res.send(data);
    });

    app.get('/api/data/:template', (req, res) => {
        console.log("/api/data/template...");
        //var shallowData = [...data];
        var clonedData = JSON.parse(JSON.stringify(data));
        var templateMode = req.params.template;
        if (templateMode === 'eval') {
            for (dataItem of clonedData) {
                //var firstItem = shallowData[0];
                for (i = 1; i < 10; i++) {
                    varName = "var" + i;
                    if (dataItem[varName])
                        substituteEmbeddedTemplate(dataItem, varName);
                }
            }
            for (dataItem of clonedData) {
                substituteEmbeddedContent(dataItem);
            }
           
        }
        res.send(clonedData);
    });

    function substituteEmbeddedTemplate(dataItem, objectName) {
        var varVal = dataItem[objectName];
        console.log("substituteEmbeddedTemplate for objectName, its value:", objectName + " " + varVal);
        if (varVal) {
            const regex = /^{{id::(.*)}}$/;
            let m;
            console.log("substituteEmbeddedTemplate");

            if ((m = regex.exec(varVal)) !== null) {
                // The result can be accessed through the `m`-variable.
                console.log("matched results:", m);

                console.log("fullmatch:", m[0]);     // JavaScript (full match)
                console.log("first capturing group:", m[1]);
                var id = m[1];   // Script (first capturing group)
                console.log("lenght", m.length); // 2

                // Additional information:
                console.log("match index:", m.index);  // 0 (match position)
                console.log("input str", m.input);  // {{id::2}}
                m.forEach((match, groupIndex) => {
                    console.log(`Found match, group ${groupIndex}: ${match}`);
                });
                var item = findById(id);
                var substitueValue = item.content;
                dataItem[objectName] = substitueValue;
            }
        }

    }

    function substituteEmbeddedContent(dataItem) {
        console.log("calling substituteEmbeddedContent......>>>>");
        console.log("dataItem=", dataItem);
        dataItem.name = fillTemplate(dataItem.name, dataItem);
        console.log("dataItem=", dataItem);
        dataItem.content = fillTemplate(dataItem.content, dataItem);
        console.log("dataItem=", dataItem);
    }


    const fillTemplate = function (templateString, templateVars) {
        console.log("TemplateVars=", templateVars);
        //var functionGenerated = "return `" + templateString + "`;"
        //console.log("generated function:"+functionGenerated);
        //var val = new Function("return `" + templateString + "`;").call(templateVars);
        // console.log("The value evaluated..:",val);
        return new Function("return `" + templateString + "`;").call(templateVars);
    }


    function findById(id) {
        return data.find(c => c.id === parseInt(id));
    }

    function getById(id) {
        var item = getById(id);

    }

    app.get('/api/get/template/id/:id', (req, res) => {
        //parseInt is a global function in javascript.
        const item = findById(req.params.id);
        if (!item) {// 404
            res.status(404).send('The item witht he given id is not available');
        }
        res.send(item);
    });

    app.get('/api/get/data/id/:id', (req, res) => {
        //parseInt is a global function in javascript.
        const sourceDataItem = findById(req.params.id);
        var dataItem = JSON.parse(JSON.stringify(sourceDataItem));
        if (!dataItem) {// 404
            res.status(404).send('The item witht he given id is not available');
        }
       
        for (i = 1; i < 10; i++) {
                    varName = "var" + i;
                    if (dataItem[varName])
                        substituteEmbeddedTemplate(dataItem, varName);
        }
        substituteEmbeddedContent(dataItem);        
        res.send(dataItem);
    });

    app.get('/api/get/data/name/:name', (req, res) => {
        //parseInt is a global function in javascript.
        const item = data.find(c => c.name === (req.params.name));
        if (!item) {// 404
            res.status(404).send('The item witht he given id is not available');
        }
        res.send(item);
    });

    app.get('/api/get/template/name/:name', (req, res) => {
        //parseInt is a global function in javascript.
        const item = data.find(c => c.name === (req.params.name));
        if (!item) {// 404
            res.status(404).send('The item witht he given id is not available');
        }
        res.send(item);
    });


    app.get('/api/get/data/tag/:tag', (req, res) => {

        //parseInt is a global function in javascript.
        const myArr = req.params.tag.split(",");
        console.log(myArr);
        const allItems = [];
        for (input of myArr) {
            console.log("input is :", input);
            const items = data.filter(item => item.tags.search(input) >= 0);
            if (items.length > 0)
                allItems.push(items);
        }
        if (!allItems) {// 404
            res.status(404).send("No items with the given tags are found.");
        }
        res.send(allItems);
    });

    function matchExact(findStr, sourceStr) {
        var regX = '^' + findStr + '$';
        var match = str.match(regX);
        return match && str === match[0];
    }


    function filterOnCategories(req) {

        var shallowData = [...data]; //shallow copy..  

        var categoryRoot = req.params.categoryRoot;
        var categoryContext = req.params.categoryContext;
        var categorySubject = req.params.categorySubject;

        if (!categoryRoot)
            if (req.body.hasOwnProperty("categoryRoot"))
                categoryRoot = req.body.categoryRoot;

        if (!categoryContext)
            if (req.body.hasOwnProperty("categoryContext"))
                categoryContext = req.body.categoryContext;

        if (!categorySubject)
            if (req.body.hasOwnProperty("categorySubject"))
                categorySubject = req.body.categorySubject;

        if (categoryRoot) {
            shallowData = shallowData.filter(item => item.categoryRoot === categoryRoot);
        }
        if (categorySubject) {
            shallowData = shallowData.filter(item => item.categorySubject === categorySubject)
        }
        if (categoryContext) {
            shallowData = shallowData.filter(item => item.categoryContext === categoryContext)
        }

        return shallowData;

    }

    app.post('/api/getDataByTag/:tag', (req, res) => {

        var filteredData = filterOnCategories(req);
        //parseInt is a global function in javascript.
        const myArr = req.params.tag.split(",");
        console.log(myArr);
        const allItems = [];
        var items = [];
        for (tag of myArr) {
            if (req.params.tag.includes('*')) {
                items = filteredData.filter(item => item.tags.search(tag) >= 0);
            }
            else {  //rather than regex matching for string.. we are using this with comma.          
                items = filteredData.filter(item => item.tags.includes(tag + ','));
                console.log("non regex searching.");
            }
            if (items.length > 0)
                allItems.push(items);
        }
        if (!allItems) {// 404
            res.status(404).send("No items with the given tags are found.");
        }

        res.send(allItems);
    });

    app.get('/api/getDataByAbout/:about/:categoryRoot/:categorySubject/:categoryContext',
        (req, res) => {
            var filteredData = filterOnCategories(req);
            var about = req.params.about;
            if (!about)
                if (req.body.hasOwnProperty("about"))
                    about = req.body.categorySubject;
            return
        });



    app.post('/api/addData', (req, res) => {

        const dataItem = req.body;
        dataItem.id = data.length + 1;
        console.log(req.body);
        // Object destructor // extract only required object from the object returened...
        const { error } = validateDataItem(req.body); // aka result.error
        console.log("Validation result:", error);
        if (error) return res.status(400).send(error.details[0].message);

        itemNameTemplate = req.body.name;
        itemContentTemplate = req.body.content;

        const filledNameTemplate = fillTemplate(itemNameTemplate, dataItem);
        const filledContentTemplate = fillTemplate(itemContentTemplate, dataItem);

        console.log("DataTemplate,item:", itemNameTemplate, dataItem);
        console.log("Filled Name template:", filledNameTemplate);
        dataItem.name = filledNameTemplate;
        dataItem.content = filledContentTemplate;
        console.log("Filled Content template:", filledContentTemplate);
        data.push(dataItem);
        res.send(data);
    });

    //PORT
    // the value of the port is outside the application.
    console.log("process.env.PORT", process.env.PORT);
    const port = process.env.PORT || 3003;

    app.listen(port, () => console.log(`Listening on port ${port}...`));

}


function validateDataItem(item) {
    const schema = Joi.object({
        id: Joi.number().integer(),
        name: Joi.string().min(3).required(),
        content: Joi.string().min(5).required(),
        contentType: Joi.string(),
        tags: Joi.string(),
        categoryRoot: Joi.string(),
        categorySubject: Joi.string(),
        categoryContext: Joi.string(),
        about: Joi.string(),
        var1: Joi.string(),
        var2: Joi.string(),
        var3: Joi.string(),
        var4: Joi.string(),
        var5: Joi.string(),
        var6: Joi.string(),
        var7: Joi.string(),
        var8: Joi.string(),
        var9: Joi.string(),
        var10: Joi.string()
    });
    return schema.validate(item);
}

/*  Request body with dynamic template..
{
    "id":4,
    "name":"course ${this.id}"
}
output will be...
 {
        "id": 4,
        "name": "course 4"
    },

*/


//Context/Situation #1
//we are running this file in development in isolation
//we are uinsg local index.hmtl
if (process.env.NODE_ENV === 'development') {
    console.log("Running node express server...");
    startNodeExpressServer();
} else {
    console.log("Environment property NODE_ENV is not set.")
}

//Context/situation #2
//we are running the file in reuse as library or production
//through the container app
module.exports = function () { // you need to create a new object to use it...
    this.name = 'BoilerplateForNodejsApps';
    this.website = 'https://www.ayushguru.com';
    this.startServer = startNodeExpressServer; //dont use startNodeExpressServer() -- it will invoke the function.
    this.app = app;
}

/*------------------------USE AS BELOW -------------------------
https://www.geeksforgeeks.org/node-js-export-module/
const server = require("mw-nodejs-basic");
console.log("Spinning node server...");
const first_server = new server();
//console.log(first_server.startServer);
console.log(first_server.app);
console.log("Server started....") */

