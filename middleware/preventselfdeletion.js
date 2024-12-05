const connection = require("../config/connection");

async function preventSelfDeletion(req, resp, next) {
  const email = req.body.email;
  const db = await connection();
  const [row, field] = await db.query(
    "select roleid from data where email= ?",
    [email]
  );

  if (row[0].roleid === 1) {
    return resp.send("You cant delete the admin");
  } else {
    return next();
  }
}

module.exports = { preventSelfDeletion };
