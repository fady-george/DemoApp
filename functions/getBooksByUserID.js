exports = async function getBooks(req, _) {
  const { query } = req
  const mongoDB = context.services.get("mongodb-atlas");
  const users = mongoDB.db("testingDB").collection("users");
  const books = mongoDB.db("testingDB").collection("books");

  if (query.id) {
    let user = await users.findOne({ _id: new BSON.ObjectId(query.id) });
    let listOFBookIds = Object.values(user.booksRead).map((bookIDAsString) => BSON.ObjectId(bookIDAsString))
    let booksOfUser = await books.find({
      _id: {
        $in: listOFBookIds
      }
    })
    return booksOfUser;
  }

  return { "error": "please enter id in your query" };
};