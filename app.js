const pool = require("./db/pool");
const express = require("express");
const userRouter = require("./routes/userRouter");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

app.use("/", userRouter);
const PORT = 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
