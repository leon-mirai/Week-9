const { MongoClient } = require('mongodb');

// mongoDB connection URI
const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);

async function connectToDb() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        
        const db = client.db('mydb');
        const productsCollection = db.collection('products');
        return productsCollection;
    } catch (err) {
        console.error(err);
    }
}

module.exports = { connectToDb, client };
