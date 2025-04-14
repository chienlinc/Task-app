import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import todoRoutes from './routes/todos.js';

dotenv.config();
const app = express();
const APP_NAME = process.env.APP_NAME;
const PORT = process.env.APP_PORT;

connectDB();

app.use(express.json());
app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE'] }));

app.use('/todos', todoRoutes);
app.get('/favicon.ico', (_, res) => res.status(204).end());

app.listen(PORT, () => {
  console.log(`${APP_NAME} is running on port: ${PORT}`);
});
