import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useQuery} from '@tanstack/react-query';
import TodoItem from '../../components/TodoItem/TodoItem';
import FloatingButton from '../../components/FloatingButton/FloatingButton';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TodosStackParamList} from '../../navigation/TodosStack';
import {Task} from '@doist/todoist-api-typescript';
import getTasks from '../../api/getTasks';

type RenderTodoProps = {item: Task};

type TodosScreenNavigationProp = NativeStackNavigationProp<
  TodosStackParamList,
  'TodosScreen'
>;

interface TodosScreenProps {
  navigation: TodosScreenNavigationProp;
}

const TodosScreen = ({navigation}: TodosScreenProps) => {
  const {data, isLoading} = useQuery<Task[] | void, Error>(['todos'], getTasks);

  const renderItem = ({item}: RenderTodoProps) => (
    <TodoItem {...item} key={item.id} />
  );

  const goToAddTodoScreen = () => navigation.navigate('AddOrEditTodoScreen');

  return (
    <View style={styles.todosScreen}>
      <View>
        <Text style={styles.todosHeader}>Todos</Text>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={data || []}
            renderItem={renderItem}
            keyExtractor={todo => todo.id}
            testID="todos-list"
          />
        )}
      </View>
      <View>
        <FloatingButton handleClick={goToAddTodoScreen} />
      </View>
    </View>
  );
};

export default TodosScreen;

const styles = StyleSheet.create({
  todosScreen: {
    height: '100%',
    justifyContent: 'space-between',
    padding: 30,
  },
  todosHeader: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
});
