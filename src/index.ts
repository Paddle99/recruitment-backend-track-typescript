import Server from './server.js';
import dotenv from 'dotenv';

dotenv.config();

const server = new Server(3000);

server.listen();
