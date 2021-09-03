const debug = require("debug")("model:users");
const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      minlength: 5,
      maxlength: 255,
   },
   email: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      maxlength: 255,
   },
   password: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 1024,
   },
   active: {
      type: Boolean,
      default: true,
   },
   role: {
      type: String,
      enum: ["admin", "user"],
      lowercase: true,
      default: "user",
      trim: true,
   },
   created_at: {
      type: Date,
      default: Date.now,
   },
   update_at: {
      type: Date,
      default: Date.now,
   },
});

const validate_user = (user) => {
   const schema = Joi.object().keys({
      name: Joi.string().min(5).max(255),
      email: Joi.string()
         .min(5)
         .max(255)
         .required()
         .regex(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
         )
         .error(() => "Invalid email format."),
      password: Joi.string().min(4).max(1024).required(),
      role: Joi.string().valid(["admin", "user"]),
   });

   return Joi.validate(user, schema, { abortEarly: false });
};

const password_encrypt = async (obj, next) => {
   try {
      const salt = await bcrypt.genSalt(config.get("security.saltRounds"));
      const hashed_password = await bcrypt.hash(obj.password, salt);
      obj.password = hashed_password;
      next();
   } catch (error) {
      next();
   }
};

// MIDDLEWARES
const encrypt_password_middleware = function (next) {
   const user = this;
   if (!user.isModified("password")) {
      next();
   } else {
      password_encrypt(user, next);
   }
};

const update_encrypt_password_middleware = function (next) {
   const user = this;
   if (!user.getUpdate().password) {
      next();
   } else {
      password_encrypt(user.getUpdate(), next);
   }
};

const update_updated_at_middleware = function (next) {
   let update = this.getUpdate();
   update.update_at = new Date();
   next();
};

userSchema.statics.findByEmail = function (email, projection = "") {
   return this.findOne({ email }, projection);
};

userSchema.methods.generateUserToken = function () {
   const token = jwt.sign({ _id: this._id, role: this.role }, config.get("security.jwtPrivateKey"), {
      expiresIn: config.get("security.tokenLife"),
   });
   return `Bearer ${token}`;
};

userSchema.methods.passwordMatches = function (password) {
   return bcrypt.compare(password, this.password);
};

userSchema.pre("save", encrypt_password_middleware);
userSchema.pre("update", update_encrypt_password_middleware);
userSchema.pre("update", update_updated_at_middleware);
userSchema.pre("findOneAndUpdate", update_encrypt_password_middleware);
userSchema.pre("findOneAndUpdate", update_updated_at_middleware);

const User = mongoose.model("User", userSchema);

exports.User = User;
exports.userSchema = userSchema;
exports.validate_user = validate_user;
