module.exports= function(app){
	// var data= [{ item: "play golf"},{ item: "sleep peacefully"}, { item: "go to mess"}];
	var bodyParser= require("body-parser");
	var urlencodedParser= bodyParser.urlencoded({extended: false});
	var mongoose= require("mongoose");
	// connecting
	
	mongoose.connect('mongodb://satya:satya@ds259305.mlab.com:59305/to-do-list-db',{ useMongoClient: true}, function(err,db){
		if(err)
		{	
			console.log(db);
			console.log("could not connect to db");
			throw err;
		}
		else
			console.log("db connection successfull");
	});
	mongoose.Promise = require("bluebird");
	// creating schema
	var todoSchema = new mongoose.Schema({
		item: String
	});
	// creating model
	var Todo = mongoose.model('Todo',todoSchema);
/*
	var itemOne = Todo({item: "watch match"}).save(function(err){
	console.log("itemOne");
//	if(err) 
//		{console.log("item error"); throw err;}
	console.log("1");
	console.log("item saved");
});
*/
	app.get('/todo',function(req,res){
		console.log('1');
		Todo.find({},function(err,data){
			if(err)
				throw err;
			res.render("todo",{ todos: data});
		});
		//res.render("todo",{todos: data});
	});
	app.post('/todo', urlencodedParser, function(req,res){
		//data.push(req.body);
		////res.end();
		var newTodo = Todo(req.body).save(function(err,data){
			if(err)
				throw err;
			res.json(data);
			console.log("Added to db");
		});
		//res.json(data);
		////res.render("todo");
	});
	app.delete('/todo/:item', function(req,res){
		/*
		data= data.filter(function(todo){
			//console.log(req.params.item);
			//console.log(todo.item);
			//console.log("-"+todo.item.replace(/ /g, '-'));
			return ("-"+(todo.item.replace(/ /g, '-')))!== req.params.item;
		});
		//res.render("todo");
		res.json(data);
		*/
		console.log(req.body);
		console.log(req.params.item);
		console.log(req.params.item.replace(/\-/g," ").substr(1));
		Todo.find({item : req.params.item.replace(/\-/g," ").substr(1)}).remove(function(err,data){
			if(err)
				throw err;
			res.json(data);
			console.log("removed from db");
		});
	});
}