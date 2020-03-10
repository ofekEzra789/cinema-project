const MongoClient = require("mongodb").MongoClient;
const url = "mongodb+srv://ayenachew:AmY09865@cluster0-n6h3u.mongodb.net/cinema?retryWrites=true&w=majority";
const dbName = "cinema",
  collectionName = "users";
const ObjectId = require("mongodb").ObjectId;

// login
function login(req, res) {
  console.log("/users/login is accessed");

  MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    const dbo = db.db(dbName);

    // --- expecting email , passeord
    const queryUser = req.body;

    dbo.collection(collectionName).findOne(queryUser, function(err, user) {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }

      if (user) {
        // --- this is post but no document is creatrd so return 200
        return res.status(200).send(user);
      }
      // --- user not found
      return res.sendStatus(404);
    });
  });
}

module.exports.login = login;
