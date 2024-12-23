const jwt = require("jsonwebtoken");
const verifyUser = require("../middleware/verifyuser");
const connection = require("../config/connection");
const { v4: uuidv4 } = require("uuid");

async function taskDo(req, resp, next) {
  try {
    const date = new Date();
    const id = uuidv4();
    const { email, task, duedate, status, priority } = req.body;

    const db = await connection();

    const [rows, field] = await db.query(
      "SELECT roleid FROM data WHERE email = ?",
      [email]
    );

    if (!rows || rows.length === 0) {
      return resp.send("Please give task to a valid user");
    } else {
      const [insertResult, fields] = await db.query(
        "INSERT INTO tasks (taskid, task, email, created_date, due_date, status, priority) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [id, task, email, date, duedate, status, priority]
      );

      return resp.send("The data is inserted");
    }
  } catch (err) {
    console.error(err);
    return resp.status(500).send("Internal server error");
  }
}

async function taskPriority(req, resp, next) {
  try {
    const data = req.user;
    const email = data.username;

    const db = await connection();
    const [rows, fields] = await db.query(
      "select due_date from tasks where email= ?",
      [email]
    );

    for (let i = 0; i < rows.length; i++) {
      const date1 = new Date();
      const date2 = new Date(rows[i].due_date);

      const unixTimeMillis1 = date1.getTime();
      const unixTimeMillis2 = date2.getTime();

      const differenceInMillis = unixTimeMillis2 - unixTimeMillis1;
      const total_days = differenceInMillis / (1000 * 60 * 60 * 24);
      const days = Math.floor(total_days);

      if (days > 0 && days < 15) {
        const [rows, fields] = await db.query(
          "update tasks set priority= ? where email= ?",
          ["high", email]
        );
        console.log("all the priority are set");
      }
      if (days < 0) {
        const [rows, fields] = await db.query(
          "update tasks set priority= ? where email= ?",
          [" ", email]
        );
        console.log("all the priority are set");
      }
    }
  } catch (err) {
    console.log(err);
  }
}

async function taskStatus(req, resp, next) {
  try {
    const data = req.user;
    const email = data.username;

    const { status, task } = req.body;

    if (!status) {
      console.log("nothing is changed");
    } else if (status === "completed") {
      const db = await connection();
      const [rows, field] = await db.query(
        "update tasks set status =? where email =? and task= ?",
        ["completed", email, task]
      );
    }
  } catch (err) {
    console.log(err);
  }
}

async function taskSearch(req, resp, next) {
  try {
    const { task } = req.body;
    if (!task) {
      return resp.send("please provide the search name");
    }
    const db = await connection();
    const [rows, field] = await db.query(
      "select * from tasks where task like ? ",
      [`%${task}%`]
    );
    return resp.send(rows);
  } catch (err) {
    console.log(err);
  }
}

async function seeTask(req, resp, next) {
  try {
    const db = await connection();
    const [rows, field] = await db.query("select task, email from tasks");
    if (rows.length == 0) {
      return resp.send("there is no task avilable");
    }
    return resp.send(rows);
  } catch (err) {
    console.log(err);
  }
}

module.exports = { taskDo, taskPriority, taskStatus, taskSearch, seeTask };
