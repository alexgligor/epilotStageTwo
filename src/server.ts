import http from 'http';
import { config } from './config/config';
import { app } from './app';
import { logger } from './config/logger';

export const httpServer = http.createServer(app);
httpServer.listen(config.server.port, () => logger.log('info', `Server running on ${config.server.hostname}:${config.server.port}`));
