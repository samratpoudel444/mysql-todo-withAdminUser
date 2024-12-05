const errorhandler = (err, req, resp, next) => {
  console.error(err.message);
  return resp.status(500).json({
    message: err.message || "something went wrong",
  });
};
module.exports = errorhandler;
