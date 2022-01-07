import { createClient } from 'redis';
import { successHandler } from "package.breezebd.com";
import { Request, Response, NextFunction } from "express";

export const rdsClint = createClient({
    url: 'rediss://library-cache-srv:6379/library-cache'
}).on("error", (error) => {
    console.error(error);
    console.log("Redis connection error!");
});


export const cacheCheck = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { key } = req.body;

        const getData = await rdsClint.get(key);
        if (getData) {
            return successHandler(res, 200, getData);
        }
        console.log("Next func running!");
        next();
    } catch (error) {
        return successHandler(res, 500, "Server error!")
    }
}