import express, { Request, Response } from "express";
import { successHandler, errorHandler } from "package.breezebd.com";
import { Station } from "../models/station";
import { useSocket, useUsers } from "../socket";

const router = express.Router();

// console.log(router);

router.post("/api/esp32", async (req: Request, res: Response) => {
    try {
        // console.log(req.body);
        const users = useUsers();
        const socket = useSocket();
        const { firstValue, secondValue, thirdValue } = req.body;

        const value = (parseFloat(firstValue) + parseFloat(secondValue) + parseFloat(thirdValue))

        // console.log("value", value);

        let deviceCharging: boolean = false;

        if (value > 0) {
            deviceCharging = true;
        }

        const checkIn = new Date(Date.now());
        const checkOut = new Date(Date.now());
        checkOut.setHours(8, 0, 0);

        const data = {
            device: "BIKE",
            chargingStationName: "Yunnan University Cheengong Station",
            chargingStationLocation: "Yunnan University, Cheengong Campous",
            chargingStationPorts: {
                checkIn: checkIn,
                checkOut: checkOut,
                portNumber: "54664558156",
                portAddress: "Yunnan University, Cheengong Campous, Street: 5625, Po: 650500, Number: 54664558156",
                charging: deviceCharging,
                totalChargingTime: "8h"
            }
        }

        // console.log("Data", data);


        if (socket && users.length > -1) {
            socket.emit("DEVICE_DATA", { data });
            return successHandler(res, 200, "Device data sended successfully!");
        }
        // CONNECTED_USER.forEach((user, idx) => {
        //     const { room } = user;
        //     console.log(`Room ${idx}: ${room}`);
        // });
        const chatgingStation = new Station({
            device: "BIKE",
            chargingStationName: "Yunnan University Cheengong Station",
            chargingStationLocation: "Yunnan University, Cheengong Campous",
            chargingStationPorts: {
                checkIn: checkIn,
                checkOut: checkOut,
                portNumber: "54664558156",
                portAddress: "Yunnan University, Cheengong Campous, Street: 5625, Po: 650500, Number: 54664558156",
                charging: deviceCharging,
                totalChargingTime: "8h"
            }
        });

        await chatgingStation.save();

        return errorHandler(res, 404, "Active user not found!");
    } catch (error) {
        return errorHandler(res, 500, "Server error found!");
    }
});

export { router as getDataFromEsp32 }