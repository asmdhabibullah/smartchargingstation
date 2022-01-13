import "dotenv/config";
import cors from 'cors'
import express from 'express';
import 'express-async-errors';
import { createServer } from 'http';
import { json } from 'body-parser';
import { connect } from "mongoose";
import { Socket } from 'socket.io';
import cookieSession from 'cookie-session';

// Router imported
import { signinUserRouter } from './routers/signin';
import { activeUserRouter } from './routers/activeUsers';
import { signoutUserRouter } from './routers/signout';
import { signupUserRouter } from './routers/signup';
import { updateUserRouter } from './routers/updateUser';
import { deleteUserRouter } from './routers/deleteUser';
import { getDataFromEsp32 } from './routers/getDataFromEsp32';
// Socket imported
import { getUsers, redySocketIo, setUser, updateUsers } from './socket';
// Database connection imported

// Express app
const app = express();

app.use(cors());
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        // secure: process.env.NODE_ENV !== 'test',
        secure: false,
    })
);

// console.log("No error, App Running");
// Routing
// User
app.use(signinUserRouter);
app.use(activeUserRouter);
app.use(signoutUserRouter);
app.use(signupUserRouter);
app.use(updateUserRouter);
app.use(deleteUserRouter);
// Device
// Payment
// Station
// Get data from ESP32
app.use(getDataFromEsp32);
// console.log("Called ESP32");

// app.use(errorHandler);
app.all('/', async (req, res) => {
    return res.status(200).json({ message: "App working!" })
});

// console.log("CLINT", CLINT);

// const IO = new Server(server, {
//     cors: {
//         origin: "http://localhost:3000"
//     }
// });

// HTTP server
const server = createServer(app);

// SocketIO
const IO = redySocketIo(server);

IO.on("connection", (socket: Socket) => {
    console.log("New user ping to server!");

    let users: any[] = [];

    socket.on("CONNECT_USER", ({ user }) => {
        // console.log(user);
        socket.join(user);

        setUser({ id: socket.id, user });

        console.log('User connected with socket successfully!');
        users = getUsers();
        socket.broadcast.emit("USERS", { users });

        // IO.emit("DEVICE_DATA", { user });
    })
    // socket.emit('status', 'Hello from Socket.io');

    socket.on('disconnect', (reason) => {
        console.log('client disconnected for the reason of: ' + reason);
        let index = -1;
        if (users.length >= 0) {
            index = users.findIndex(e => e.id == socket.id);
        };

        // console.log("index", index);

        if (index >= 0) {
            const leavedUser = users.filter(usr => usr.id === socket.id);
            users.splice(index, 1);
            updateUsers(users);
            IO.emit("LEAVE_USER", { user: leavedUser, reason: reason });
        };
    });
});

// Get PORT from environment
const port = parseInt(process.env.PORT || "4550", 10);

server.listen(port, async () => {
    try {
        const DB_URI = process.env.MONGO_URI || "mongodb://localhost:27017/smartchargingstation";
        await connect(DB_URI);
        console.log("Smart charging station database connected successfully");
        console.log(`Smart charging station app runing on: http://localhost:${port}`);
    } catch (error) {
        console.error(error);
    }
});
