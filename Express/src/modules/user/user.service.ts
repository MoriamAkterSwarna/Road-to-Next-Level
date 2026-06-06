import { pool } from "../../db";
import type { IUser } from "./user.interface";
import bcrypt from "bcryptjs";

const createUserDB = async(payload: IUser) => {

    const { name, email, password, age } = payload


    const hashPassword = await bcrypt.hash(password, 12);

    const result = await pool.query(`
        INSERT INTO users(name, email, password, age)
        VALUES($1, $2, $3, $4)
      
        RETURNING *
        `, [name, email, hashPassword, age])

        delete result.rows[0].password
    return result;
}

const getAllUsersDB = async() => {
    const result = await pool.query(`SELECT * FROM users`)
    return result;
}

const getUserByIdDB = async(id: string) => {
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id])
    return result;
}

const updateUserDB = async(id: string, payload: IUser) => {
    const { name, email, password, age } = payload
    const result = await pool.query(`
        UPDATE users
        SET name = $1, email = $2, password = $3, age = $4, updated_at = NOW()
        WHERE id = $5
        RETURNING *
    `, [name, email, password, age, id])
    return result;
}

const deleteUserDB = async(id: string) => {
    const result = await pool.query(`DELETE FROM users WHERE id = $1 RETURNING *`, [id])
    return result;
}

export const userService = {
    createUserDB,
    getAllUsersDB,
    getUserByIdDB,
    updateUserDB,
    deleteUserDB
}