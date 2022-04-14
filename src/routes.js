const express = require("express");
const route = express.Router();
const Posts = require("./schema/Posts");

route.get("/", (req, res) => {
    if (req.query.search == null) {
        Posts.find({})
            .sort({ _id: -1 })
            .exec((error, posts) => {
                Posts.find({})
                    .sort({ views: -1 })
                    .exec((error, postsTop) => {
                        res.render("home", { posts, postsTop });
                    });
            });
    } else {
        Posts.find(
            { titulo: { $regex: req.query.search, $options: "i" } },
            (error, posts) => {
                Posts.find({})
                    .sort({ views: -1 })
                    .exec((error, postsTop) => {
                        res.render("search", {
                            posts,
                            postsTop,
                            results: posts.length,
                            nameResult: req.query.search,
                        });
                    });
            }
        );
    }
});

route.get("/:slug", (req, res) => {
    Posts.findOneAndUpdate(
        { slug: req.params.slug },
        { $inc: { views: 1 } },
        { new: true },
        function (error, response) {
            if (response != null) {
                Posts.find({})
                    .sort({ views: -1 })
                    .exec((error, postsTop) => {
                        res.render("singlePage-news", {
                            postSingle: response,
                            postsTop,
                        });
                    });
            } else {
                res.redirect("/");
            }
        }
    );
});

module.exports = route;
