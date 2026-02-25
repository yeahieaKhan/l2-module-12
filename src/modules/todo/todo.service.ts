import { pool } from "../../config/db";

const createTodoDB = async(id:string) => {
    const result =  pool.query(
      `SELECT * FROM users WHERE id = $1`,
      [id]
    );

    return result
}



const getToDoDB = async () => {
    const result = pool.query(`SELECT * FROM todos ORDER BY id DESC`);
    return result
}

export const todosService ={
    createTodoDB,
    getToDoDB
}