import app from './src/index.js'
import envConfig from './src/config/envConfig.js'
import connectDb from './src/config/connectDb.js'
// start server 
const startServer = async () => {
  try {
    // connect to database
    await connectDb();
    app.listen(envConfig.port, () => {
      console.log(`server listening on port ${envConfig.port}`)
    })
  } catch (error) {
    console.log(`failed to listen server on port ${envConfig.port}`)
  }
}

startServer();