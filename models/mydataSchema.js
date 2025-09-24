const mongoose = require("mongoose");
const schema = mongoose.Schema;

//@ define the Schema (the structure of the article
const userDataSchema = new schema({
  userName: String,
  age: Number,
});

//@ Create a model based on that schema
const UserData = mongoose.model("UserData", userDataSchema);

//@ export the model
module.exports = UserData;
