require("dotenv").config();
const express = require("express");
app = express();
(mongoose = require("mongoose")),
  (host = process.env.HOST || "localhost"),
  (port = 3000 || process.env.PORT),
  (dbhost = process.env.DBHOST || "mongodb://0.0.0.0:27017"),
  (logger = require("./services/logger")),
  (pinRouter = require("./routes/pinRouter")),
  (userRouter = require("./routes/userRouter"));

//Middlewars
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

//Routes
app.use("/api/pin", pinRouter);
app.use("/api/user", userRouter);

mongoose
  .connect(`${dbhost}/pinPic`)
  .then(() => {
    app.listen(port, () => {
      logger.info(`server start listening on port ${port}`);
    });
  })
  .catch((err) => logger.error(err));
