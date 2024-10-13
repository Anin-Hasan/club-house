const pool = require("./pool");
const bcrypt = require("bcryptjs");

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

module.exports = {
  insertUserIntoUserDetails,
};
