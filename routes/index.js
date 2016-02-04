var express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    User = require("../models/user");
    
//Show register form
router.get("/register", function(req, res){
    res.render("register");
});

router.get("/login", function(req, res){
    res.render("login");
});

router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/",
        failureRedirect: "/login"
    }), function(req,res){
});

router.post("/register", function(req, res){
    var newUser = new User({username: req.body.user});
    console.log(newUser);
    User.register(newUser, req.body.pwd, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            console.log(user);
            res.redirect("/");
        });
    });
});

router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/login");
});

module.exports = router;