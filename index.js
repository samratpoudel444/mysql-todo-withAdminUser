const express = require('express');
const errorhandler = require('./middleware/errormiddleware');
const router = require('./routes/userroutes');
const connection = require('./config/connection');
const cookieParser = require('cookie-parser');
const taskrouter = require('./routes/taskroute');
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(router);
app.use(taskrouter);
app.use(errorhandler);  


connection().then(db => {
   app.listen(3000, () => {
      console.log('Listening on port 3000');
    });
  })
  .catch(err => {
    console.error('Error connecting to the database:', err);
    process.exit(1);  
  });
