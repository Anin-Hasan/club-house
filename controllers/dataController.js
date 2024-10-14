const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";

const validateUser = [
  body("email").isEmail().withMessage("Invalid Email."),
  body("firstname")
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`First name ${lengthErr}`),
  body("lastname")
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Last name ${lengthErr}`),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Minimum password Length is 6"),
  body("ConfirmPassword")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Password does not matched."),
];

exports.signUpFormGet = (req, res) => {
  res.render("signUp", {
    title: "Create User",
  });
};

exports.logInGet = (req, res) => {
  // console.log(req.user);
  res.render("login", { user: req.user });
};

exports.logOutGet = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

exports.signUpFormPost = [
  validateUser,
  async (req, res) => {
    const errors = validationResult(req);
    const user = await db.checkRegisteredEmail(req.body.email);

    if (user) {
      errors.errors.push({
        msg: "Email Already exists.",
        param: "email",
        location: "body",
      });
    }

    if (!errors.isEmpty()) {
      return res.status(400).render("signUp", {
        title: "Create user",
        errors: errors.array(),
      });
    }

    const { email, firstname, lastname, password } = req.body;
    await db.insertUserIntoUserDetails(email, firstname, lastname, password);
    res.redirect("/");
  },
];
