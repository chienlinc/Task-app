import { useState } from 'react';
import AddTask from '@/components/Task/AddTask';
import TaskList from '@/components/Task/TaskList';
import LoadingPage from '@/pages/common/Loading';
import { Col, Row } from 'antd';
import useTask from '@/hooks/useTask';

const Todo = () => {
  const { todos, loading, addTodo, deleteTodo, updateTodo } = useTask();

  const [input, setInput] = useState('');
  const [editText, setEditText] = useState('');
  const [editingId, setEditingId] = useState(null);

  const handleAddTodo = () => {
    const newTodo = { id: Date.now().toString(), text: input };
    addTodo(newTodo);
    setInput('');
  };

  const handleUpdateTodo = async () => {
    updateTodo(editingId, editText);
    resetEditingState();
  };

  const startEditing = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const resetEditingState = () => {
    setEditText('');
    setEditingId(null);
  };

  if (loading) {
    return <LoadingPage message="Fetching tasks..." />;
  }

  return (
    <div style={{ margin: '0 20px' }}>
      <Row
        align="middle"
        justify="space-between"
        style={{ marginBottom: '20px' }}
      >
        <Col>
          <h1>Todo List</h1>
        </Col>
        <Col xs={24} md={12}>
          <AddTask
            onAddTodo={handleAddTodo}
            input={input}
            setInput={setInput}
          />
        </Col>
      </Row>

      <Row align="middle" justify="center">
        <Col xs={12}>
          <TaskList
            todos={todos}
            onDeleteTodo={deleteTodo}
            editingId={editingId}
            editText={editText}
            setEditText={setEditText}
            resetEditingState={resetEditingState}
            startEditing={startEditing}
            onUpdateTodo={handleUpdateTodo}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Todo;
