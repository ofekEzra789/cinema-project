const MongoClient = require("mongodb").MongoClient;
const url = "mongodb+srv://ayenachew:AmY09865@cluster0-n6h3u.mongodb.net/cinema?retryWrites=true&w=majority";
const dbName = "cinema",
  collectionName = "users";
const ObjectId = require("mongodb").ObjectId;

//Delete
function handleDelete(req, res) {
  MongoClient.connect(url, { useNewUrlParser: true } ,{ useUnifiedTopology: true }, function(err, db) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    const dbo = db.db(dbName);
    const userId = req.params.userId;
    const movieId = req.params.movieId;

    console.log(userId);
    dbo
      .collection(collectionName)
      .findOne({ _id: ObjectId(userId) }, function(err, user) {
        // --- check if movie exist , if not send 404
        console.log(movieId);

        if (err) {
          console.log(err);
          return res.sendStatus(500);
        }
        // -- movie found
        if (user) {
          if (user.favorites) {
            console.log("user.favorites");
            console.log(user.favorites);
            filteredFavorites = user.favorites.filter(
              favorite => favorite.newMovieId != movieId
            );
            console.log("filteredFavorites");
            console.log(filteredFavorites);

            user = { $set: { favorites: filteredFavorites } };
            dbo
              .collection(collectionName)
              .updateOne({ _id: ObjectId(userId) }, user, function(err, user) {
                return res.status(200).send("deleeted");
              });
          }
        }
        // --- not found
        else {
          return res.sendStatus(404);
        }
      });
  });
}

// module.exports.signUp = signUp;
// module.exports.login = login;
// module.exports.addFavorites = addFavorites;
// module.exports.getFavorite = getFavorite;
module.exports.handleDelete = handleDelete;
