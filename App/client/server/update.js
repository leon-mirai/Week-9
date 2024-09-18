const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const router = express.Router();

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

// declare a variable for the collection
let productsCollection;

// connect to the database and set up the collection
async function connectToDb() {
  try {
    await client.connect();
    const db = client.db("mydb");
    productsCollection = db.collection("products");
    console.log("Connected to MongoDB and products collection set");
  } catch (err) {
    console.error("Error connecting to the database:", err.message);
  }
}

// connect to the database at server startup
connectToDb();

// update a product by _id
router.put("/products/:id", async (req, res) => {
  const productId = req.params.id;
  const updatedProduct = req.body;

  if (!ObjectId.isValid(productId)) {
    return res.status(400).json({ error: "Invalid product ID format" });
  }

  try {
    const result = await productsCollection.updateOne(
      { _id: new ObjectId(productId) },
      { $set: updatedProduct }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully!" });
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ error: "Error updating product: " + err.message });
  }
});

module.exports = router;
