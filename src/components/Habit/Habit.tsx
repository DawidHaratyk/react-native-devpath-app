import {Button, StyleSheet, View, Text, Platform} from 'react-native';
import React from 'react';
import {
  deleteHabit,
  Habit as HabitProps,
  toggleComplete,
} from '../../app/habitsSlice/habitsSlice';
import {useAppDispatch} from '../../app/hooks/hooks';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HabitsStackParamList} from '../../navigation/HabitsStack';
import CheckBox from 'react-native-check-box';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDate} from '../../contexts/HabitsContext';

type HabitsScreenNavigationProp = NativeStackNavigationProp<
  HabitsStackParamList,
  'AddOrEditHabitScreen'
>;

export const Habit = ({
  name,
  id,
  tags,
  completed,
  difficultyCount,
}: HabitProps) => {
  const {navigate} = useNavigation<HabitsScreenNavigationProp>();

  const dispatch = useAppDispatch();
  const {now} = useDate();

  const tagsList = tags?.map((tag: string, key: number) => (
    <Text key={key}>{tag}</Text>
  ));

  const difficultyIcons = Array.from(Array(difficultyCount).keys(), count => (
    <Icon name="star" size={30} color="black" key={count} />
  ));

  const handleDeletingHabit = () => {
    dispatch(deleteHabit({id, now}));
  };

  const handleGoToEditHabitScreen = () =>
    navigate('AddOrEditHabitScreen', {habitId: id});

  return (
    <View style={[styles.habitContainer, completed && styles.completedHabit]}>
      <View style={styles.habitMainContent}>
        <View>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.container}>{difficultyIcons}</View>
        </View>
        <View style={styles.buttons}>
          <CheckBox
            onClick={() => dispatch(toggleComplete({id, now}))}
            isChecked={completed}
          />
          <Button title="Edit" onPress={handleGoToEditHabitScreen} />
          <Button title="Delete" onPress={handleDeletingHabit} />
        </View>
      </View>
      <View>{tagsList}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  habitMainContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    height: 40,
    maxHeight: 40,
  },
  habitContainer: {
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttons: {
    flexDirection: 'row',
    gap: 15,
  },
  completedHabit: {
    ...Platform.select({
      android: {
        backgroundColor: '#e1e1e3',
      },
      ios: {
        backgroundColor: '#cacacf',
      },
      default: {
        backgroundColor: '#e1e1e3',
      },
    }),
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    marginRight: 15,
  },
});
