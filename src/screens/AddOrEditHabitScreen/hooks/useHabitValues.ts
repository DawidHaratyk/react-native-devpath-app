import {useAppSelector} from '../../../app/hooks/hooks';

const useHabitValues = (habitId: number | undefined) => {
  const habitsList = useAppSelector(state => state.habits.habitsList);

  const habitToEdit = habitsList.find(habit => habit.id === habitId);

  const isEditingHabit = habitId !== undefined;

  const initialTagsList = isEditingHabit ? habitToEdit?.tags : [];

  const submitButtonText = isEditingHabit ? 'Edit' : 'Add';

  return {habitToEdit, isEditingHabit, initialTagsList, submitButtonText};
};

export default useHabitValues;
