const mongoose = require("mongoose");
const validator = require("validator");

//create the user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value, { protocols: ["http", "https"] });
      },
      message: "You must enter a valid url",
    },
  },
});

//Create the User model using the schema
module.exports = mongoose.model("User", userSchema);
