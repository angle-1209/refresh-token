import Users from '../models/Users.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const errorHandler = (err, code) => {
  let message = {
    email: '',
    password: '',
  };

  if (code) {
    if (code === 11000) {
      message['email'] = 'Email already exist';
    }
  }
  if (err) {
    if (err.message.includes('users validation failed')) {
      Object.values(err.errors).forEach(({ properties }) => {
        message[properties.path] = properties.message;
      });
    }
  }
  return message;
};

const setAccessToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: '15s',
  });
};

const setRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET_KEY, {
    expiresIn: '3d',
  });
};

const encryptController = async (type, password, plainPassword = '') => {
  if (type === 'hash') {
    return await bcrypt.hash(password, 10);
  }
  if (type === 'compare') {
    return await bcrypt.compare(plainPassword, password);
  }
};

const usersRegistration = async (req, res) => {
  const { email, password } = req.body;

  try {
    const newUser = new Users({
      email,
      password,
    });
    const result = await newUser.save();
    const ACCESS_TOKEN = setAccessToken(result._id);
    res.json({ msg: 'Successfully create user', token: ACCESS_TOKEN }).status(200);
  } catch (error) {
    const message = errorHandler(error, error.code);
    res.json({ msg: message }).status(401);
  }
};

const usersLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({
      email,
    });
    if (user < 0) {
      throw 'Email not found';
    }
    const hashedPassword = await encryptController('compare', user.password, password);
    if (!hashedPassword) {
      throw 'Wrong Password';
    }

    res.json({ msg: 'Login Success' });
  } catch (error) {}
};

export { usersRegistration };
