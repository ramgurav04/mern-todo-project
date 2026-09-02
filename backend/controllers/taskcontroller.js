import { connection, CollectionName } from "../dbconfig.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export const add_task = async (req, res) => {
  try {
    const db = await connection();
    const collection = db.collection(CollectionName);
    const result = await collection.insertOne({ ...req.body, userId: req.user.id });
    return res.status(201).json({
      message: "Task added successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }
    const db = await connection();
    const usersCollection = db.collection("users");
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }
    const result = await usersCollection.insertOne({ name, email, password });
    const token = jwt.sign({ email, id: result.insertedId }, JWT_SECRET, { expiresIn: "1h" });
    return res.status(201).json({
      message: "Signup successful",
      success: true,
      token,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}