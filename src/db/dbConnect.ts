import { Pool } from "pg";
import envConfig from "../config/envConfig";


const pool = new Pool({
    host: envConfig.PG_HOST,
    port: envConfig.PG_PORT,
    database: envConfig.PG_DATABASE,
    user: envConfig.PG_USER,
    password: envConfig.PG_PASSWORD,
});

pool.connect((err: any, client: any, done: any) => {
    if (err) {
        console.error("Error connecting to database:", err.message);
    } else {
        console.log("Connected to database successfully.");
    }
});
// pool.query('SELECT current_database()', (err, res) => {
//     if (err) {
//         console.error('Error querying database:', err);
//     } else {
//         console.log('Connected to DB:', res.rows[0].current_database);
//     }
// });

export default pool;


// CREATE TABLE stock_history (
//     id SERIAL PRIMARY KEY,
//     date VARCHAR(20) NOT NULL,
//     symbol VARCHAR(20) NOT NULL,
//     open NUMERIC NOT NULL,
//     close NUMERIC NOT NULL,
//     day_change NUMERIC NOT NULL,
//     day_change_percentage NUMERIC NOT NULL
// );