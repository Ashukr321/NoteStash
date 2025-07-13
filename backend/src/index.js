import express from 'express';
import cors from 'cors';
import globalErrorHandler from './middlewares/globalErrorHandler.js';


// import routes 
import userRoutes from '../src/modules/user/user.routes.js'
import profileRoutes from '../src/modules/profile/profile.routes.js'
//  create express app 
const app = express();
// middleware 
app.use(express.json()); // parse the request body

app.use(cors({
  origin: '*'
}))


const baseUrl = '/api'
// routes 
app.use(`${baseUrl}/users`, userRoutes);
app.use(`${baseUrl}/profiles`, profileRoutes);

// default route
app.get('/', (req, res, next) => {
  return res.status(200).json({
    message: "🚀 Welcome to the  noteStash API! Success! 😎",
    info: "This is the root endpoint. The API is up and running.",
    docs: "Check out /api/v1 for more routes.",
    author: "Ashutosh Kumar",
    status: "OK"
  });
});

// global errorHandler 
app.use(globalErrorHandler);
// export app 
export default app;