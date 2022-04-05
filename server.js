const express = require("express");
const connect = require("mongoose").connect;
const path = require("path");
const app = express();
const PORT = process.env.PORT || 4000;

connect(
  `${process.env.MONGODB_URI}`,
  { useNewUrlParser: true, useCreateIndex: true }
);

app.use(express.static(path.join(__dirname, "/dist")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const UserController = require("./controllers/UserController");
app.use("/auth", UserController);

app.use(function(err, req, res, next) {
  if (err) {
    res.status(400).send({
      success: err.success,
      message: err.message
    });
  }
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/dist/index.html"));
});

app.listen(PORT);
