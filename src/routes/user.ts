// Copyright (c) 2021 Surien Joseph Das-Giwojno
import mongodb from 'mongodb';

import express from 'express';
import { getUserModel } from '../models/user.model';

export const userApi = express.Router();


getUserModel().then(model => {
    // Some sample requests needs to be updated (just added to show basically database connection)
    userApi.patch('/updatePassword', (req, res) => {
        res.send('Update Password');
    });

    userApi.post('/new', (req, res) => {
        const { username, password } = req.body as {username: string; password: string};
        const user = new model({username, password});
        user.save().then(newUser => {
            if (newUser) {
                console.log(newUser.username);
                res.json(newUser);
                return;
            }

        }).catch((err: mongodb.WriteError) => {
            console.error(err);
            if (err.code === 11000){
                res.status(409).json('User already exists');
                return;
            }
            res.status(400).json('Invalid Request');
        });

    });


}).catch(err => {
    console.error(err);
});
