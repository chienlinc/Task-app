import { Space, Table } from 'antd';
import {
  EditOutlined,
  CheckOutlined,
  DeleteOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import IconButton from '@/components/common/IconButton';
import TextInput from '@/components/common/TextInput';
import { Flex } from 'antd';

const TaskList = ({
  todos,
  onDeleteTodo,
  onUpdateTodo,
  editText,
  setEditText,
  editingId,
  resetEditingState,
  startEditing,
}) => {
  const columns = [
    {
      title: 'Task',
      dataIndex: 'text',
      key: 'text',
      render: (text, todo) =>
        editingId === todo.id ? (
          <TextInput
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            placeholder="Edit task"
          />
        ) : (
          text
        ),
    },
    {
      title: 'Action',
      key: 'action',
      width: 100,
      render: (_, todo) => (
        <Space size="middle">
          {editingId === todo.id ? (
            <>
              <IconButton
                onClick={() => onUpdateTodo(editingId, editText)}
                disabled={!editText.trim()}
                icon={<CheckOutlined />}
                type="primary"
              />
              <IconButton
                onClick={resetEditingState}
                icon={<CloseOutlined />}
                type="dashed"
              />
            </>
          ) : (
            <>
              <IconButton
                onClick={() => startEditing(todo)}
                icon={<EditOutlined />}
              />
              <IconButton
                onClick={() => onDeleteTodo(todo.id)}
                icon={<DeleteOutlined />}
              />
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <Flex justify="center" align="center">
      <Table
        dataSource={todos}
        columns={columns}
        style={{ minWidth: '60vw' }}
        rowKey="id"
      ></Table>
    </Flex>
  );
};

export default TaskList;