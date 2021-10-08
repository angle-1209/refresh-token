import Users from '../models/Users.js';
import encryptHelper from '../../helpers/encrypt.js';
import { setAccessToken, setRefreshToken } from '../../helpers/token.js';

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

const usersRegistration = async (req, res) => {
  const { email, password } = req.body;

  try {
    const newUser = new Users({
      email,
      password,
    });
    const result = await newUser.save();
    const ACCESS_TOKEN = setAccessToken(result._id);
    const REFRESH_TOKEN = setRefreshToken(result._id);
    res.json({ msg: 'Successfully create user', accessToken: ACCESS_TOKEN, refreshToken: REFRESH_TOKEN }).status(200);
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

    if (user === null) {
      throw 'Email not found';
    }
    const hashedPassword = await encryptHelper('compare', user.password, password);
    if (!hashedPassword) {
      throw 'Wrong Password';
    }

    const ACCESS_TOKEN = setAccessToken(user._id);
    const REFRESH_TOKEN = setRefreshToken(user._id);
    res.json({ msg: 'Login Success', accessToken: ACCESS_TOKEN, refreshToken: REFRESH_TOKEN }).status(200);
  } catch (error) {
    res.json({ msg: error }).status(401);
  }
};

const users = async (_req, res) => {
  try {
    const allUsers = await Users.find();
    if (allUsers.length < 1) {
      throw 'could not have any users';
    }

    res.json({ users: allUsers });
  } catch (error) {
    res.json({ msg: error }).status(401);
  }
};

const usersRemove = async (req, res) => {
  const { id } = req.params.id;
  try {
    const removedUser = await Users.deleteOne({ id });
    res.json({ msg: `${removedUser.deletedCount} user has been deleted` });
  } catch (error) {
    res.json({ msg: error }).status(401);
  }
};

export { usersRegistration, usersLogin, users, usersRemove };
