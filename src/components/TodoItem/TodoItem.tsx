import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useMutation} from '@tanstack/react-query';
import {useNavigation} from '@react-navigation/native';
import {queryClient} from '../../../App';
import CheckBox from 'react-native-check-box';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TodosStackParamList} from '../../navigation/TodosStack';
import {closeTask} from '../../api/closeTask';
import {deleteTask} from '../../api/deleteTask';
import {Task} from '@doist/todoist-api-typescript';

type TodoItemNavigationProp = NativeStackNavigationProp<
  TodosStackParamList,
  'TodosScreen'
>;

type Props = {
  content: string;
  description: string;
  id: string;
  isCompleted: boolean;
};

const TodoItem = ({content, description, id, isCompleted}: Props) => {
  const {navigate} = useNavigation<TodoItemNavigationProp>();
  const [isTodoCompleted, setIsTodoCompleted] = useState(isCompleted || false);

  const updateTodoMutation = useMutation<Task[], Error, string>(closeTask, {
    onSuccess: queryClient.invalidateQueries(['todos']),
  });

  const handleToggleIsTodoCompleted = () => {
    updateTodoMutation.mutate(id);
    setIsTodoCompleted(completed => !completed);
  };

  const deletingTodoMutation = useMutation<Task[], Error, string>(deleteTask, {
    onSuccess: queryClient.invalidateQueries(['todos']),
  });

  return (
    <>
      <View style={styles.todoContainer}>
        <View style={styles.todoContent}>
          <Text>{content}</Text>
          <Text>{description}</Text>
          <View testID="checkbox">
            <CheckBox
              onClick={handleToggleIsTodoCompleted}
              isChecked={isTodoCompleted}
            />
          </View>
        </View>
        <View style={styles.todoButtons}>
          <Button
            title="Delete"
            onPress={() => deletingTodoMutation.mutate(id)}
          />
          <Button
            title="Edit"
            onPress={() => navigate('AddOrEditTodoScreen', {todoId: id})}
          />
        </View>
      </View>
      <Text style={styles.isLoadingText}>
        {deletingTodoMutation.isLoading && 'Deleting todo...'}
      </Text>
    </>
  );
};

export default TodoItem;

const styles = StyleSheet.create({
  todoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
  },
  todoContent: {
    flexDirection: 'row',
  },
  todoButtons: {
    flexDirection: 'row',
  },
  isLoadingText: {
    fontSize: 12,
  },
});
