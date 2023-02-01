import {Button, StyleSheet, View} from 'react-native';
import React from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import FormInput from '../../components/FormInput/FormInput';
import {todoFormValidation} from '../../constants/formValidation';
import {yupResolver} from '@hookform/resolvers/yup';
import {FormValues, NavigationProps, RouteProps} from './types';
import {useMutation, useQuery} from '@tanstack/react-query';
import {queryClient} from '../../../App';
import {updateTask} from '../../api/updateTask';
import {addTask} from '../../api/addTask';
import getTask from '../../api/getTask';
import {defaultProjectId} from '../../constants/variables';

interface AddOrEditTodoScreenProps {
  route: RouteProps;
  navigation: NavigationProps;
}

const AddOrEditTodoScreen = ({route, navigation}: AddOrEditTodoScreenProps) => {
  const todoId = route.params?.todoId;

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
    onSuccess: () => queryClient.invalidateQueries(['todos']),
  });

  const editTodoMutation = useMutation(updateTask, {
    onSuccess: () => queryClient.invalidateQueries(['todos']),
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

    navigation.navigate('TodosScreen');
  };

  return (
    <View style={styles.addOrEditHabitContainer}>
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
