import {NavigationProp, RouteProp} from '@react-navigation/native';
import {DifficultyProps} from '../../app/habitsSlice/habitsSlice';
import {HabitsStackParamList} from '../../navigation/HabitsStack';

type RouteProps = RouteProp<HabitsStackParamList, 'AddOrEditHabitScreen'>;

type NavigationProps = NavigationProp<
  HabitsStackParamList,
  'AddOrEditHabitScreen'
>;

interface FormValues {
  name: string;
  description: string;
  completed: boolean;
  difficultyCount: DifficultyProps;
  tags: string[];
  completedDate: string | null;
}

export type {RouteProps, NavigationProps, FormValues};
