import type { NextFunction, Request, Response } from "express";
import { authService } from "./auth.service";
import sendResponse from "../../utils/sendResponse";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const userData = req.body;
        
        const result = await authService.createUserIntoDB(userData)

        sendResponse(res,{
            statusCode: 200,
            success: true,
            message: "User Created Successfully!",
            data: result
        })
    } catch(er) {
        next(er)
    }
};

export const authController = {
    createUser
}