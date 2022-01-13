import { Server } from 'http';
import { Server as SocketIoServer } from "socket.io";

let users: any[] = [];
let SocketIo: SocketIoServer;

export const useUsers = () => users;
export const useSocket = () => SocketIo;

export const redySocketIo = (server: Server) => {
    const CLINT = process.env.FRONTEND_PROD_URI || process.env.FRONTEND_DEV_URI;
    const IO: SocketIoServer = new SocketIoServer(server, {
        cors: {
            origin: `${CLINT}`
        }
    });
    SocketIo = IO;
    return IO.attach(server);
}

export const setUser = (user: any) => {
    users.push(user)
}

export const getUsers = () => users;

export const updateUsers = (users: any) => {
    users = users;
}