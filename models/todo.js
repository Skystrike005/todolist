var mongoose = require("mongoose");

// Schema Setup
var todoSchema = new mongoose.Schema({
    completed: {type:Boolean, default:false},
    content: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("TodoList", todoSchema);