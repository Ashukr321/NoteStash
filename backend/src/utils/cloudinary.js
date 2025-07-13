import cloudinary from 'cloudinary'
import envConfig from '../config/envConfig.js';
cloudinary.config({
  cloud_name: envConfig.cloud_name,
  api_key: envConfig.api_key,
  api_secret: envConfig.api_secret,
});

export default cloudinary;