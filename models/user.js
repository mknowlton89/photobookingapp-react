const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs")

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: "firstName is required"
    },
    lastName: {
      type: String,
      trim: true,
      required: "lastName is required"
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: "email is required"
    },
    businessName: {
      type: String,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    openingTime: {
      type: String,
      default: '08:00'
    },
    closingTime: {
      type: String,
      default: '18:00'
    },
    appointmentInterval: {
      type: Number,
      default: 30
    }
  });

userSchema.pre("save", function (next) {
  const user = this

  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError)
      } else {
        bcrypt.hash(user.password, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError)
          }

          user.password = hash
          next()
        })
      }
    })
  } else {
    return next()
  }
})

userSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, function (error, isMatch) {
    if (error) {
      return callback(error)
    } else {
      callback(null, isMatch)
    }
  })
}

const User = mongoose.model("User", userSchema);

module.exports = User;
