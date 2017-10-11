import Joi from 'joi';
import Dotenv from 'dotenv';

Dotenv.load({ path: './.env' });

const evnObject = Joi.object({
        NODE_ENV: Joi.string()
            .allow(['development', 'production', 'test', 'provision'])
            .default('development'),
        DATABASE_CLIENT: Joi.string()
            .allow(['mongodb', 'mysql'])
            .default('mongodb'),
        SERVER_PORT: Joi.number()
            .default(8000),
        MONGOOSE_DEBUG: Joi.boolean()
            .when('NODE_ENV', {
                is: Joi.string().equal('development'),
                then: Joi.boolean().default(true),
                otherwise: Joi.boolean().default(false)
            }),
        SECRET_TOKEN: Joi.string()
            .description('Secret token required to sign'),
        MONGO_HOST: Joi.string()
            .description('Mongo DB host'),
        MONGO_PORT: Joi.number()
            .default(27017),
        MONGO_DATABASE_NAME: Joi.string()
            .default('mean-chat-io'),
        MYSQL_HOST: Joi.string()
            .description('MySQL DB host'),
        MYSQL_PORT: Joi.number()
            .default(3306),
        MYSQL_USERNAME: Joi.string()
            .description('MySQL DB username'),
        MYSQL_PASSWORD: Joi.string()
            .description('MySQL DB password'),
        MYSQL_DATABASE_NAME: Joi.string()
            .default('mean-chat-io')
    }).unknown()
    .required();

const { error, value: envVars } = Joi.validate(process.env, evnObject);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const config = {
    env: envVars.NODE_ENV,
    port: envVars.SERVER_PORT,
    mongooseDebug: envVars.MONGOOSE_DEBUG,
    secret_token: envVars.SECRET_TOKEN,
    database_client: envVars.DATABASE_CLIENT,
    mongo: {
        host: envVars.MONGO_HOST,
        port: envVars.MONGO_PORT,
        database_name: envVars.MONGO_DATABASE_NAME
    },
    mysql: {
        host: envVars.MYSQL_HOST,
        port: envVars.MYSQL_PORT,
        username: envVars.MYSQL_USERNAME,
        password: envVars.MYSQL_PASSWORD,
        database_name: envVars.MYSQL_DATABASE_NAME
    }
};

export default config;