// Copyright (c) 2021 Surien Joseph Das-Giwojno

import mongoose from 'mongoose';
mongoose.set('useCreateIndex', true);


const user = process.env.DATABASEUSER as string;
const password = process.env.DATABASEPASS as string;
const database = process.env.DATABASENAME as string;
const server = process.env.DATABASESERVER as string;


interface UserDocument extends mongoose.Document {
    username: string;
    password: string;
}

export const getUserModel = async (): Promise<mongoose.Model<UserDocument>> => {
    await mongoose.connect(`mongodb+srv://${user}:${password}@${server}/${database}?retryWrites=true&w=majority`,
        { useNewUrlParser: true, useUnifiedTopology: true });

    const userSchema = new mongoose.Schema({
        username: { type: String, unique : true, required : true },
        password: { type: String, required : true }
    });

    return mongoose.model('User', userSchema);
};
