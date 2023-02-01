import {NavigationProp, RouteProp} from '@react-navigation/native';
import {TodosStackParamList} from '../../navigation/TodosStack';

type RouteProps = RouteProp<TodosStackParamList, 'AddOrEditTodoScreen'>;

type NavigationProps = NavigationProp<
  TodosStackParamList,
  'AddOrEditTodoScreen'
>;

interface FormValues {
  name: string;
  completed: boolean;
}

export type {RouteProps, NavigationProps, FormValues};
