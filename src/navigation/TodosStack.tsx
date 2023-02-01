import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import TodosScreen from '../screens/TodosScreen/TodosScreen';
import AddOrEditTodoScreen from '../screens/AddOrEditTodoScreen/AddOrEditTodoScreen';

type TodosScreenNavigationProp = NativeStackNavigationProp<
  TodosStackParamList,
  'TodosScreen'
>;

type AddOrEditTodoScreenProps =
  | {
      todoId: string;
    }
  | undefined;

export type TodosStackParamList = {
  TodosScreen:
    | undefined
    | {
        navigation: TodosScreenNavigationProp;
      };
  AddOrEditTodoScreen: AddOrEditTodoScreenProps;
};

const Stack = createNativeStackNavigator<TodosStackParamList>();

export function TodosStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TodosScreen"
        component={TodosScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddOrEditTodoScreen"
        component={AddOrEditTodoScreen}
      />
    </Stack.Navigator>
  );
}
