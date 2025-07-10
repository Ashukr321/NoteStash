import { config } from 'dotenv';
config();

const configObject = {
  port: process.env.PORT,
  mongo_uri: process.env.MONGO_URI,
  db_name: process.env.DB_NAME
};

const envConfig = Object.freeze(configObject);
export default envConfig;