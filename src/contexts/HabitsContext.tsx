import {createContext, ReactNode, useContext, useState} from 'react';
import {newDayUpdate} from '../app/habitsSlice/habitsSlice';
import {useAppDispatch, useAppSelector} from '../app/hooks/hooks';

interface HabitsProviderProps {
  children: ReactNode;
}

interface HabitsContextProps {
  now: string;
}

const HabitsContext = createContext<HabitsContextProps>({
  now: new Date().toLocaleDateString('en-US'),
});

export const HabitsProvider = ({children}: HabitsProviderProps) => {
  const now = new Date().toLocaleDateString('en-US');

  const dispatch = useAppDispatch();
  const habits = useAppSelector(state => state.habits.habits);

  const [date] = useState(now);

  const hasDate = Object.keys(habits).includes(date);

  if (!hasDate) {
    const yesterdayHabits =
      Object.values(habits)[Object.values(habits).length - 1];

    dispatch(newDayUpdate({habits: yesterdayHabits || [], currentDate: date}));
  }

  return (
    <HabitsContext.Provider value={{now: date}}>
      {children}
    </HabitsContext.Provider>
  );
};

export const useDate = () => {
  const habitsContext = useContext(HabitsContext);

  return habitsContext;
};
