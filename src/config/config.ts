import dotenv from 'dotenv';
dotenv.config();

const SERVER_PROPERTIES = {
    hostname: process.env.SERVER_HOSTNAME,
    port: 8080//process.env.SERVER_PORT
};

export const config = {
    server_properties: SERVER_PROPERTIES
};
