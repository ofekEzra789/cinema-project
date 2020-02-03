const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const login = require("./login");
const SignUp = require("./signUp");
const addFavorites = require("./wishList");
const getFavorite = require("./getFavorite");
const handleDelete = require("./handleDelete");
const onWishList = require("./onWishList");

// const MongoClient = require("mongodb").MongoClient;
// const url = "mongodb://localhost:27017/";
// MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
//   if (err) {
//     console.log(err);
//     return res.sendStatus(500);
//   }
//   const dbo = db.db("cinema");
// });

const app = express();
app.use(express.json());
app.use(cors());

// SignUp
app.post("/account/users/signUp", (req, res) => {
  SignUp.signUp(req, res);
});
// Login
app.post("/account/users/login", (req, res) => {
  login.login(req, res);
});
// wishList
app.post("/account/users/favorites", (req, res) => {
  addFavorites.addFavorites(req, res);
});
//Get
app.get("/account/users/favoritesList/:id", (req, res) => {
  getFavorite.getFavorite(req, res);
});
//Get onWishList
app.get("/account/users/onWishList/:id", (req, res) => {
    onWishList.onWishList(req, res);
});
//handleDelete
app.delete("/account/users/favoritesList/:userId/:movieId", (req, res) => {
    handleDelete.handleDelete(req, res);
});
// Port
const port = 5000 || process.env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}...`));
