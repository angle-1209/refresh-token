import jwt from 'jsonwebtoken';

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

const compareAccessToken = (token) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, token) => {
    return { err, token };
  });
};

const compareRefreshToken = (token) => {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET_KEY, (err, token) => {
    return { err, token };
  });
};

export { setAccessToken, setRefreshToken, compareAccessToken, compareRefreshToken };
