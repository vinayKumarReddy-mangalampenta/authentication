const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const bcrypt = require("bcrypt");
const app = express();
app.use(express.json());

const dbPath = path.join(__dirname, "userData.db");
let db;

const intializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("server running at http://localhost:3000/");
    });
  } catch (error) {
    console.log(console.error());
    process.exit(1);
  }
};

intializeDbAndServer();

//api1
app.post("/register", async (request, response) => {
  const { userName, name, passwd, gender, location } = request.body;
  const hashedPasswd = await bcrypt.hash(passwd, 10);
  const isUserFoundQuery = `
    select 
    *
    FROM 
    user 
    WHERE username = '${userName}';
    `;
  const isUserRegistered = await db.get(isUserFoundQuery);
  console.log(hashedPasswd);
  console.log(isUserRegistered);
});
