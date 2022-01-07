import express, { Request, Response } from "express";
import { successHandler, errorHandler } from "package.breezebd.com";
import { User } from "../models/user";
import { rdsClint, cacheCheck } from './middleware';

const router = express.Router();

router.get("/api/users/active", cacheCheck, async (req: Request, res: Response) => {
    // console.log("HI, I'm active user.");
    const { key } = req.body;
    await User.find({}).exec((err, docs) => {
        // console.log(err, docs);
        const activeUsers = docs.filter(doc => doc.status === true);
        if (!err && docs.length > 0 && activeUsers.length > 0) {
            rdsClint.setex(key, 86400, activeUsers as any);
            return successHandler(res, 200, activeUsers);
        }
        return errorHandler(res, 404, "Active user not found!")
    });
});

export { router as activeUserRouter }