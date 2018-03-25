const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Polls = require('./polls');

// User schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
    minLength: [2, 'Username must be at least 3 characters logn']
  },
  password: {
    type: String,
    required: true
  }
}, {collection: 'users' });

// Pre: Save users hashed pwd when creating new user
UserSchema.pre('save', function(next){
  let user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function(err, salt){
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash){
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
  } else {
      return next();
  }
});

// Method to compare password with pwd in db.
UserSchema.methods.comparePassword = function(pw, cb){
  bcrypt.compare(pw, this.password, function(err, isMatch){
      if (err) {
          return cb(err);
      }
      cb(null, isMatch);
  });
}

module.exports = mongoose.model('User', UserSchema);