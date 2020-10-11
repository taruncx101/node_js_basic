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
    const cartProductIndex = this.cart.items.findIndex(cp => {
      return cp.productId.toString() === product._id.toString();
    })
    const updatedCartItems = [...this.cart.items]
    let quantity = 1;
    if (cartProductIndex >= 0) {
      quantity = quantity + +updatedCartItems[cartProductIndex].quantity;
      updatedCartItems[cartProductIndex].quantity = quantity;
    }
    else {
      updatedCartItems.push({
        productId: new ObjectId(product._id),
        quantity,
      });
    }
    const updatedCart = {
      items: updatedCartItems
    }
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
