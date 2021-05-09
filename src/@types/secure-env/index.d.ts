// Copyright (c) 2021 Surien Joseph Das-Giwojno


declare module 'secure-env' {
    export default function (secret: { secret: string }): NodeJS.ProcessEnv;
}

