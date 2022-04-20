const express = require("express");
const route = express.Router();
const Posts = require("./schema/Posts");
const Form = require("./schema/Form");

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

route.post("/admin/login", (req, res) => {
    Form.findOne(
        { login: req.body.login, password: req.body.password },
        (error, response) => {
            if (response != null) {
                req.session.login = response.login;
            }
            res.redirect("login");
        }
    );
});

route.get("/admin/login", (req, res) => {
    if (req.session.login == null) {
        res.render("login");
    } else {
        res.redirect("/admin/control-panel");
    }
});

route.get("/admin/control-panel", (req, res) => {
    if (req.session.login == null) {
        res.redirect("/admin/login");
    } else {
        Posts.find({})
            .sort({ _id: -1 })
            .exec((error, posts) => {
                res.render("control-panel", { posts });
            });
    }
});

route.post("/admin/register-post", (req, res) => {
    Posts.create({
        titulo: req.body.title,
        imagem: req.body.imagePost,
        categoria: req.body.category,
        conteudo: req.body.description,
        slug: req.body.slug,
        author: req.body.author,
        views: 0,
    });
    res.redirect("/");
});

route.get("/admin/delete/:postId", (req, res) => {
    Posts.find({})
        .sort({ _id: -1 })
        .exec((error, posts) => {
            if (posts.length > 1) {
                Posts.deleteOne({ _id: req.params.postId }).then(() => {
                    res.redirect("/admin/control-panel");
                });
            } else {
                console.log("Voce não pode Excluir todas as publicações");
                res.redirect("/admin/control-panel");
            }
        });
});

route.get("/admin/exit", (req, res) => {
    req.session.login = null;
    res.redirect("/");
});

module.exports = route;
