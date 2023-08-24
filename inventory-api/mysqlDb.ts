import mysql, {Connection} from 'mysql2/promise';
import config from "./config";

let connection: Connection | null = null;

const mysqlDb = {
    async init(){
        if(config.db.database === ''){
            connection = await mysql.createConnection(config.db);
            await connection.query('CREATE DATABASE IF NOT EXISTS inventory');
            config.db.database = 'inventory'
        }

        connection = await mysql.createConnection(config.db);
    },
    getConnection(): Connection {
        if(!connection) throw new Error('Ошибка подключения к базе данных!');
        return connection;
    }
};

export default mysqlDb;