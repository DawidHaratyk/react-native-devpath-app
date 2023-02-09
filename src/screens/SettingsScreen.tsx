import React from 'react';
import {Text, Platform, View, StyleSheet, Switch} from 'react-native';
import {useAppDispatch, useAppSelector} from '../app/hooks/hooks';
import {handleSchemaChange} from '../app/themeSlice/themeSlice';

const platform = Platform.OS;

export function SettingsScreen() {
  const {theme} = useAppSelector(state => state.theme);

  const dispatch = useAppDispatch();

  const toggleTheme = () => {
    dispatch(handleSchemaChange());
  };

  return (
    <View style={styles.settingsScreen}>
      <Text style={styles.platformText}>{platform}</Text>
      <Switch
        value={theme === 'dark' ? true : false}
        onValueChange={toggleTheme}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  settingsScreen: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  platformText: {
    fontSize: 28,
  },
});
