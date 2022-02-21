import express from 'express';
// import connectDatabase from './config/db';
import cors from 'cors';

// Initialize express application
const server_port = 5000;
const app = express();

// Configure Middleware
app.use(express.json({extended: false}));
app.use(
    cors({
        origin: 'http://localhost:3000'
    })
);

// API endpoints
/**
   * @route GET /
   * @desc Test endpoint
 */
app.get("/", (req, res) => 
    res.send("http get request sent to root api endpoint")
);


// Connection listener
app.listen(server_port, () => console.log(`Express server running on port ${server_port}`));