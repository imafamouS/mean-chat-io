import MongoDBClient from './mongo.database.client';
import MySqlDBClient from './mysql.database.client';

const DatabaseSupport = {
    MYSQL: "mysql",
    MONGODB: "mongodb"
};

function getClient(client) {
    switch (client) {
        case DatabaseSupport.MONGODB:
            return new MongoDBClient();
        case DatabaseSupport.MYSQL:
            return new MySqlDBClient();
        default:
            return undefined;
    }
}

export default { DatabaseSupport, getClient };