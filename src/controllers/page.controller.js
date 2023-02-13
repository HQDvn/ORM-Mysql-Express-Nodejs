export const homePage = async (req, res, next) => {
  try {
    return res.render('home.ejs');
  } catch (err) {
    next(err);
  }
};
