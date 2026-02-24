import { pool } from "../../config/db"

const createUserDB = async (name:string,email:string) => {
    const result = await pool.query(`INSERT INTO  users (name,email) VALUES ($1,$2) RETURNING *`, [name, email]);
    return result;
}


const getUserDB = async () => {
    const result = await pool.query(`SELECT * FROM users`);
    return result;
}

const getSingleUserDB = async (id:string) => {
    const result = await pool.query(`SELECT * FROM users WHERE id =$1 `, [id]);
    return result
}



const updateSingleUserDB = async (name:string,email:string,id:string) => {
    const result = await pool.query(
      `UPDATE users
       SET name = $1, email = $2
       WHERE id = $3
       RETURNING *`,
      [name, email, id]
    );

    return result;
}


const deleteSingleUserBD = async (id:string) => {
        const result = await pool.query(
      `DELETE FROM users WHERE id = $1 RETURNING *`,
      [id]
    );
    return result;

}


export const userServices = {
    createUserDB,
    getUserDB,
    getSingleUserDB,
    updateSingleUserDB,
    deleteSingleUserBD
}