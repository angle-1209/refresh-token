import bcrypt from 'bcrypt';

const encryptHelper = async (type, password, plainPassword = '') => {
  if (type === 'hash') {
    return await bcrypt.hash(password, 10);
  }
  if (type === 'compare') {
    return await bcrypt.compare(plainPassword, password);
  }
};

export default encryptHelper;
