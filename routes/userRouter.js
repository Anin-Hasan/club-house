const { Router } = require("express");
const usersRouter = Router();
const dataController = require("../controllers/dataController");

usersRouter.get("/signUp", dataController.signUpFormGet);
usersRouter.post("/signUp", dataController.signUpFormPost);
usersRouter.get("/log-out", dataController.logOutGet);
usersRouter.get("/login", dataController.logInGet);
usersRouter.post("/get-membership", dataController.getMembershipPost);
usersRouter.get("/messages", dataController.getMessage);
usersRouter.post("/messages", dataController.PostMessage);
usersRouter.get("/", dataController.getMessages);

module.exports = usersRouter;
