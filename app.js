//jshint esversion:6
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// -----------------------------------------------------
// Creating blogDB
mongoose.set("strictQuery", true);
mongoose.connect(
  "mongodb+srv://Nikhil:Nikhil123@cluster0.cqqpevq.mongodb.net/blogDB",
  function () {
    console.log("Connected to MongoDB");
  }
);
// -----------------------------------------------------
// Creating Post schema
const postSchema = {
  title: String,
  content: String,
};
// -----------------------------------------------------
// Creating Post model/collection
const Post = mongoose.model("Post", postSchema);
// -----------------------------------------------------
//finding all the posts in the posts collection and render that in the home.ejs file.
app.get("/", function (req, res) {
  Post.find({}, function (err, posts) {
    res.render("home", {
      posts: posts,
    });
  });
});
app.get("/about", function (req, res) {
  res.render("about");
});

app.get("/contact", function (req, res) {
  res.render("contact");
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  // creating a new post document
  const post = new Post({
    title: req.body.postTitle,

    content: req.body.postBody,
  });
  post.save();


  res.redirect("/");
});

app.get("/posts/:postId", function (req, res) {
  const requestedPostId = req.params.postId;
  
       Post.findOne({_id:requestedPostId}, function (err, post) {
         res.render("post", {
           title: post.title,

           content: post.content,
         });
       });
    });
 

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
