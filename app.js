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

//SETUP Routes

var todoRoutes = require("./routes/todos");

app.use("/", todoRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Todo List Started");
});