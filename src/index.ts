import Server from './server.ts';
import dotenv from 'dotenv';

dotenv.config();

const server = new Server(3000);

server.listen();
