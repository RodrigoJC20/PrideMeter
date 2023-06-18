const {MongoClient} = require("mongodb");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const uri = "";
    const dbName = "extensionTestDB";
    const client = new MongoClient(uri);
    const db = client.db(dbName);

    const username = req.query.username;
    let averageRating = ""
    let commentArray = ""

    try {

        await client.connect().then(() => {
        }).catch(err => {
            console.error("Error connecting to the database: ", err);
        });

        const ratings = db.collection("ratings");
    
        const averageRatingQuery = await ratings.aggregate (
            [
                { $match: { ratedUser: username} },
                {
                    $group: {
                        _id: "_id",
                        average: {$avg: '$rating'}
                    }
                }
            ]
        ).toArray();

        averageRating = JSON.stringify(averageRatingQuery);

    } finally {
        await client.close();
    }

    /*
    context.res = {
        status: 200,
        body: responseMessage
    };
    */

    context.res = {
        headers: {
            'Content-Type': 'application/json'
        },
            body: averageRating
    };
}