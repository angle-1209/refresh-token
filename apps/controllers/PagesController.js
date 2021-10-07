const homePage = (_req, res) => {
  res.render('pages/homepage', {
    title: 'Homepage',
  });
};

export { homePage };
