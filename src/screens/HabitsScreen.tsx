import {StyleSheet, Switch, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import HabitsList from '../components/HabitsList/HabitsList';
import {HabitsStackParamList} from '../navigation/HabitsStack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useAppDispatch, useAppSelector} from '../app/hooks/hooks';
import FloatingButton from '../components/FloatingButton/FloatingButton';
import {newDayUpdate} from '../app/habitsSlice/habitsSlice';
import {HabitsProvider} from '../contexts/HabitsContext';

type HabitsScreenNavigationProp = NativeStackNavigationProp<
  HabitsStackParamList,
  'HabitsScreen'
>;

interface HabitsScreenProps {
  navigation: HabitsScreenNavigationProp;
}

const HabitsScreen = ({navigation}: HabitsScreenProps) => {
  const [tickTak, setTickTak] = useState<boolean>(false);

  const habits = useAppSelector(state => state.habits.habits);
  const dispatch = useAppDispatch();

  const now = new Date().toLocaleDateString('en-US');

  // const uncompletedHabitsCount = habits[now].filter(
  //   habit => !habit.completed,
  // ).length;
  // const completedHabitsCount = habits[now].filter(
  //   habit => habit.completed,
  // ).length;

  const [uncompletedHabitsShown, setUncompletedHabitsShown] = useState(false);

  const goToAddHabitScreen = () => navigation.navigate('AddOrEditHabitScreen');

  useEffect(() => {
    console.log('xd');
    const interval = setInterval(() => {
      setTickTak(prevState => !prevState);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const now = new Date();
    const nowFormated = now.toLocaleDateString('en-US');
    const hasDate = Object.keys(habits).includes(nowFormated);
    const yesterdayHabits =
      Object.values(habits)[Object.values(habits).length - 1];

    if (hasDate) {
      return;
    }

    dispatch(
      newDayUpdate({habits: yesterdayHabits || [], currentDate: nowFormated}),
    );
  }, [tickTak, habits, dispatch]);

  return (
    <HabitsProvider>
      <View style={styles.habitsScreen}>
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
            {/* <Text>Count of completed: {completedHabitsCount}</Text>
            <Text>Count of uncompleted: {uncompletedHabitsCount}</Text> */}
          </View>
          <FloatingButton handleClick={goToAddHabitScreen} />
        </View>
      </View>
    </HabitsProvider>
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
});
