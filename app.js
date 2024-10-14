const express = require("express");
const userRouter = require("./routes/userRouter");
const session = require("express-session");
const passport = require("passport");
require("./controllers/passport-strategy");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/signUp",
  })
);

app.use("/", userRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
