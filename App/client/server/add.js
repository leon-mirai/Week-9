const express = require("express");
const { MongoClient } = require("mongodb");

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

router.post("/products", async (req, res) => {
  const { id, name, description, price, units } = req.body;

  // input validation
  if (!id || !name || !description || !price || !units) {
    return res.status(400).json({
      error: "All fields (id, name, description, price, units) are required.",
    });
  }

  // validate price and units data types
  if (isNaN(price) || isNaN(units)) {
    return res
      .status(400)
      .json({ error: "Price must be a number and units must be an integer." });
  }

  try {
    // check if the product ID already exists
    const existingProduct = await productsCollection.findOne({ id: id });
    if (existingProduct) {
      return res
        .status(400)
        .json({ error: "Product with the same ID already exists" });
    }

    // prepare the new product object
    const newProduct = {
      id,
      name,
      description,
      price: parseFloat(price), // ensure price is stored as a float
      units: parseInt(units), // ensure units are stored as an integer
    };

    // add new product to the collection (MongoDB 4.x+)
    const result = await productsCollection.insertOne(newProduct);

    // return the created product (using the insertedId for MongoDB 4.x)
    res.status(201).json({
      message: "Product added successfully!",
      product: { ...newProduct, _id: result.insertedId }, // Attach the insertedId
    });
  } catch (err) {
    // catch any errors and return a server error
    res.status(500).json({ error: "Error adding product: " + err.message });
  }
});

module.exports = router;
