import {createSlice} from '@reduxjs/toolkit';
import {Appearance, ColorSchemeName} from 'react-native';

type Props = {
  theme: ColorSchemeName;
};

const initialState: Props = {
  theme: Appearance.getColorScheme(),
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    handleSchemaChange: state => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
    },
  },
});

export const {handleSchemaChange} = themeSlice.actions;

export default themeSlice.reducer;
