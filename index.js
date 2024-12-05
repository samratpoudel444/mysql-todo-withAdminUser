const express = require("express");
const errorhandler = require("./middleware/errormiddleware");
const userRouter = require("./routes/userroutes");
const connection = require("./config/connection");
const cookieParser = require("cookie-parser");
const taskRouter = require("./routes/taskroute");
const loginRouter = require("./routes/loginRoute");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(loginRouter);
app.use(userRouter);
app.use(taskRouter);
app.use(errorhandler);

connection()
  .then((db) => {
    app.listen(3000, () => {
      console.log("Listening on port 3000");
    });
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
    process.exit(1);
  });
