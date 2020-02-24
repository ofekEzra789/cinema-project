const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");
const path = require("path");
const login = require("./login");
const SignUp = require("./signUp");
const addFavorites = require("./wishList");
const getFavorite = require("./getFavorite");
const handleDelete = require("./handleDelete");
const onWishList = require("./onWishList");
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(function (req, res, next){
  if (req.headers['x-forwarded-proto'] === 'https') {
    res.redirect('http://' + req.hostname + req.url);
  } else {
    next();
  }
});

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


// Serve The react app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

// Serve Static Assets if in Production
if (process.env.NODE_ENV == "production" || true) {
  const root = path.join(__dirname, 'client', 'build')
  app.use(express.static(root));
  app.get("*", (req, res) => {
    res.sendFile('index.html', { root });
  })

}
// Port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
