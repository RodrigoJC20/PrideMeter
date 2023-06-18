const { MongoClient } = require("mongodb");

module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');

  const username = req.query.username;
  const password = req.query.password;

  const uri = "";

  const client = new MongoClient(uri);

  try {
    await client.connect();

    const db = client.db("extensionTestDB");
    const collection = db.collection("users");

    const userDocument = {
      username: username,
      password: password
    };

    const result = await collection.insertOne(userDocument);

    context.log(`Inserted ${result.insertedCount} documents`);

    context.res = {
      status: 200,
      body: `New user document created: ${JSON.stringify(userDocument)}`
    };
  } catch (error) {
    context.log(`Error: ${error}`);

    context.res = {
      status: 500,
      body: "Error creating user document"
    };
  } finally {
    await client.close();
  }
};
