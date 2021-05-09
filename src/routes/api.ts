// Copyright (c) 2021 Surien Joseph Das-Giwojno
import { userApi } from './user';
// Copyright (c) 2021 Surien Joseph Das-Giwojno

import express from 'express';

export const api = express.Router();

api.use('/user', userApi);

