import { compareAccessToken, compareRefreshToken, setAccessToken } from '../../helpers/token.js';

const authorization = (req, res, next) => {
  const { accessToken } = req.cookies;
  const result = compareAccessToken(accessToken);
  if (result.err) {
    if (result.err.message.includes('jwt expired')) {
      const { refreshToken } = req.cookies;

      const result = compareRefreshToken(refreshToken);
      if (result.err) {
        res.redirect('/login');
      }

      const accessToken = setAccessToken(result.token.id);
      res.cookie('accessToken', accessToken, { httpOnly: 'true' });
      next();
    }
  }
  console.log('not expired');
  next();
};

export default authorization;
