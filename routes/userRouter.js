const { Router } = require("express");
const usersRouter = Router();
const dataController = require("../controllers/dataController");

usersRouter.get("/", dataController.signUpForm);

module.exports = usersRouter;
