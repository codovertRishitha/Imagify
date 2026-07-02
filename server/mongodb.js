import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);

        console.log("✅ Database Connected");
        console.log("Database Name:", conn.connection.name);
        console.log("Host:", conn.connection.host);

    } catch (err) {
        console.error("MongoDB Error:", err);
    }
};

export default connectDB;