var mongoose = require("mongoose");

// Schema Setup
var todoSchema = new mongoose.Schema({
    completed: {type:Boolean, default:false},
    content: String
});

module.exports = mongoose.model("TodoList", todoSchema);