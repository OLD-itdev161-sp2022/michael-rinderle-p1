import express from 'express';
import connectDatabase from './config/db';
import cors from 'cors';
import fs from 'fs';
import { spawn, exec } from 'child_process'
import path from 'path'

// Initialize express application
const server_port = 5000;
const app = express();

// Connect database
connectDatabase();

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


app.post(`/compile`, (req, res) => {

    let code = req.body.code;
    // let compile = new Compile(new Date(), code);

    try {

        let stream = fs.createWriteStream("./compile.c");
        stream.write(code);
        exec("clang.exe compile.c -v", (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
            }
            console.log(`stdout: ${stdout}`);
            res.send(stderr);
            return;
        });
        // await compile.save();
      } catch (error) {
        res.status(500).end();
        console.log("error");
        res.end("error compiling");
      }
});



// Connection listener
app.listen(server_port, () => console.log(`Express server running on port ${server_port}`));