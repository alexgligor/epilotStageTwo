import http from 'http';
import { config } from './config/config';
import { app } from './app';
import { logger } from './config/logger';

export const httpServer = http.createServer(app); 
httpServer.listen(config.server_properties.port, () => logger.log('info', `Server running on ${config.server_properties.hostname}:${config.server_properties.port}`));
httpServer.keepAliveTimeout = 61 * 1000;