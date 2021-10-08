const homePage = (_req, res) => {
  res.render('pages/homepage', {
    title: 'Homepage',
  });
};

const loginPage = (_req, res) => {
  res.render('pages/login', {
    title: 'Login Page',
  });
};

export { homePage, loginPage };
