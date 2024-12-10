import { useEffect, useReducer } from 'react';
import {
  getTasks,
  addTask,
  deleteTask,
  updateTask,
} from '@/services/taskService';
import { notification } from 'antd';

const initialTasks = {
  todos: [],
  loading: false,
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'TASL_START':
      return { ...state, loading: true };
    case 'TASK_END':
      return { ...state, loading: false };
    case 'FETCH_TASK':
      return { ...state, todos: action.payload };
    case 'ADD_TASK':
      return { ...state, todos: [...state.todos, action.payload] };
    case 'DELETE_TASK':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id != action.payload),
      };
    case 'UPDATE_TASK':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text }
            : todo,
        ),
      };
    default:
      return state;
  }
};

const useTask = () => {
  const [state, dispatch] = useReducer(taskReducer, initialTasks);

  const fetchData = async () => {
    try {
      dispatch({ type: 'TASK_START' });
      const data = await getTasks();
      dispatch({ type: 'FETCH_TASK', payload: data });
    } catch (error) {
      console.error('Failed to fetch todos:', error);
      notification.error({
        message: 'Failed to fetch todos',
        description:
          'There was an error while fetching the task. Please try again.',
      });
    } finally {
      dispatch({ type: 'TASK_END' });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addTodo = async (newTodo) => {
    try {
      dispatch({ type: 'TASK_START' });
      await addTask(newTodo);
      dispatch({ type: 'ADD_TASK', payload: newTodo });
    } catch (error) {
      console.error('Failed to add task:', error);
      notification.error({
        message: 'Failed to add task',
        description:
          'There was an error while adding the task. Please try again.',
      });
    }
    dispatch({ type: 'TASK_END' });
  };

  const deleteTodo = async (id) => {
    try {
      dispatch({ type: 'TASK_START' });
      await deleteTask(id);
      dispatch({ type: 'DELETE_TASK', payload: id });
    } catch (error) {
      console.log('Failed to delete task:', error);
      notification.error({
        message: 'Failed to delete task',
        description:
          'There was an error while deleting the task. Please try again.',
      });
    } finally {
      dispatch({ type: 'TASK_END' });
    }
  };

  const updateTodo = async (editingId, editText) => {
    try {
      dispatch({ type: 'TASK_START' });
      await updateTask(editingId, { text: editText });
      dispatch({
        type: 'UPDATE_TASK',
        payload: { id: editingId, text: editText },
      });
    } catch (error) {
      console.log('Failed to update task:', error);
      notification.error({
        message: 'Failed to update task',
        description:
          'There was an error while updating the task. Please try again.',
      });
    } finally {
      dispatch({ type: 'TASK_END' });
    }
  };

  return {
    todos: state.todos,
    loading: state.loading,
    addTodo,
    deleteTodo,
    updateTodo,
  };
};

export default useTask;
