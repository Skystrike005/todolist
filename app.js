var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    TodoList = require("./models/todo"),
    mongoose = require("mongoose");

// To specify the static resources, use app.use(express.static("XX")) Command
app.use(express.static('assets'));

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(methodOverride());

// To connect to the mongoDB 
mongoose.connect("mongodb://localhost/todo_list");

//Index Route
app.get("/", function(req, res){
    TodoList.find({}, function(err, todos){
        if(err){
            console.log(err);
        } else {
            res.render("index", {todos: todos});
        }
    })
})

//Create Route
app.post("/new", function(req, res){
    var newTask = {content: req.body.task};
    TodoList.create(newTask, function(err, newCreate){
        if(err){
            console.log(err);
        } else {
            res.redirect("/");
        }
    });
})
//UPDATE status ROUTE
app.post("/:id/:status", function(req,res){
    TodoList.update({_id:req.params.id},{$set:{completed:req.params.status}},function(err, update){
        if(err){
            console.log(err);
        } else {
            console.log(update);
        }
    });
});

//DELETE ROUTE
app.delete("/:id", function(req, res){
    console.log(req.params.id);
    TodoList.findByIdAndRemove(req.params.id, function(err, deleted){
        if(err){
            console.log(err);
        } else {
            console.log(deleted);
        }
    });
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Todo List Started");
});