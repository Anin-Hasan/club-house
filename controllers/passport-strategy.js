const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const pool = require("../db/pool");
const bcrypt = require("bcryptjs");

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (username, password, done) => {
      try {
        const { rows } = await pool.query(
          "SELECT * FROM user_details WHERE email = $1",
          [username]
        );
        const user = rows[0];
        if (!user) {
          return done(null, false, { message: "Incorrect Email." });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          // passwords do not match!
          return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
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
module.exports = passport;
