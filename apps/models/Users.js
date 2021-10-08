import mongoose from 'mongoose';
import validator from 'validator';
import encryptHelper from '../../helpers/encrypt.js';

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
  this.password = await encryptHelper('hash', this.password);
  next();
});

const UsersModel = mongoose.model('users', UserSchema);
export default UsersModel;
