const monodb = require('mongodb');
const getDb = require("../utils/database").getDb;

const ObjectId = monodb.ObjectId;
class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart; //{items: []}
    this._id = id;
  }
  save() {
    const db = getDb();
    db.collection('users')
      .insert(this)
      , then()
    .catch(err => console.log(err))
  }
  addToCart(product) {
    // const cartProduct = this.cart.items.findIndex(cp => {
    //   return cp._id === product._id
    // })
    const updatedCart = { items: [{ product_id: new ObjectId(product._id), quantity: 1 }] }
    const db = getDb();
    return db.collection('users')
      .updateOne(
      { _id: new ObjectId(this._id) },
      {
        $set: {cart: updatedCart}
      })
  }
  static findById(userId) {
    const db = getDb();
    return db.collection("users")
      .findOne({ _id: new ObjectId(userId) });
    
  }
}

module.exports = User;
