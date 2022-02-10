const loginMiddleware = require("../middleware/loginMiddleware");
const loginRouter = require("./loginRouter");
const userRouter = require("./userRouter");
const translationRouter = require("./translationRouter");
const projectRouter = require("./projectRouter");
const createSession = require("../middleware/createSession");
const jwt = require("jsonwebtoken");
module.exports = (app) => {
  app.use("/login", loginRouter);

  app.use(createSession)


  app.use("/user", userRouter);

  app.use("/translation", translationRouter);

  app.use("/project", projectRouter);

  app.use("/token/validate", loginMiddleware.validate, (req, res) => {
    const r = jwt.verify(req.headers["api-token"], "keyboard cat", (err) => {
      const account = jwt.decode(req.headers["api-token"]);
      res.json({
        status: "true",
        message: "Validate successfully",
        account : account.user,
        token: req.headers["api-token"],
      });
    });
  });
};
