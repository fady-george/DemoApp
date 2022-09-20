exports = async function getFirstBookByUserID(input) {
  const mongoDB = context.services.get("mongodb-atlas");
  const users = mongoDB.db("testingDB").collection("users");
  const books = mongoDB.db("testingDB").collection("books");

  if (input.id) {
    let user = await users.findOne({ _id: new BSON.ObjectId(input.id) });
    let listOFBookIds = Object.values(user.booksRead).map((bookIDAsString) => BSON.ObjectId(bookIDAsString))
    let firstBookOfUser = await books.find({
      _id: listOFBookIds[0]
    })
    return firstBookOfUser;
  }

  return { "error": "please enter id in your query" };
};