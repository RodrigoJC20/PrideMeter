const { MongoClient } = require("mongodb");

const url = "";
const dbName = "extensionTestDB";
const client = new MongoClient(url);
const db = client.db(dbName);

client.connect()
  .then(() => {
    console.log("Connected to MongoDB server");

    const usersCollection = db.collection('users');

    const users = [
      { name: 'John' },
      { name: 'Jane' },
    ];

    return usersCollection.insertMany(users);
  })
  .then(result => {
    console.log('Documents inserted:', result.insertedCount);

    const usersCollection = db.collection('users');
    return usersCollection.find({}).toArray();
  })
  .then(users => {
    console.log('Users:', users);
    return createRatings(); // Call the createRatings function here
  })
  .then(() => {
    client.close().then(() => {
      console.log("Closed connection to MongoDB server");
    });
  })
  .catch(err => {
    console.error("Error:", err);
  });

async function createRatings() {
  console.log("Connected to MongoDB server");

  await db.createCollection('ratings');

  console.log("Created ratings collection");

  const ratingsCollection = db.collection('ratings');

  const ratings = [
    { ratedUser: "John", rating: 5, ratedBy: "Jane", comment: "I think this is a psyops, be careful." },
    { ratedUser: "Jane", rating: 4, ratedBy: "John", comment: "Has been proven to increase uneassyness and employ reverse-racism" }
  ];

  await ratingsCollection.insertMany(ratings);

  console.log("Inserted ratings");

  const ratingsDocs = await ratingsCollection.find({}).toArray();

  console.log("Ratings:", ratingsDocs);

  // No need to close the client connection here, it will be closed in the main code
}
