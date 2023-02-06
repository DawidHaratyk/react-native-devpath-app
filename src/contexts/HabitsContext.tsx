import {createContext, ReactNode, useContext, useState} from 'react';

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

  const [date, setDate] = useState(now);

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
