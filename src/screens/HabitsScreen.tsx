import {StyleSheet, Switch, Text, View} from 'react-native';
import React, {useState} from 'react';
import HabitsList from '../components/HabitsList/HabitsList';
import {HabitsStackParamList} from '../navigation/HabitsStack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useAppSelector} from '../app/hooks/hooks';
import FloatingButton from '../components/FloatingButton/FloatingButton';

type HabitsScreenNavigationProp = NativeStackNavigationProp<
  HabitsStackParamList,
  'HabitsScreen'
>;

interface HabitsScreenProps {
  navigation: HabitsScreenNavigationProp;
}

const HabitsScreen = ({navigation}: HabitsScreenProps) => {
  const countOfCompletedHabits = useAppSelector(
    state => state.habits.habitsList.filter(habit => habit.completed).length,
  );

  const countOfUncompletedHabits = useAppSelector(
    state => state.habits.habitsList.filter(habit => !habit.completed).length,
  );

  const [areUncompletedHabitsShownOnly, setAreUncompletedHabitsShownOnly] =
    useState(false);

  const goToAddHabitScreen = () =>
    navigation.navigate('AddOrEditHabitScreen', {
      areUncompletedHabitsShownOnly,
    });

  return (
    <View style={styles.habitsScreen}>
      <Text style={styles.habitsHeader}>List of habits:</Text>
      <HabitsList
        areUncompletedHabitsShownOnly={areUncompletedHabitsShownOnly}
      />
      <View style={styles.addHabitIconContainer}>
        <View>
          <Switch
            value={areUncompletedHabitsShownOnly}
            onValueChange={setAreUncompletedHabitsShownOnly}
          />
        </View>
        <View>
          <Text>Count of completed: {countOfCompletedHabits}</Text>
          <Text>Count of uncompleted: {countOfUncompletedHabits}</Text>
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
});
