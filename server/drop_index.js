import mongoose from "mongoose";
import "dotenv/config";

const MONGO_URI = "mongodb+srv://HafsaHikal:Hafsa123456@cluster0.4ohfzzv.mongodb.net/portfoliogenie?retryWrites=true&w=majority&appName=Cluster0";

async function run() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI);
    console.log("Connected! Checking indexes on 'users' collection...");
    
    const db = mongoose.connection.db;
    const collections = await db.listCollections({ name: "users" }).toArray();
    if (collections.length === 0) {
      console.log("Collection 'users' not found.");
      process.exit(0);
    }

    const indexes = await db.collection("users").indexes();
    console.log("Current indexes:", indexes);

    const hasGithubIndex = indexes.some(idx => idx.name === "githubId_1");
    if (hasGithubIndex) {
      console.log("Dropping index 'githubId_1'...");
      await db.collection("users").dropIndex("githubId_1");
      console.log("Index dropped successfully!");
    } else {
      console.log("Index 'githubId_1' not found.");
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected.");
    process.exit(0);
  }
}

run();
