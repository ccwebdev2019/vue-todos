const express = require("express");
const cors = require("cors");
const connect = require("mongoose").connect;
const morgan = require("morgan");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 4000;

connect(
  `mongodb://carlos:cerebro2019mongodb@ds133875.mlab.com:33875/heroku_2xlg8g7l/vue`,
  { useNewUrlParser: true, useCreateIndex: true }
);

app.use(cors());
app.use(express.static(path.join(__dirname, "dist")));
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

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => console.log(`server listening on port: ${PORT}`));
