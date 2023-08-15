const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Import the jsonwebtoken library

const userSchema = new mongoose.Schema({
   username: { type: String, required: true },
   email: { type: String, required: true, unique: true },
   password: { type: String, required: true },
});

// Method to generate a JWT token for the user
userSchema.methods.generateAuthToken = function () {
   const token = jwt.sign({ _id: this._id }, 'your_secret_key'); // Sign the token with a secret key
   return token;
};

// Static method to find a user by email and compare passwords
userSchema.statics.findByCredentials = async (email, password) => {
   const user = await User.findOne({ email });
   if (!user) {
       throw new Error('Invalid login credentials');
   }

   const isMatch = await bcrypt.compare(password, user.password);
   if (!isMatch) {
       throw new Error('Invalid login credentials');
   }

   return user;
};

// Hash the password before saving it to the database
userSchema.pre('save', async function (next) {
   if (this.isModified('password')) {
       this.password = await bcrypt.hash(this.password, 8); // Hash the password with a salt factor of 8
   }
   next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
