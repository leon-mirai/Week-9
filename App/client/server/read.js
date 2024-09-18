const express = require("express");
const { MongoClient } = require("mongodb");
const router = express.Router();

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

router.get("/products", async (req, res) => {
  try {
    await client.connect();
    const db = client.db("mydb");
    const productsCollection = db.collection("products");

    const products = await productsCollection.find().toArray();
    res.json(products);
  } catch (err) {
    res.status(500).send(err.message);
  } finally {
    await client.close();
  }
});

module.exports = router;
