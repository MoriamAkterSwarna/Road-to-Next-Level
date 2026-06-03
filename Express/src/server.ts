
import express, { type Application, type Request, type Response } from 'express'
import config from './config'
const app : Application = express()
const port = config.port
import {Pool} from 'pg'



app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({extended: true}))


const pool = new Pool({
    connectionString: config.connectionString
})


const initDB = async () => {
    try {
        

        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(20), 
                email VARCHAR(20) UNIQUE NOT NULL,
                password VARCHAR(20) NOT NULL,
                is_Active BOOLEAN DEFAULT true, 
                age INT,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            
            )
        `)
            
            console.log("Database connected and table created successfully")
    }
    catch (err) {
        console.error("Error connecting to the database:", err)
    }
}

initDB()

app.get('/', (req:Request, res:Response) => {
//   res.send('Hello World!') 

res.status(200).json({
    message: "Hello World!",
    author: "Queen-Zone"
})

})

app.post('/user', async (req:Request, res:Response) => {
//    console.log(req.body)

const { name, email, password, age } = req.body 


try {
    const result = await pool.query(`
    INSERT INTO users(name, email, password, age)
    VALUES($1, $2, $3, $4)
    RETURNING * 
    `, [name, email, password, age])
    // console.log(result)
res.status(201).json({
    message: "Data created successfully",
    data: result.rows[0]
})
}
catch (err: any) {
    
    console.error("Error inserting data into the database:", err)
    res.status(500).json({
        message: err

    })

}


})


app.get('/users', async (req:Request, res:Response) => {
    try {
        const result = await pool.query(`SELECT * FROM users`)
        res.status(200).json({
            success: true,
            message: "Data retrieved successfully",
            data: result.rows
        })
    }
    catch (err: any) {
        console.error("Error retrieving data from the database:", err)
        res.status(500).json({
            success: false,
            message: err
        })
    }
})


app.get('/user/:id', async (req:Request, res:Response) => {
    const { id } = req.params
    try {
        const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id])
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
})



app.put('/user/:id', async (req:Request, res:Response) => {
    const { id } = req.params
    const { name, email, password, age } = req.body
    try {
        const result = await pool.query(`
        UPDATE users 
        SET 
        name = COALESCE($1, name),
        email = COALESCE($2, email),
        password = COALESCE($3, password),
        age = COALESCE($4, age),
        updated_at = NOW()
        WHERE id = $5
        RETURNING *
        `, [name, email, password, age, id])
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
})

app.delete('/user/:id', async (req:Request, res:Response) => {
    const { id } = req.params
    try {
        const result = await pool.query(`
        DELETE FROM users 
        WHERE id = $1   
        RETURNING *
        `, [id])
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
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})