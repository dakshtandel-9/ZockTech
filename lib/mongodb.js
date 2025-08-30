// lib/mongodb.js
import mongoose from 'mongoose';

const { MONGODB_URI } = process.env;

// Only throw error at runtime, not during build
if (!MONGODB_URI && typeof window === 'undefined' && process.env.NODE_ENV !== 'production') {
  console.warn('Warning: MONGODB_URI is not set. Database operations will fail.');
}

let cached = global.mongoose;
if (!cached) cached = (global.mongoose = { conn: null, promise: null });

export async function dbConnect() {
  if (!MONGODB_URI) {
    throw new Error('Missing MONGODB_URI environment variable');
  }
  
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false }).then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
