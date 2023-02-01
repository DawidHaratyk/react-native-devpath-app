import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {HabitsStack} from './HabitsStack';
import {SettingsScreen} from '../screens/SettingsScreen';
import {TodosStack} from './TodosStack';

export type HomeTabParamList = {
  Habits: undefined;
  Todos: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<HomeTabParamList>();

export function HomeTabs() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Habits" component={HabitsStack} />
      <Tab.Screen name="Todos" component={TodosStack} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
