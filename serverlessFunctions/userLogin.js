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

    const user = await collection.findOne({ username: username, password: password });

    if (user) {
      context.res = {
        status: 200,
        body: user.username
      };
    } else {
      context.res = {
        status: 401,
        body: "Invalid username or password"
      };
    }
  } catch (error) {
    context.log(`Error: ${error}`);

    context.res = {
      status: 500,
      body: "Error processing login"
    };
  } finally {
    await client.close();
  }
};
