const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
    MongoClient.connect(
      "mongodb+srv://codelogicx101:codelogicx101@cluster0.raryu.mongodb.net/test?retryWrites=true&w=majority",
      { useUnifiedTopology: true }
    )
      .then((client) => {
        console.log("Connected!");
        callback(client);
      })
      .catch((err) => console.log(err));

}

module.exports = mongoConnect;
