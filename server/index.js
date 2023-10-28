const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await pool.query(
      "SELECT * FROM login WHERE username = $1 OR email = $2 OR password = $3",
      [username, email, password]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: "User already exists." });
    } else {
      const newLogin = await pool.query(
        "INSERT INTO login (username, email, password) VALUES ($1, $2, $3) RETURNING *",
        [username, email, password]
      );

      res.json(newLogin.rows[0]);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExists = await pool.query(
      "SELECT * FROM login WHERE email = $1 AND password = $2",
      [email, password]
    );

    if (userExists.rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const userId = userExists.rows[0].login_id;
    console.log(userId);

    res.json({ message: "Login successful", userId: userId });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});



app.get("/profile/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userData = await pool.query("SELECT * FROM login WHERE login_id = $1", [id]);

    if (userData.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(userData.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});
  
app.delete("/profile/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletelogin = await pool.query("DELETE FROM login WHERE login_id = $1", [id]);
    res.json("Account was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});


app.listen(3000, () => {
  console.log("server has started on port 3000");
});

