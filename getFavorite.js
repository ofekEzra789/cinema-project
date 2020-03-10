const MongoClient = require("mongodb").MongoClient;
const url = "mongodb+srv://ayenachew:AmY09865@cluster0-n6h3u.mongodb.net/cinema?retryWrites=true&w=majority";
const dbName = "cinema",
  collectionName = "users";
const ObjectId = require("mongodb").ObjectId;

//GetFavorite
function getFavorite(req, res) {
  console.log("/users/favoritesList is accessed");

  MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    const dbo = db.db(dbName);
    const userId = req.params.id;
    console.log(userId);

    dbo
      .collection(collectionName)
      .findOne({ _id: ObjectId(userId) }, function(err, user) {
        if (err) {
          console.log(err);
          return res.sendStatus(500);
        }

        if (user) {
          if (user.favorites) {
            return res.status(200).send(user.favorites);
          }
        } else {
          return res.sendStatus(404);
        }
      });
  });
}

module.exports.getFavorite = getFavorite;
