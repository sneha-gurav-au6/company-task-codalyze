const express = require("express");
const app = express();
const fs = require("fs");
const PORT = process.env.PORT || 5000;
const path = require("path");

app.use(express.json());

var lines = [];

app.get("/line", (req, res) => {
    console.log("started");
    fs.readFile("./test.txt", "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        data = data.split("\n");

        lines.push(data);

        const newData = data.slice(data.length - 10, data.length);
        res.json({ data: newData });
    });
});

app.post("/count-line/:no", (req, res) => {
    console.log("started");
    const number = req.params.no;
    console.log(number);
    fs.readFile("./test.txt", "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        data = data.split("\n");

        lines.push(data);

        const newData = data.slice(data.length - number, data.length);
        console.log(newData);
        res.json({ data: newData });
    });
});

app.post("/changingData", (req, res) => {
    const lines = [];
    const array = req.body;
    const array1 = array;
    // console.log(array1);

    fs.readFile("./test.txt", "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        data = data.split("\n");
        lines.push(data);

        const a = lines[0].splice(5, lines[0].length - 1, array1);
        const newData = lines[0].flat();
        const newData1 = newData.join("");
        console.log(newData1);
        fs.writeFile("./test.txt", newData1, (err) => {
            if (err) console.log(err);
            else {
            }
        });
    });
});

app.get("/main", (req, res) => {
    res.json({ data: "hello" });
});
app.use(express.static("client/build"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});
//   "proxy": "http://localhost:4000/",
app.listen(PORT, () => {
    console.log("started");
});
