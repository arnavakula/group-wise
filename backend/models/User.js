const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//define user schema
const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 2
    },
    major: {
        type: String,
        required: true
    },
    timePreference: {
        type: String,
        enum: ['Morning', 'Afternoon', 'Evening', 'Night']
    }
})

//hash password with bycrypt before user registration
UserSchema.pre('save', async function (next) {
    const saltRounds = 10;
    if(this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

//verify password
UserSchema.method.verify = async function (inputPassword){
    return await bcrypt.compare(inputPassword, this.password);
}

module.exports = mongoose.model('User', UserSchema);
  