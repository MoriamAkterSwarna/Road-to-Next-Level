import type { Request, Response } from "express"

const createAuth = (req: Request, res: Response) => {
    res.status(201).json({
        success: true,
        message: "Auth created successfully!"
    })
}

export const AuthController = {
    createAuth
}