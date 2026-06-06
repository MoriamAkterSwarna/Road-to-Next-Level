
import express, { type Application, type Request, type Response } from 'express'
const app : Application = express()
import {  pool } from './db'
import { userRoute } from './modules/user/user.route'
import { profileRoute } from './modules/profile/profile.route'
import { authRoute } from './modules/auth/auth.route'



app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({extended: true}))


app.use('/api/v1', userRoute);
app.use('/api/v1/profile', profileRoute);
app.use('/api/v1/auth', authRoute);



app.get('/', (req:Request, res:Response) => {
//   res.send('Hello World!') 

res.status(200).json({
    message: "Hello World!",
    author: "Queen-Zone"
})

})




export default app; 