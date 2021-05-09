// Copyright (c) 2021 Surien Joseph Das-Giwojno
import { userApi } from './user';

import express from 'express';

export const api = express.Router();

api.use('/user', userApi);
