const MongoClient = require("mongodb").MongoClient;
const url = "mongodb+srv://ayenachew:AmY09865@cluster0-n6h3u.mongodb.net/cinema?retryWrites=true&w=majority";
const dbName = "cinema",
  collectionName = "users";
const ObjectId = require("mongodb").ObjectId;

// WishList
function addFavorites(req, res) {
  console.log("/users/favorites is accessed");

  MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    const dbo = db.db(dbName);
    const userId = req.body.userId;
    const favorite = req.body.favorites;
    console.log(req.body.userId);

    dbo
      .collection(collectionName)
      .findOne({ _id: ObjectId(userId) }, function(err, user) {
        if (err) {
          console.log(err);
          return res.sendStatus(500);
        }

        if (user) {
          if (user.favorites) {
            const favArray = user.favorites;
            
            favArray.push(favorite);
            console.log("faveArray", favArray);
            dbo
              .collection(collectionName)
              .update(
                { _id: ObjectId(userId) },
                { $set: { favorites: favArray } }
              );
            return res.status(200).send(favArray);
          } else {
            console.log(user);
            dbo
              .collection(collectionName)
              .update(
                { _id: ObjectId(userId) },
                { $set: { favorites: [req.body.favorites] } }
              );
            return res.status(200).send(favorites);
          }
        } else {
          return res.sendStatus(404);
        }
      });
  });
}

module.exports.addFavorites = addFavorites;
