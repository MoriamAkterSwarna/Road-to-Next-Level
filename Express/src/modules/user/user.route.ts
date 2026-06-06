import { Router } from "express";
import { UserController } from "./user.controller";



const router = Router()

router.post('/user', UserController.createUser) 
router.get('/users', UserController.getAllUsers)
router.get('/user/:id', UserController.getUserById)
router.put('/user/:id', UserController.updateUser)
router.delete('/user/:id', UserController.deleteUser)

export const userRoute = router; 