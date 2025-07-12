/**
 * @fileoverview MongoDB connection client with caching and error handling for production environments
 * Provides singleton connection pattern to prevent multiple connections and optimize performance
 * Includes connection caching, error handling, and environment validation for reliable database operations
 */

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Establishes and manages MongoDB database connection with caching for optimal performance
 * @async
 * @function dbConnect
 * @returns {Promise<mongoose.Mongoose>} Mongoose connection instance
 * @throws {Error} If MongoDB connection fails or environment variables are missing
 *
 * @description
 * - Uses singleton pattern to prevent multiple connections
 * - Caches connection globally for reuse across application
 * - Validates environment configuration before attempting connection
 * - Provides detailed error logging for debugging connection issues
 * - Optimized for Next.js serverless environment with bufferCommands disabled
 */
async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then(mongoose => {
      console.log("📊 MongoDB connected successfully");
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
}

export default dbConnect;
