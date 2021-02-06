import winston from 'winston';

const logConfig = {
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: `./logs/server_${new Date().getTime()}.log`
        })
    ]
};

export const logger = winston.createLogger(logConfig);
