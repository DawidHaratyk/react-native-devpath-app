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
  completedDate: string | null;
}

const initialState = {
  habits: {
    '02/01/2023': [
      {
        name: 'string',
        description: 'sd',
        completed: false,
        tags: [],
        difficultyCount: 1,
        id: 1,
        completedDate: null,
      },
    ],
    '02/02/2023': [
      {
        name: 'string',
        description: 'sddd',
        completed: false,
        tags: [],
        difficultyCount: 1,
        id: 2,
        completedDate: null,
      },
    ],
  } as Record<string, Habit[]>,
};

type CurrentDate = {now: string};

type HabitAndDate = {
  habitContent: Habit;
  now: string;
};

export const habitsSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    addHabit: (state, action: PayloadAction<HabitAndDate>) => {
      const {now, habitContent} = action.payload;

      const biggestId = state.habits[now].length
        ? Math.max(...state.habits[now].map(habitObj => habitObj.id))
        : 0;

      state.habits[now] = [
        ...state.habits[now],
        {...habitContent, id: biggestId + 1},
      ];
    },
    editHabit: (state, action: PayloadAction<HabitAndDate>) => {
      const {habitContent, now} = action.payload;

      state.habits[now] = state.habits[now].map(habitObj => {
        if (habitObj.id === habitContent.id) {
          return habitContent;
        }
        return habitObj;
      });
    },
    deleteHabit: (state, action: PayloadAction<{id: number; now: string}>) => {
      const {now, id} = action.payload;

      state.habits[now] = state.habits[now].filter(habit => habit.id !== id);
    },
    addTag: (
      state,
      action: PayloadAction<{id: number; tag: string} & CurrentDate>,
    ) => {
      const {id, now, tag} = action.payload;

      state.habits[now] = state.habits[now].map(habit => {
        if (habit.id === id) {
          return {...habit, tags: [...habit.tags, tag]};
        }
        return habit;
      });
    },
    toggleComplete: (
      state,
      action: PayloadAction<{id: number; now: string}>,
    ) => {
      const {id, now} = action.payload;

      state.habits[now] = state.habits[now].map(habit => {
        if (habit.id === id) {
          const completedDate = !habit.completed ? now : null;

          return {...habit, completed: !habit.completed, completedDate};
        }
        return habit;
      });
    },
    newDayUpdate: (
      state,
      action: PayloadAction<{habits: Habit[]; currentDate: string}>,
    ) => {
      const {currentDate, habits} = action.payload;

      state.habits[currentDate] = Object.values(habits || []).map(habit => ({
        ...habit,
        completed: false,
      }));
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addHabit,
  editHabit,
  deleteHabit,
  addTag,
  toggleComplete,
  newDayUpdate,
} = habitsSlice.actions;

export default habitsSlice.reducer;
