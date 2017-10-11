import MySQL from 'mysql';

import Config from '../config/config';
import BaseClient from './base.database.client';

const MYSQL_URI = `mysql://${Config.mysql.username}:${Config.mysql.password}@${Config.mysql.host}:${Config.mysql.port}/${Config.mysql.database_name}?debug=true`;

class MySqlDBClient extends BaseClient {
    constructor() {
        super(MYSQL_URI, "mysql");
        this.connectionPool = MySQL.createPool(MYSQL_URI);

        this.getURI = this.getURI.bind(this);
        this.getType = this.getType.bind(this);
    }

    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connectionPool.query(sql, args, (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }
    close() {
        return new Promise((resolve, reject) => {
            this.connectionPool.end(err => {
                if (err)
                    return reject(err);
                resolve();
            });
        });
    }
}

export default MySqlDBClient;