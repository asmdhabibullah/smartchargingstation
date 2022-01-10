import { server } from './app';
import { connect } from "mongoose";

const dbConnect = async () => {
    try {
        const DB_URI = process.env.MONGO_URI || "mongodb://localhost:27017/smartchargingstation";
        await connect(DB_URI);
        console.log("Smart charging station database connected successfully");
    } catch (error) {
        console.log(error);
    }
};

// Get PORT from environment
const port = process.env.PORT || 4548;

server.listen(port, () => {
    console.log(`Smart charging station app runing on: http://localhost:${port}`);
});

dbConnect();
