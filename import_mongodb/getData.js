const {MongoClient} = require('mongodb');

const connect = () => {
    const uri = "mongodb://localhost:27017/expensetracker";
    const client = new MongoClient(uri);
    return client;
}

module.exports.findData = (databaseName, collectionName) => {
    let data = [];
    return new Promise(
        (resolve, reject) => {
            const client = connect();
            try {
                const db = client.db(databaseName);
                // const collection = db.collection(collectionName);
                db.collection(collectionName).find({}).toArray((err, results) => {
                    // console.log(results);
                    data = [...results];
                    client.close();
                    // console.log(data);
                    resolve(data);
                })
            }
            catch(error){
                console.log(error);
                reject(error);
            }
        } 
    );
}