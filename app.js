var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("./models/user"),
    mongoose = require("mongoose");

// To specify the static resources, use app.use(express.static("XX")) Command
app.use(express.static('assets'));

//Require Routes
var todoRoutes = require("./routes/todos");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

// To connect to the mongoDB 
mongoose.connect("mongodb://localhost/todo_list");

//Passport config
app.use(require("express-session")({
    secret: "This is a strange secret",
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
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Todo List Started");
});