var bodyParser = require('body-parser')
var express = require('express');
var app = express();
console.log("Hello World");

/*
app.get("/", function(req, res){
  res.send("Hello Express");
  }
);

app.METHOD(PATH, function(request, response){
  response.TO_DO( "What to do");
})
*/

app.use(bodyParser.urlencoded({extended: false}));
console.log(bodyParser)

app.use(function(req, res, next){
  var response = req.method + " " + req.path + " - " + req.ip;
  console.log(response);
  next();
})

app.get("/", function(req, res){
  res.sendFile(__dirname + "/views/index.html");
  }
);

/*
app.get("/json", function(req, res){
  res.json({"message": "Hello json"});
  }
);
*/
/*var MESSAGE_STYLE = "uppercase";*/
let message = { "message": "Hello json" }

app.get("/json", function(req, res){
  if(process.env.MESSAGE_STYLE === "uppercase"){
    res.json({ "message": "HELLO JSON" });
  }
  else {res.json(message);
const mySecret = process.env['MESSAGE_STYLE']
}
  }
);

app.get("/now", function(req, res, next){
  req.time = new Date().toString();
  next();
}, function(req, res){
  res.json({"time": req.time});
});

app.use("/public", express.static(__dirname + "/public"))


app.get("/:word/echo", function(req, res){
  res.json({"echo": req.params.word});
  }
);

app.get("/name", function(req, res){
   console.log(req.query)/*{first: 'firstname', last: 'lastname'}*/
  res.json({name: req.query.first + " " +  req.query.last});
  }
);

// Obtenir des données à partir des requêtes POST

app.post("/name", function(req, res) {
  // Handle the data in the request
  var string = req.body.first + " " + req.body.last;
  res.json({ name: string });
});

 module.exports = app;
