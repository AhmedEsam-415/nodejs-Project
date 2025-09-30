const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//@ define the Schema (the structure of the article)
const customerSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    telephone: String,
    age: Number,
    country: String,
    gender: String,
  },
  { timestamps: true }
);

//@ Create a model based on that schema
const CustomerData = mongoose.model("CustomerData", customerSchema);

//@ export the model
module.exports = CustomerData;
