const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

// create the user schema
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
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: "Invalid email format",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

// function that authenticates user
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error(`Incorrect email or password`));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error(`Incorrect email or password`));
        }
        return user;
      });
    });
};
// Create the User model using the schema
module.exports = mongoose.model("User", userSchema);
