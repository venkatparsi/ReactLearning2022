var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const fs = require('fs');
var path = require('path')

const cors = require("cors");
const Axios = require("axios");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
/*
app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
})*/

app.get("/helloworld/:userName",(req,res)=>{
  console.log(req.params);
  res.send({data:"venkat"});
});

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  //console.log("Request:",req)
  res.send({ data: `Hello ${name}!` });
});

app.get('/get/folder/',(req,res) => {
  let folderName = req.query.name;
  if(folderName){
    console.log("Reading Folder:",folderName)
    var output = readDir(folderName);
   // console.log("Output: END ====>",output,"<<===");
    res.setHeader('Content-Type', 'application/json');
    res.send(output);
  }
})

app.post("/compile",cors(),(req, res) => {
  //getting the required data from the request
  let code = req.body.code;
  let language = req.body.language;
  let input = req.body.input;

  if (language === "python") {
    language = "py"
  }

  let data = ({
    "code": code,
    "language": language,
    "input": input
  });

  console.log("data:", data);

  let config = {
    method: 'post',
    url: 'https://codexweb.netlify.app/.netlify/functions/enforceCode',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };
  //calling the code compilation API
  /*Axios(config)
      .then((response)=>{
          res.send(response.data)
          console.log(response.data)
      }).catch((error)=>{
          console.log(error);
      });*/

     var output = readDir();
     console.log("Output: END ====>",output,"<<===");
     res.setHeader('Content-Type', 'application/json');
     res.send(output);
    // return output;
  })

  function dirTree(filename) {
    var stats = fs.lstatSync(filename),
      info = {
        path: filename,
        parentPath:path.dirname,
        name: path.basename(filename)
       
      };
      if(info.name=='node_modules'){
        console.log("Skipping NodeModules folder.",info.path)
        return "";
      }
      //console.log("info",info)

    if (stats.isDirectory()) {
      info.type = "directory";
      info.isExpanded=false;
      info.id = 
      info.children = fs.readdirSync(filename).map(function (child) {
        return dirTree(filename + '/' + child);
      });
    } else {
      // Assuming it's a file. In real life it could be a symlink or
      // something else!
      info.type = "file";
    }

    return info;
  }

  const isFile = fileName => {
    return fs.lstatSync(fileName).isFile();
  };

  const isDir = dirName => {
    return fs.lstatSync(dirName).isDirectory();
  };

  const readDir = (folderName) => {
    if(!folderName)
    folderName = './my-app/src/';   
    //console.log("FolderName",folderName);
    const files = fs.readdirSync(folderName);
    
    try {
      if (isDir(folderName)) {
        output = dirTree(folderName);
      }
    } catch (err) {
      console.error(err);
    }    
    return output;
  }


  //fs.writeFileSync('./my-app/src/App.js', code, err => {
    //if (err) {
      //console.error(err);
    //}
    // file written successfully

  //});




// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
