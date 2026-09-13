const express = require("express");
const mysql = require("mysql2");

const app = express();

const port = 5000;

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

app.get("/", (req, res) => {
    res.json({
        message: "Backend API is running successfully"
    });
});

app.get("/api/users", (req, res) => {

    db.query("SELECT * FROM users", (err, results) => {

        if (err) {
            console.error(err);
            return res.status(500).json({
                error: "Database connection failed"
            });
        }

        res.json(results);
    });

});

app.listen(port, () => {
    console.log(`Backend running on port ${port}`);
});