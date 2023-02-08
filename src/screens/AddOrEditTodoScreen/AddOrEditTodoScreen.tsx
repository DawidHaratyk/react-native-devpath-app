import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import FormInput from '../../components/FormInput/FormInput';
import {todoFormValidation} from '../../constants/formValidation';
import {yupResolver} from '@hookform/resolvers/yup';
import {FormValues, NavigationProps, RouteProps} from './types';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {updateTask} from '../../api/updateTask';
import {addTask} from '../../api/addTask';
import getTask from '../../api/getTask';
import {defaultProjectId} from '../../constants/variables';
import {Task} from '@doist/todoist-api-typescript';

interface AddOrEditTodoScreenProps {
  route: RouteProps;
  navigation: NavigationProps;
}

const AddOrEditTodoScreen = ({route, navigation}: AddOrEditTodoScreenProps) => {
  const queryClient = useQueryClient();
  const todoId = route.params?.todoId;

  const [notification, setNotification] = useState('');
  const {data: todoToEdit} = useQuery(['todo', todoId], () => getTask(todoId), {
    enabled: !!todoId,
  });

  const isEditingTodo = todoId !== undefined;

  const initialValues = {
    name: todoToEdit?.content || '',
    completed: todoToEdit?.isCompleted || false,
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormValues>({
    resolver: yupResolver(todoFormValidation),
    defaultValues: initialValues,
    values: initialValues,
  });

  const addTodoMutation = useMutation(addTask, {
    onMutate: async ({name, projectId}: {name: string; projectId: string}) => {
      await queryClient.cancelQueries(['todos']);

      const previousTodos = queryClient.getQueryData(['todos']);

      queryClient.setQueryData(['todos'], (prevTodos: any) => [
        ...prevTodos,
        {name, projectId},
      ]);

      return {previousTodos};
    },
    onError: (error, newTodo, context) => {
      queryClient.setQueryData(['todos'], context?.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['todos']);
    },
    onSuccess: () => {
      navigation.navigate('TodosScreen');
    },
  });

  const editTodoMutation = useMutation(updateTask, {
    onMutate: async ({name, todoId}: {name: string; todoId: string}) => {
      await queryClient.cancelQueries(['todos']);

      const previousTodos = queryClient.getQueryData(['todos']) as Task[];

      queryClient.setQueryData(['todos'], (prevTodos: any) =>
        prevTodos.map((todo: Task) => {
          if (todo.id === todoId) {
            return {...todo, content: name};
          }

          return todo;
        }),
      );

      queryClient.setQueryData(['todo', todoId], {
        ...previousTodos.find(todo => todo.id === todoId),
        content: name,
      });

      return {previousTodos};
    },
    onError: (error, newTodo, context) => {
      setNotification(
        `Cannot change todo to ${newTodo.name}, previous todo name is applied`,
      );

      queryClient.setQueryData(['todos'], context?.previousTodos);

      queryClient.setQueryData(['todo', newTodo.todoId], {
        ...context?.previousTodos.find(todo => todo.id === newTodo.todoId),
      });
    },
    onSettled: todo => {
      queryClient.invalidateQueries(['todos']);
      queryClient.invalidateQueries(['todo', todo?.id]);
    },
    onSuccess: () => {
      navigation.navigate('TodosScreen');
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async ({name}) => {
    if (isEditingTodo) {
      const todoContent = {
        name,
        todoId,
      };

      editTodoMutation.mutate(todoContent);
    } else {
      const todoContent = {
        name,
        projectId: todoToEdit?.projectId || defaultProjectId,
      };

      addTodoMutation.mutate(todoContent);
    }
  };

  return (
    <View style={styles.addOrEditHabitContainer}>
      {notification && <Text>{notification}</Text>}
      <FormInput control={control} errors={errors.name} name="name" />
      <Button
        title={isEditingTodo ? 'Edit' : 'Add'}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};

export default AddOrEditTodoScreen;

const styles = StyleSheet.create({
  checkboxLabel: {
    flexDirection: 'row',
  },
  tagsInputAndButton: {
    flexDirection: 'row',
  },
  addOrEditHabitContainer: {
    padding: 30,
  },
});
