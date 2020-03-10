const MongoClient = require("mongodb").MongoClient;
const url = "mongodb+srv://ayenachew:AmY09865@cluster0-n6h3u.mongodb.net/cinema?retryWrites=true&w=majority";
const dbName = "cinema",
  collectionName = "users";
const ObjectId = require("mongodb").ObjectId;

// signUp
function signUp(req, res) {
  console.log("/users/signUp is accessed");

  MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }

    const dbo = db.db(dbName);
    // --- expecting email , password...
    const queryUser = req.body;

    dbo.collection(collectionName).findOne(
      {
        userName: queryUser.userName,
        email: queryUser.email,
        password: queryUser.password,
        confirmPassword: queryUser.confirmPassword
      },
      function(err, user) {
        if (err) {
          console.log(err);
          return res.sendStatus(500);
        }

        if (user) {
          // --- email found
          console.log(user);
          return res.status(201).send(user);
        }

        // --- no email match --> insert user
        dbo
          .collection(collectionName)
          .insertOne(queryUser, function(err, result) {
            if (err) {
              console.log(err);
              return res.sendStatus(500);
            }
            res.sendStatus(201);
          });
      }
    );
  });
}

module.exports.signUp = signUp;
