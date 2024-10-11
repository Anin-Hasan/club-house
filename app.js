const pool = require("./db/pool");
const express = require("express");
const userRouter = require("./routes/userRouter");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());

app.use("/", userRouter);
//passportJs
passport.use(
  new LocalStrategy(async (email, password, done) => {
    console.log(email, password);
    try {
      const { rows } = await pool.query(
        "SELECT * FROM user_details WHERE email = ($1)",
        [email]
      );
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "Incorrect Email" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        // passwords do not match!
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM user_details WHERE id = $1",
      [id]
    );
    const user = rows[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});

// app.post(
//   "/login",
//   passport.authenticate("local", {
//     successRedirect: "/signUp",
//     failureRedirect: "/",
//   })
// );

const PORT = 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
