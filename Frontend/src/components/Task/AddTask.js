import ActionButton from '@/components/common/ActionButton';
import TextInput from '@/components/common/TextInput';
import { Flex } from 'antd';

const AddTask = ({ input, setInput, onAddTodo }) => {
  return (
    <Flex justify="center" align="center">
      <TextInput
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a task..."
      />
      <ActionButton label="Add" onClick={onAddTodo} disabled={!input.trim()}>
        Add
      </ActionButton>
    </Flex>
  );
};

export default AddTask;
