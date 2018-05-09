const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Country = require("./country");

let userSchema = new Schema(
  {
    name: String,
    email: String,
    avatar: String,
    googleId: String,
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: "Country"
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);
