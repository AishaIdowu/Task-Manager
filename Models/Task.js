const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    //Validations for name
    type: String,
    required: [true, "Must provide name"],
    trim: true, //No whitespace
    maxlength: [20, "Name can not be longer than 20 characters"],
  },
  completed: {
    type:Boolean,
    default:false
  }
});

module.exports = mongoose.model("Task", TaskSchema);
