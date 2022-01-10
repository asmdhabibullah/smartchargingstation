import {
    validateRequest, ServerError, successHandler, errorHandler
} from "package.breezebd.com";
import express, { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { body } from "express-validator";
import { User } from "../models/user";

const router = express.Router();

router.post(
    "/api/user/signup",
    [
        body('email').isEmail().withMessage('Email must be valid'),
        body('password')
            .trim()
            .isLength({ min: 4, max: 20 })
            .withMessage('You must supply a password'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        try {
            const { firstName, lastName, email, password } = req.body;

            const existingUser = await User.findOne({ email });

            // console.log("existingUser", existingUser);

            if (existingUser) {
                return errorHandler(res, 200, 'This email already taken.');
            };

            const [userName, _] = email.split("@");

            const user = User.build({
                firstName, lastName, userName, status: true, email, password
            });

            await user.save();

            // Generate JWT
            const userJwt = sign(
                {
                    id: user.id,
                    email: user.email,
                },
                process.env.JWT_KEY!
            );

            // Store it on session object
            req.session = {
                jwt: userJwt,
            };

            // return res.status(201).json({ message: user });
            return successHandler(res, 201, user);
        } catch (error) {
            throw new ServerError("Server error!")
        }
    }
);

export { router as signupUserRouter }