import { config } from 'dotenv';
config();

const configObject = {
  port: process.env.PORT,
  mongo_uri: process.env.MONGO_URI,
  db_name: process.env.DB_NAME,
  jwt_secret: process.env.JWT_SECRET,
  jwt_expire_time:process.env.JWT_EXPIRE_TIME
};

const envConfig = Object.freeze(configObject);
export default envConfig;