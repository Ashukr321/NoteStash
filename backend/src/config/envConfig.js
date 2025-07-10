import { config as conf } from 'dotenv';
conf();

const configObject = {
  port: process.env.PORT,
  mongo_uri: process.env.MONGO_URI
}

const envConfig = Object.freeze(configObject);
export default envConfig;