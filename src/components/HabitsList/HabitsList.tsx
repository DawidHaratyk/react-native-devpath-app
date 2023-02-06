import {FlatList, StyleSheet, Text} from 'react-native';
import React, {useCallback, useMemo, useState} from 'react';
import {useAppSelector} from '../../app/hooks/hooks';
import {Habit} from '../Habit/Habit';
import {Habit as HabitProps} from '../../app/habitsSlice/habitsSlice';
import {RefreshControl} from 'react-native-gesture-handler';
import wait from '../../utils/wait';
import {useDate} from '../../contexts/HabitsContext';

interface HabitsListProps {
  uncompletedHabitsShown: boolean;
}

const HabitsList = ({uncompletedHabitsShown}: HabitsListProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const habits = useAppSelector(state => state.habits.habits);
  const {now} = useDate();

  const displayedHabits = useMemo(
    () =>
      uncompletedHabitsShown
        ? habits[now].filter(habit => !habit.completed)
        : habits[now],
    [uncompletedHabitsShown, habits, now],
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
