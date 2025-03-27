import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const app = express();

const APP_NAME = process.env.APP_NAME;
const PORT = process.env.APP_PORT;
const MONGO_URI = `mongodb://${process.env.USER_NAME}:${process.env.USER_PWD}@${process.env.DB_URL}`

app.use(express.json());
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }),
);

mongoose
  .connect(MONGO_URI)
  .then(() => console.log(`Connected to MongoDB ${MONGO_URI}`))
  .catch((error) => console.error('Failed to connect MongoDB:', error));

const todoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  id: { type: String, required: true, unique: true },
});
const Todo = mongoose.model('Todo', todoSchema);

app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

app.post('/todos', async (req, res) => {
  const { id, text } = req.body;
  if (!id || !text) {
    return res.status(400).json({ error: 'Invalid data' });
  }
  try {
    const newTodo = new Todo({ id, text });
    await newTodo.save();
    res.status(201).json({ message: 'Todo added' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add todo' });
  }
});

app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Todo.deleteOne({ id });
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Text is required for update' });
  }
  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      { id },
      { text },
      { new: true },
    );
    if (!updatedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json({ message: 'Todo updated', todo: updatedTodo });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

app.listen(PORT, () => {
  console.log(`${APP_NAME} is running on port: ${PORT}`);
});
