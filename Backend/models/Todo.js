import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  id: { type: String, required: true, unique: true },
});

const Todo = mongoose.model('Todo', todoSchema);
export default Todo;
