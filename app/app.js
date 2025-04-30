const express = require("express");
const app = express();
const cors = require("cors");
const controller = require("./controller.js");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/users", (req, res) => {
  var resObj = [];
  controller.getUsers((req, res, next) => {
    res.send();
  });
});
app.post("/createuser", (req, res) => {
  const id = req.query.id;
  controller.addUser(req.body, (callback) => {
    res.send();
  });
});

app.put("/updateuser", (req, res) => {
  const id = req.query.id;
  controller.updateUser(req.body, (callback) => {
    res.send(callback);
  });
});

app.delete("/deleteteuser", (req, res) => {
  const id = req.query.id;
  controller.deleteUser(req.body, (callback) => {
    res.send(callback);
  });
});

module.exports = app;
