const express = require("express");
const route = express.Router();

route.get("/", (req, res) => {
    if (req.query.search == null) {
        res.render("home");
    } else {
        res.render("home");
    }
});

route.get("/:slug", (req, res) => res.render("singlePage-news"));

module.exports = route;
