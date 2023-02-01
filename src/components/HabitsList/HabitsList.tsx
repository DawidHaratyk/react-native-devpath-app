import {FlatList, StyleSheet, Text} from 'react-native';
import React, {useCallback, useMemo, useState} from 'react';
import {useAppSelector} from '../../app/hooks/hooks';
import {Habit} from '../Habit/Habit';
import {Habit as HabitProps} from '../../app/habitsSlice/habitsSlice';
import {RefreshControl} from 'react-native-gesture-handler';
import wait from '../../utils/wait';

interface HabitsListProps {
  areUncompletedHabitsShownOnly: boolean;
}

const HabitsList = ({areUncompletedHabitsShownOnly}: HabitsListProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const habits = useAppSelector(state => state.habits.habitsList);

  const displayedHabits = useMemo(
    () =>
      areUncompletedHabitsShownOnly
        ? habits.filter(habit => !habit.completed)
        : habits,
    [areUncompletedHabitsShownOnly, habits],
  );

  const renderHabit = ({item}: {item: HabitProps}) => <Habit {...item} />;

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    wait(1000).then(() => setIsRefreshing(false));
  }, []);

  if (displayedHabits.length) {
    return (
      <FlatList
        data={displayedHabits}
        renderItem={renderHabit}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
        keyExtractor={habit => `${habit.id}`}
      />
    );
  }
  return (
    <Text style={styles.noAvailableHabitsText}>There are no habits yet</Text>
  );
};

export default HabitsList;

const styles = StyleSheet.create({
  noAvailableHabitsText: {
    textAlign: 'center',
  },
});
