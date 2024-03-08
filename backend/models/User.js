const mongoose = require("mongoose");

// User schema definition
const userSchema = new mongoose.Schema({
  googleId: { type: String, unique: true, sparse: true },
  githubId: { type: String, unique: true, sparse: true },
  displayName: String,
  firstName: String,
  lastName: String,
  image: String,
  email: { type: String, unique: true, sparse: true },
  created_at: { type: Date, default: Date.now },
});

// Adds a method to find or create a user
userSchema.statics.findOrCreate = async function (condition, doc) {
  let user = await this.findOne(condition);
  if (!user) {
    user = await this.create(doc);
  }
  return user;
};

const User = mongoose.model("User", userSchema);
module.exports = User;