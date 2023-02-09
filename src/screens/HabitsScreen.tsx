import {StyleSheet, Switch, Text, View} from 'react-native';
import React, {useState} from 'react';
import HabitsList from '../components/HabitsList/HabitsList';
import {HabitsStackParamList} from '../navigation/HabitsStack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useAppSelector} from '../app/hooks/hooks';
import FloatingButton from '../components/FloatingButton/FloatingButton';
import {useDate} from '../contexts/HabitsContext';

type HabitsScreenNavigationProp = NativeStackNavigationProp<
  HabitsStackParamList,
  'HabitsScreen'
>;

interface HabitsScreenProps {
  navigation: HabitsScreenNavigationProp;
}

const HabitsScreen = ({navigation}: HabitsScreenProps) => {
  const {now} = useDate();

  const habits = useAppSelector(state => state.habits.habits);
  const {theme} = useAppSelector(state => state.theme);

  const uncompletedHabitsCount = habits[now].filter(
    habit => !habit.completed,
  ).length;
  const completedHabitsCount = habits[now].filter(
    habit => habit.completed,
  ).length;

  const [uncompletedHabitsShown, setUncompletedHabitsShown] = useState(false);

  const goToAddHabitScreen = () => navigation.navigate('AddOrEditHabitScreen');

  return (
    <View
      style={[styles.habitsScreen, theme === 'dark' && styles.darkContainer]}>
      <Text>Count of uncompleted: {uncompletedHabitsCount}</Text>
      <Text style={styles.habitsHeader}>List of habits:</Text>
      <HabitsList uncompletedHabitsShown={uncompletedHabitsShown} />
      <View style={styles.addHabitIconContainer}>
        <View>
          <Switch
            value={uncompletedHabitsShown}
            onValueChange={setUncompletedHabitsShown}
          />
        </View>
        <View>
          <Text>Count of completed: {completedHabitsCount}</Text>
        </View>
        <FloatingButton handleClick={goToAddHabitScreen} />
      </View>
    </View>
  );
};

export default HabitsScreen;

const styles = StyleSheet.create({
  habitsHeader: {
    fontSize: 22,
    alignSelf: 'center',
    marginBottom: 10,
    fontFamily: 'DancingScript-Bold',
  },
  habitsScreen: {
    height: '100%',
    padding: 20,
  },
  addHabitIcon: {
    fontSize: 35,
  },
  addHabitIconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexGrow: 1,
  },
  darkContainer: {
    backgroundColor: 'gray',
  },
});
