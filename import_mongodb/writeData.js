const {MongoClient} = require('mongodb');

const connect = () => {
    const uri = "mongodb://localhost:27017/expensetracker";
    const client = new MongoClient(uri);
    return client;
}

module.exports.insertData = (databaseName, collectionName, data) => {
    const client = connect();
    try {
        const db = client.db(databaseName);
        const collection = db.collection(collectionName);
        collection.insertMany(data).then(
            (result) => {
                // console.log(result);
                client.close();
            }
        );
    }
    catch(error){
        console.log(error);
    }
}