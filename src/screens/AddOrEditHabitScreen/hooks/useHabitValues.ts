import {useAppSelector} from '../../../app/hooks/hooks';

const useHabitValues = (habitId: number | undefined) => {
  const now = new Date().toLocaleDateString('en-US');

  const habits = useAppSelector(state => state.habits.habits);

  const habitToEdit = habits[now].find(habit => habit.id === habitId);

  const isEditingHabit = habitId !== undefined;

  const submitButtonText = isEditingHabit ? 'Edit' : 'Add';

  return {habitToEdit, isEditingHabit, submitButtonText};
};

export default useHabitValues;
