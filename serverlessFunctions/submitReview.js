const { MongoClient } = require("mongodb");

module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');

  const ratedUser = req.query.ratedUser;
  const oldRating = req.query.rating;
  const rating = parseInt(oldRating);
  const ratedBy = req.query.ratedBy;
  const comment = req.query.comment;

  const uri = "";

  const client = new MongoClient(uri);

  try {
    await client.connect();

    const db = client.db("extensionTestDB");
    const collection = db.collection("ratings");

    const ratings = {
        ratedUser: ratedUser,
        rating: rating,
        ratedBy: ratedBy,
        comment: comment
    };

    const result = await collection.insertOne(ratings);

    context.log(`Inserted ${result.insertedCount} documents`);

    context.res = {
      status: 200,
      body: `New rating document created: ${JSON.stringify(ratings)}`
    };
  } catch (error) {
    context.log(`Error: ${error}`);

    context.res = {
      status: 500,
      body: "Error creating rating document"
    };
  } finally {
    await client.close();
  }
};
