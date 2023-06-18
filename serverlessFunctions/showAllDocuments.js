const {MongoClient} = require("mongodb");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const uri = "";

    const dbName = "extensionTestDB";

    const client = new MongoClient(uri);

    const db = client.db(dbName);
    
    let pinged = "";
    try {
        await client.connect().then(() => {
        }).catch(err => {
            console.error("Error connecting to the database: ", err);
        });
    
        console.log("Connected to MongoDB server");
    
        const collectionsCursor = db.listCollections();
    
        while(await collectionsCursor.hasNext()){
            const collectionInfo = await collectionsCursor.next();
    
            const collectionName = collectionInfo.name;
    
            console.log(`Collection name: ${collectionName}`);
    
            const collection = db.collection(collectionName);
            const documents = await collection.find({}).toArray();
    
            console.log(`Documents in ${collectionName}:`);
            console.log({documents});
            console.log("--------------------------------------------");
        }
    } finally {
        await client.close();
    }

    const responseMessage = "documents were shown"

    context.res = {
        status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}