import { setAccessToken, setRefreshToken } from '../../helpers/token.js';
import encryptHelper from '../../helpers/encrypt.js';
import Users from '../models/Users.js';

const login = async (req, res) => {
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

    res.cookie('accessToken', ACCESS_TOKEN, { httpOnly: true });
    res.cookie('refreshToken', REFRESH_TOKEN, { httpOnly: true });
    res.redirect('/');
  } catch (error) {
    res.send({ msg: error });
  }
};

export { login };
