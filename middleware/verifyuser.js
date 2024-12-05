const jwt = require('jsonwebtoken');

const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return next({ status: 401, message: "Token is expired. You have to login for further work." });
    }

 
    jwt.verify(token, process.env.JWT_SECRETKEY, (err, data) => {
      if (err) {
        return next({ status: 401, message: "Unauthorized" });
      }
      

      req.user = data;
      next();

    });
  } catch (err) {
    console.log(err);
    next(err); 
  }
};

module.exports = verifyUser;


