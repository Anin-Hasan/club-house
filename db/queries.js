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

async function postMessage(user, title, message) {
  if (user && title && message) {
    const timestamp = new Date().toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const author = user.firstname;
    try {
      await pool.query(
        "INSERT INTO message_container(author, title, message, timestamp) VALUES ($1, $2, $3, $4)",
        [author, title, message, timestamp]
      );
    } catch (error) {
      console.log(error);
    }
  }
}

async function getAllMessages() {
  try {
    const { rows } = await pool.query("SELECT * FROM message_container");
    if (rows) {
      return rows;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  insertUserIntoUserDetails,
  checkRegisteredEmail,
  getMembership,
  postMessage,
  getAllMessages,
};
