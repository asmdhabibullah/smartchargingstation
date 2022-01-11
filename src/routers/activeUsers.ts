import express, { Request, Response } from "express";
import { successHandler, errorHandler } from "package.breezebd.com";
import { User } from "../models/user";
// import { rdsClint, cacheCheck } from './middleware';

const router = express.Router();

router.get("/api/users/active",  async (req: Request, res: Response) => {
    // console.log("HI, I'm active user.");
    const { key } = req.body;
    await User.find({ status: true }).exec((err, docs) => {
        // console.log(err, docs);
        if (!err && docs.length > 0 && docs.length > 0) {
            // rdsClint.setex(key, 86400, docs as any);
            return successHandler(res, 200, docs);
        }
        return errorHandler(res, 404, "Active user not found!")
    });
});

export { router as activeUserRouter }