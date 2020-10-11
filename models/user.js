const monodb = require('mongodb');
const getDb = require("../utils/database").getDb;

const ObjectId = monodb.ObjectId;
class User {
  constructor(username, email) {
    this.name = username;
    this.email = email;
  }
  save() {
    const db = getDb();
    db.collection('users')
      .insert(this)
      , then()
    .catch(err => console.log(err))
  }
  static findById(userId) {
    const db = getDb();
    return db.collection("users")
      .findOne({ _id: new ObjectId(userId) });
    
  }
}

module.exports = User;
