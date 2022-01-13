import express, { Request, Response } from "express";
import { successHandler, errorHandler } from "package.breezebd.com";
import { useSocket, useUsers } from "../socket";

const router = express.Router();

// console.log(router);

router.post("/api/esp32", async (req: Request, res: Response) => {
    try {
        // console.log(req.body);
        const users = useUsers();
        const socket = useSocket();

        if (socket && users.length > -1) {
            socket.emit("DEVICE_DATA", { data: req.body });
            return successHandler(res, 200, "Device data sended successfully!");
        }
        // CONNECTED_USER.forEach((user, idx) => {
        //     const { room } = user;
        //     console.log(`Room ${idx}: ${room}`);
        // });
        return errorHandler(res, 404, "Active user not found!");
    } catch (error) {
        return errorHandler(res, 500, "Server error found!");
    }
});

export { router as getDataFromEsp32 }