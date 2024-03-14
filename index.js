const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const db = require("./connector");
const response = require("./response");

app.use(bodyParser.json());

app.get("/", (req, res) => {
    const query = "SELECT * FROM item_tbl";

    db.query(query, (error, result) => {
        response(200, result, "get all data", res);
    });
});

app.get("/find", (req, res) => {
    const query = `SELECT item_name FROM item_tbl WHERE item_code = "${req.query.item_code}"`;

    db.query(query, (error, result) => {
        response(200, result, "find item", res);
    });
});

app.post("/login", (req, res) => {
    console.log({ requestFromOutside: req.body });
    res.send("Berhasil Login!");
});

app.put("/username", (req, res) => {
    console.log({ updateData: req.body });
    res.send("Berhasil ganti username");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
