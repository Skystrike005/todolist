var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    TodoList = require("./models/todo"),
    User = require("./models/user"),
    mongoose = require("mongoose");

// To specify the static resources, use app.use(express.static("XX")) Command
app.use(express.static('assets'));

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(methodOverride());

// To connect to the mongoDB 
mongoose.connect("mongodb://localhost/todo_list");

// Passport setup
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});
//SETUP Routes

var todoRoutes = require("./routes/todos");
var indexRoutes = require("./routes/index");

app.use("/", todoRoutes);
app.use("/", indexRoutes);
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Todo List Started");
});