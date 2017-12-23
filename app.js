var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var todoController = require("./controllers/todoControllers");
var port = process.env.PORT || 3000;

// checking manually (did not work)
/*
var itemOne = Todo({item: "watch ma
tch"}).save(function(err){
console.log("3");
//	if(err) 
//		{console.log("item error"); throw err;}
	console.log("1");
	console.log("item saved");
});
*/
app.set("view engine" , "ejs");

//var mybodyParser

app.use(express.static('./public'));
todoController(app);
app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});