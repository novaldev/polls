module.exports = (fn) => {
  try {
    fn();
  } catch (error) {
    next(error);
  }
};
