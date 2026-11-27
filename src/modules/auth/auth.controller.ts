import type { NextFunction, Request, Response } from "express";
import { authService } from "./auth.service";
import sendResponse from "../../utils/sendResponse";

// Create user
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

// Login User
const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const loginData = req.body
        
        const result = await authService.loginUser(loginData)

        sendResponse(res,{
            statusCode: 200,
            success: true,
            message: "Login successful",
            data: result
        })
    } catch(er) {
        next(er)
    }
}

export const authController = {
    createUser,
    loginUser
}