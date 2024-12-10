import axiosInstance from '@/api/axiosInstance';

export const getTasks = async () => {
  try {
    const response = await axiosInstance.get('/todos');
    return response.data;
  } catch (error) {
    console.error('Error get tasks:', error);
    throw error;
  }
};

export const addTask = async (newTask) => {
  try {
    await axiosInstance.post('/todos', newTask);
  } catch (error) {
    console.error('Error add task:', error);
    throw error;
  }
};

export const deleteTask = async (id) => {
  try {
    await axiosInstance.delete(`/todos/${id}`);
  } catch (error) {
    console.error('Error delete task:', error);
    throw error;
  }
};

export const updateTask = async (id, updatedText) => {
  try {
    await axiosInstance.put(`/todos/${id}`, updatedText);
  } catch (error) {
    console.error('Error update task:', error);
    throw error;
  }
};