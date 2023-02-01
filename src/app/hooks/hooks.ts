import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useSelectorForSpecificIndex = (id: number) =>
  useAppSelector(state =>
    state.habits.habitsList.find(habit => habit.id === id),
  );
