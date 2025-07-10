import express from 'express';
import cors from 'cors';


//  create express app 
const app = express();
// middleware 
app.use(express.json());
app.use(cors({
  origin: '*'
}))


const baseUrl = '/api/v1'
// routes 



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

// export app 
export default app;