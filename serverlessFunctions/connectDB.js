const { MongoClient, ServerApiVersion } = require("mongodb");


module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const uri = "";

    const client = new MongoClient(uri);
    
    let pinged = "";
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        pinged = "Pinged your deployment. You successfully connected to MongoDB!";
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }

    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully." + pinged
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response." + pinged;

    let flag = "random test";
    context.res = {
        status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}