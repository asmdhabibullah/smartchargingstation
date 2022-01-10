require("dotenv");
import cors from 'cors'
import express from 'express';
import 'express-async-errors';
import { createServer } from 'http';
import { json } from 'body-parser';
import { Server, Socket } from 'socket.io';
import cookieSession from 'cookie-session';
import { NotFoundError } from 'package.breezebd.com';

import { signinUserRouter } from './routers/signin';
import { activeUserRouter } from './routers/activeUsers';
import { signoutUserRouter } from './routers/signout';
import { signupUserRouter } from './routers/signup';
import { updateUserRouter } from './routers/updateUser';
import { deleteUserRouter } from './routers/deleteUser';
import { getDataFromEsp32 } from './routers/getDataFromEsp32';

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

app.all('*', async (req, res) => {
    console.log("Error handaling for all routers.");
    throw new NotFoundError();
});

// app.use(errorHandler);


// HTTP server
const server = createServer(app);

// SocketIO
const IO = new Server(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});

export let SOCKETIO: Socket;
export let CONNECTED_USER: any[] = [];

IO.on("connection", (socket) => {
    SOCKETIO = socket;
    // console.log(socket);
    console.log("Client connected");

    socket.on("CONNECT_USER", ({ data }: any) => {
        socket.join(data);
        // console.log("data", data);
        CONNECTED_USER.push({
            id: socket.id,
            room: data
        });
    });

    // socket.on("disconnect", () => {
    //     console.log("Socket destroyed!");
    // });
    // console.log("socket.rooms", socket.rooms);


    socket.on("disconnecting", (reason) => {

        console.log(`Client disconnected for ${reason}`);

        let index = -1;
        if (CONNECTED_USER.length >= 0) {
            index = CONNECTED_USER.findIndex(e => e.id == socket.id);
        };

        // console.log("index", index);

        if (index >= 0) {
            const leavedUser = CONNECTED_USER.filter(usr => usr.id === socket.id);
            CONNECTED_USER.splice(index, 1);
            IO.emit("LEAVE_USER", { user: leavedUser });
        };
    });
});

export { server };