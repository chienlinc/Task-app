import express from 'express';
import Todo from '../models/Todo.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

router.post('/', async (req, res) => {
  const { id, text } = req.body;
  if (!id || !text) {
    return res.status(400).json({ error: 'Invalid data' });
  }

  try {
    const newTodo = new Todo({ id, text });
    await newTodo.save();
    res.status(201).json({ message: 'Todo added' });
  } catch {
    res.status(500).json({ error: 'Failed to add todo' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Todo.deleteOne({ id: req.params.id });
    res.json({ message: 'Todo deleted' });
  } catch {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  if (!text)
    return res.status(400).json({ error: 'Text is required for update' });

  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      { id },
      { text },
      { new: true },
    );

    if (!updatedTodo) return res.status(404).json({ error: 'Todo not found' });

    res.json({ message: 'Todo updated', todo: updatedTodo });
  } catch {
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

export default router;
