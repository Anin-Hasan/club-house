const pool = require("./pool");

async function insertUserIntoUserDetails(email, firstname, lastname, password) {
  try {
    await pool.query(
      "INSERT INTO user_details(email, firstname, lastname, password) VALUES ($1, $2, $3, $4)",
      [email, firstname, lastname, password]
    );
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  insertUserIntoUserDetails,
};
