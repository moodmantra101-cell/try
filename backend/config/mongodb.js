import mongoose from "mongoose";

const connetDB = async () => {
  mongoose.connection.on("connected", () => console.log("Database Connected!"));

  // Use the provided connection string as-is; do not append a database suffix
  // because the URI may already include one and query parameters.
  await mongoose.connect(process.env.MONGODB_URI);
};

export default connetDB;
