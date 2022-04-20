const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const route = require("./routes");

const app = express();

mongoose
    .connect(
        "mongodb+srv://root:root123@cluster0.mneqh.mongodb.net/portalnoticias?retryWrites=true&w=majority",
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("Success MongoDB Atlas Connected"))
    .catch((error) => console.log(error.message));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false, maxAge: 600000 },
    })
);

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use(express.static("public"));
app.set("views", path.join(__dirname, "/pages"));

app.use(route);

app.listen(8080, () => console.log("running server"));
