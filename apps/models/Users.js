import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const toLower = (v) => {
  return v.toLowerCase();
};

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    set: toLower,
    required: [true, 'Please, fill email'],
    unique: [true, 'Email already exist'],
    validate: [validator.isEmail, 'Email not contain'],
  },
  password: {
    type: String,
    required: [true, 'Please, enter your correctly password'],
    minLength: [8, 'Password must be 8 characters'],
  },
});

UserSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const UsersModel = mongoose.model('users', UserSchema);
export default UsersModel;
