const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    max: 50,
    unique: true
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    min: 6,
    default: "hello",
  },
  authType: {
    type: String,
    enum: ["google", "local"],
    default: "local",
  },
  authGoogleID: {
    type: String,
  },

  faculty: {
    type: String,
  },

  class: {
    type: String,
  },

  avatar: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  updateAt: {
    type: Date,
  },
  role: {
    type: String,
    enum: ["admin", "faculty", "student"],
    default: "student",
  },
  // isAdmin: {
  //   type: Boolean,
  //   default:[],
  // },
  manageTopic: {
    type: Schema.Types.ObjectId,
    ref: "TypeInform"
  },
  hookEnabled: {
    type: Boolean,
    default: false,
  },
  post: [{
    type: Schema.Types.ObjectId,
    ref: "Post"
  }],
}, {
  usePushEach: true,
});

userSchema.pre("save", async function (next) {
  try {
    if (this.authType == "google") next();

    if (this.hookEnabled == true) {
      const salt = await bcrypt.genSalt(10);

      const passwordHash = await bcrypt.hash(this.password, salt);
      console.log("hello");
      this.password = passwordHash;
      this.hookEnabled = false;
    }
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
