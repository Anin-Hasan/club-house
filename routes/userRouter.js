const { Router } = require("express");
const usersRouter = Router();
const dataController = require("../controllers/dataController");

usersRouter.get("/signUp", dataController.signUpFormGet);
usersRouter.post("/signUp", dataController.signUpFormPost);
usersRouter.get("/log-out", dataController.logOutGet);
usersRouter.get("/", dataController.logInGet);

module.exports = usersRouter;
