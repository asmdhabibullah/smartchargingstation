import express, { Request, Response } from "express";
import { successHandler, errorHandler } from "package.breezebd.com";
import { SOCKETIO } from "../app";

const router = express.Router();

router.post("/api/esp32", async (req: Request, res: Response) => {
    try {
        // console.log("CONNECTED_USER", CONNECTED_USER);
        SOCKETIO.emit("DEVICE_DATA", { data: req.body });
        // CONNECTED_USER.forEach((user, idx) => {
        //     const { room } = user;
        //     console.log(`Room ${idx}: ${room}`);
        // });

        return successHandler(res, 200, "Device data sended successfully!");
    } catch (error) {
        return errorHandler(res, 500, "Server error found!")
    }
});

export { router as getDataFromEsp32 }