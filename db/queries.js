const pool = require("./pool");
const bcrypt = require("bcryptjs");

async function checkRegisteredEmail(email) {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM user_details WHERE email = $1",
      [email]
    );
    const user = rows[0];
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    console.log(error);
  }
}

async function insertUserIntoUserDetails(email, firstname, lastname, password) {
  bcrypt.hash(password, 10, async (err, hashedPassword) => {
    try {
      await pool.query(
        "INSERT INTO user_details(email, firstname, lastname, password, membership) VALUES ($1, $2, $3, $4, $5)",
        [email, firstname, lastname, hashedPassword, false]
      );
    } catch (error) {
      console.log(error);
    }
  });
}

async function getMembership(secretPasscode, user) {
  if (secretPasscode === "helloWorld" && user) {
    try {
      await pool.query(
        "UPDATE user_details SET membership = $1 WHERE id = $2",
        [true, user.id]
      );
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = {
  insertUserIntoUserDetails,
  checkRegisteredEmail,
  getMembership,
};
