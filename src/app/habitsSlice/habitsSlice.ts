import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export type DifficultyProps = 1 | 2 | 3;

export interface Habit {
  name: string;
  description: string;
  completed: boolean;
  tags: string[];
  difficultyCount: DifficultyProps;
  id: number;
  completedData: Date | null;
}

interface InitialStateProps {
  habitsList: Habit[];
}

const initialState: InitialStateProps = {
  habitsList: [],
};

export const habitsSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    addHabit: (state, action: PayloadAction<Habit>) => {
      state.habitsList = [...state.habitsList, action.payload];
    },
    editHabit: (state, action: PayloadAction<Habit>) => {
      state.habitsList = state.habitsList.map(habit => {
        if (habit.id === action.payload.id) {
          return action.payload;
        }
        return habit;
      });
    },
    deleteHabit: (state, action: PayloadAction<number>) => {
      state.habitsList = state.habitsList.filter(
        habit => habit.id !== action.payload,
      );
    },
    addTag: (state, action: PayloadAction<{id: number; tag: string}>) => {
      state.habitsList = state.habitsList.map(habit => {
        if (habit.id === action.payload.id) {
          return {...habit, tags: [...habit.tags, action.payload.tag]};
        }
        return habit;
      });
    },
    toggleComplete: (state, action: PayloadAction<number>) => {
      state.habitsList = state.habitsList.map(habit => {
        if (habit.id === action.payload) {
          return {...habit, completed: !habit.completed};
        }
        return habit;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const {addHabit, editHabit, deleteHabit, addTag, toggleComplete} =
  habitsSlice.actions;

export default habitsSlice.reducer;
