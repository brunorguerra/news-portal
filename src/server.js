const express = require("express");
const path = require("path");

const app = express();

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use(express.static("public"));
app.set("views", path.join(__dirname, "/pages"));

app.get("/", (req, res) => {
    if (req.query.search == null) {
        res.render("home");
    } else {
        res.redirect(`/${req.query.search}`);
    }
});

app.get("/:slug", (req, res) =>
    res.send(`voce está na página ${req.params.slug}`)
);

app.listen(8080, () => console.log("running server"));
