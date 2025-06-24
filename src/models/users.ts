import pool from "../db/dbConnect";

const User = pool.query("SELECT * FROM users");

export default User;
