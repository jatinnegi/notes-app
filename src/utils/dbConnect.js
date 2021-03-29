import mongoose from "mongoose";

const connection = {};

async function dbConnect() {
  if (connection.isConnected) return;

  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true,
    });

    connection.isConnected = db.connections[0].readyState;

    console.log(connection.isConnected);
  } catch (err) {
    console.log(err.message);
  }
  return;
}

export default dbConnect;
