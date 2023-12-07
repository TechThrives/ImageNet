import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

if (!uri) {
  throw new Error("Add Mongo URI to env file");
}

const client = new MongoClient(uri, options);

async function connectToMongo() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error; // Rethrow the error to signal a failure in connection setup
  }
}

// Call the connection function when the module is imported
connectToMongo();

// Export the connected database
export default client.db("project-hub");
