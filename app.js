var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var todoController = require("./controllers/todoControllers");

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
app.listen("3000");