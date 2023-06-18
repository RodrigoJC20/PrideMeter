const {MongoClient} = require("mongodb");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const uri = "";
    const dbName = "extensionTestDB";
    const client = new MongoClient(uri);
    const db = client.db(dbName);

    const username = req.query.username;

    const minComments = 1;
    const minRating = 5;
    let shouldGetMedal = "false";

    try {

        await client.connect().then(() => {
        }).catch(err => {
            console.error("Error connecting to the database: ", err);
        });

        const ratings = db.collection("ratings");

        const comments = await ratings.find({ratedUser: username}).toArray();
        const commentsCount = comments.length;

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

        const averageRatingnumber = averageRatingQuery[0].average;

        if(averageRatingnumber >= minRating && commentsCount >= minComments) {
            shouldGetMedal = "true";
        }

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
            body: shouldGetMedal
    };
}