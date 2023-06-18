const {MongoClient} = require("mongodb");

async function main() {
    const url = "";

    const dbName = "extensionTestDB";

    const client = new MongoClient(url);

    const db = client.db(dbName);

    try{
        await client.connect().then(() => {
        }).catch(err => {
            console.error("Error connecting to the database: ", err);
        });
    
        console.log("Connected to MongoDB server");
    
        const collectionsCursor = db.listCollections();

        while(await collectionsCursor.hasNext()){
            const collectionInfo = await collectionsCursor.next();
            const collectionName = collectionInfo.name;

            await db.collection(collectionName).drop();
            console.log(`Dropped collection ${collectionName}`);

        }

    } finally {
        await client.close();
    }
    
}

main().catch(console.error);

