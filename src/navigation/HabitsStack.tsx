import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import AddOrEditHabitScreen from '../screens/AddOrEditHabitScreen/AddOrEditHabitScreen';
import HabitsScreen from '../screens/HabitsScreen';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type HabitsScreenNavigationProp = NativeStackNavigationProp<
  HabitsStackParamList,
  'HabitsScreen'
>;

type AddOrEditHabitScreenProps =
  | {
      habitId?: number;
    }
  | undefined;

export type HabitsStackParamList = {
  HabitsScreen:
    | {
        navigate: HabitsScreenNavigationProp;
      }
    | undefined;
  AddOrEditHabitScreen: AddOrEditHabitScreenProps;
};

const Stack = createNativeStackNavigator<HabitsStackParamList>();

const habitsScreenOptions = {
  headerShown: false,
};

export function HabitsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HabitsScreen"
        component={HabitsScreen}
        options={habitsScreenOptions}
      />
      <Stack.Screen
        name="AddOrEditHabitScreen"
        component={AddOrEditHabitScreen}
      />
    </Stack.Navigator>
  );
}
