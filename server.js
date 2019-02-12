const express = require("express");
const cors = require("cors");
const connect = require("mongoose").connect;
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 4000;

connect(
  `mongodb://localhost:27017/vue`,
  { useNewUrlParser: true, useCreateIndex: true }
);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

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

app.listen(PORT, () => console.log(`server listening on port: ${PORT}`));
