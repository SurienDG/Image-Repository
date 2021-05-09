// Copyright (c) 2021 Surien Joseph Das-Giwojno
import mongodb from 'mongodb';
// Copyright (c) 2021 Surien Joseph Das-Giwojno

import express from 'express';
import { getUserModel } from '../models/user.model';

export const api = express();


getUserModel().then(model => {
    // Some sample requests needs to be updated (just added to show basically database connection)
    api.patch('/', (req, res) => {
        const { username, password } = req.body as {username: string; password: string};
        model.updateOne({username: {$eq: username}}, {username, password}).then(user => {
            if (user.ok) {
                console.log(username);
                res.json(username);
            }

        }).catch(err => {
            console.error(err);
            res.status(401).json({error: err});
        });
    });

    api.get('/', (req, res) => {
        const { username, password } = {username: 'test2', password: '123'} as {username: string; password: string};
        const user = new model( {username, password});
        user.save().then(newUser => {
            if (newUser) {
                console.log(newUser.username);
                res.json(newUser);
                return;
            }


        }).catch((err: mongodb.WriteError) => {
            console.error(err);
            console.log(err.code);
            if (err.code === 11000){
                res.status(409).json('User already exists');
                return;
            }
        });
        res.status(400).json('Invalid Request');
    });


    api.patch('/', (req, res) => {
        res.send('PATCH handler');
    });

}).catch(err => {
    console.error(err);
});


