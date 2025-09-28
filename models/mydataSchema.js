const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//@ define the Schema (the structure of the article)
const userDataSchema = new Schema({
  userName: String,
  age: Number,
});

//@ Create a model based on that schema
const UserData = mongoose.model("UserData", userDataSchema);

//@ export the model
module.exports = UserData;
