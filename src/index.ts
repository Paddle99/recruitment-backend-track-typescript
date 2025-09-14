import Server from './server.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;
const server = new Server(Number(PORT));

server.listen();
