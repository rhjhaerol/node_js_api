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
        if (error) throw error;
        response(200, result, "Get all data", res);
    });
});

app.get("/item/:item_code", (req, res) => {
    const item_code = req.params.item_code;
    const query = `SELECT * FROM item_tbl WHERE item_code = "${item_code}"`;

    db.query(query, (error, result) => {
        if (error) throw error;
        response(200, result, "Find the data", res);
    });
});

app.post("/item", (req, res) => {
    const { code, name, price, stock } = req.body;
    const query = `INSERT INTO item_tbl (item_code, item_name, item_price, item_stock) VALUES ('${code}', '${name}', ${price}, ${stock})`;

    db.query(query, (error, result) => {
        if (error) response(500, "invalid", "error", res);
        if (result?.affectedRows) {
            const data = {
                isSucces: result.affectedRows,
                id: result.insertId,
            };
            response(200, data, "Data added successfully", res);
        }
    });
});

app.put("/item", (req, res) => {
    const { code, name, price, stock } = req.body;
    const query = `UPDATE item_tbl SET item_name = '${name}', item_price = ${price}, item_stock = ${stock} WHERE item_code = '${code}'`;

    db.query(query, (error, result) => {
        if (error) response(500, "invalid", "error", res);
        if (result?.affectedRows) {
            const data = {
                isSucces: result.affectedRows,
                message: result.message,
            };
            response(200, data, "Update data successfully", res);
        }
    });
});

app.delete("/item", (req, res) => {
    const { code } = req.body;
    const query = `DELETE FROM item_tbl WHERE item_code = '${code}'`;

    db.query(query, (error, result) => {
        if (error) response(500, "invalid", "error", res);
        if (result?.affectedRows) {
            const data = {
                isDelete: result.affectedRows,
            };
            response(200, data, "Delete data successfully", res);
        }
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
