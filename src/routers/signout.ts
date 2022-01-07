import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
    validateRequest, ServerError, successHandler, errorHandler
} from "package.breezebd.com";
import { User } from "../models/user";

const router = express.Router();

router.post("/api/user/signout",
    [
        body('email').isEmail().withMessage('Email must be valid'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        try {
            const { email } = req.body;

            const existingUser = await User.findOne({ email });
            // console.log(existingUser);

            if (existingUser) {
                if (existingUser.status) {
                    existingUser.status = false;
                    await existingUser.save();
                    req.session = null;
                    return successHandler(res, 200, "User logout successfully!");
                }
                return successHandler(res, 200, "User already logout!");
            }
            return errorHandler(res, 404, "User not found!")
        } catch (error) {
            throw new ServerError("Server error!");
        }
    });

export { router as signoutUserRouter }