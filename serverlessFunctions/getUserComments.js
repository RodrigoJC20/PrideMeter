const {MongoClient} = require("mongodb");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const uri = "";
    const dbName = "extensionTestDB";
    const client = new MongoClient(uri);
    const db = client.db(dbName);

    const username = req.query.username;
    let commentArray = ""

    try {

        await client.connect().then(() => {
        }).catch(err => {
            console.error("Error connecting to the database: ", err);
        });
    
        const ratings = db.collection("ratings");

        const commentsQuery = await ratings.find(
            {ratedUser: username},
            {projection: {ratedBy: 1, comment: 1, rating: 1}}
        ).toArray();

        commentArray = JSON.stringify(commentsQuery);

    } finally {
        await client.close();
    }

    context.res = {
        headers: {
            'Content-Type': 'application/json'
        },
            body: commentArray
    };
}