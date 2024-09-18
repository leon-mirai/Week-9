const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const router = express.Router();

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

router.delete("/products/:id", async (req, res) => {
  const productId = req.params.id; // get the product ID from the URL

  // check if the provided ID is a valid ObjectId
  if (!ObjectId.isValid(productId)) {
    return res.status(400).send("Invalid product ID format");
  }

  try {
    await client.connect();
    const db = client.db("mydb");
    const productsCollection = db.collection("products");

    // Delete product by its ObjectId
    const result = await productsCollection.deleteOne({
      _id: new ObjectId(productId),
    });
    if (result.deletedCount === 0) {
      return res.status(404).send("Product not found");
    }
    res.send("Product deleted!");
  } catch (err) {
    res.status(500).send(err.message);
  } finally {
    await client.close();
  }
});

module.exports = router;
