// Copyright (c) 2021 Surien Joseph Das-Giwojno


const dev = false;

// If in development we simply read the unencrypted version of the environment file
// but otherwise there maybe confidential information in it so instead we read it using secret file
// (which can be shared with collaborators through secure channel)
import dotenv from 'dotenv';
import * as fs from 'fs';
import secureEnv from 'secure-env';

if (dev) {
    dotenv.config();
} else {
    const envPass = fs.readFileSync('secret.txt').toString();
    process.env = secureEnv({ secret: envPass });
}


import express from 'express';
import { api } from './routes/api';


const app = express();

app.use(express.json());


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', `http://localhost:' + ${process.env.PORT as string}`);
    next();
});

app.use('/api', api);


// implement like this
// https://hackernoon.com/set-up-ssl-in-nodejs-and-express-using-openssl-f2529eab5bb
// https.createServer(app).listen(port, () => console.log(`Listening on port ${port}!`));


app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT as string}!`));


