const { Router } = require("express");
const usersRouter = Router();
const dataController = require("../controllers/dataController");

usersRouter.get("/", dataController.signUpFormGet);
usersRouter.post("/signUp", dataController.signUpFormPost);

module.exports = usersRouter;
