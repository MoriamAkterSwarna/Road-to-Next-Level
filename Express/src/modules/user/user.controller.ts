import type { Request, Response } from "express";

import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  //    console.log(req.body)

  // const { name, email, password, age } = req.body

  try {
    const result = await userService.createUserDB(req.body);
    // console.log(result)

    res.status(201).json({
      message: "Data created successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    console.error("Error inserting data into the database:", err);
    res.status(500).json({
      message: err,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUsersDB();
    res.status(200).json({
        success: true,
        message: "Data retrieved successfully",
        data: result.rows
    })
    } catch (err: any) {
    console.error("Error retrieving data from the database:", err);
    res.status(500).json({
        success: false,
        message: err
    })
    }
};

const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const result = await userService.getUserByIdDB(id as string)
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        else {
            res.status(200).json({
                success: true,
                message: "User found",
                data: result.rows[0]
            })
        }
    }
    catch (err: any) {
        console.error("Error retrieving user from the database:", err)
        res.status(500).json({
            success: false,
            message: err
        })
    }
}

const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const result = await userService.updateUserDB(id as string, req.body)
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        else {
            res.status(200).json({
                success: true,
                message: "User updated successfully",
                data: result.rows[0]
            })
        }
    }
    catch (err: any) {
        console.error("Error updating user in the database:", err)
        res.status(500).json({
            success: false,
            message: err
        })
    }
}

const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const result = await userService.deleteUserDB(id as string)
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "User not found"
            })
        }   
        else {
            res.status(200).json({
                success: true,
                message: "User deleted successfully",
                data: result.rows[0]
            })
        }
    }
    catch (err: any) {
        console.error("Error deleting user from the database:", err)
        res.status(500).json({
            success: false,
            message: err
        })
    }
}


export const UserController = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};
