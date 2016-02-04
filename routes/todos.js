var express = require("express"),
    router = express.Router(),
    TodoList = require("../models/todo");
//Index Route
router.get("/", function(req, res){
    TodoList.find({}, function(err, todos){
        if(err){
            console.log(err);
        } else {
            res.render("index", {todos: todos});
        }
    });
});

//Create Route
router.post("/new", function(req, res){
    var newTask = {content: req.body.task};
    TodoList.create(newTask, function(err, newCreate){
        if(err){
            console.log(err);
        } else {
            res.redirect("/");
        }
    });
});

//UPDATE status ROUTE
router.post("/:id/:status", function(req,res){
    TodoList.update({_id:req.params.id},{$set:{completed:req.params.status}},function(err, update){
        if(err){
            console.log(err);
        } else {
            console.log(update);
        }
    });
});

//DELETE ROUTE
router.delete("/:id", function(req, res){
    console.log(req.params.id);
    TodoList.findByIdAndRemove(req.params.id, function(err, deleted){
        if(err){
            console.log(err);
        } else {
            console.log(deleted);
        }
    });
});