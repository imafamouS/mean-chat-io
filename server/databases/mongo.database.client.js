import Mongoose from 'mongoose';

import Config from '../config/config';
import BaseClient from './base.database.client';

const MONGO_URI = `mongodb://${Config.mongo.host}:${Config.mongo.port}/${Config.mongo.database_name}`;

Mongoose.Promise = global.Promise;

class MongoDBClient extends BaseClient {
    constructor() {
        super(MONGO_URI,"mongodb");

        this.getURI = this.getURI.bind(this);
        this.getType = this.getType.bind(this);
    }

    openConnection() {
        Mongoose.connect(this.getURI(), { useMongoClient: true, promiseLibrary: global.Promise })
            .then(() => console.log("Connected mongodb"))
            .catch((err) => console.log(err));
    }
}


export default MongoDBClient;