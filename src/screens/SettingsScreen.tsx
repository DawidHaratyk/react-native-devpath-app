import React from 'react';
import {Text, Platform, View, StyleSheet} from 'react-native';

export function SettingsScreen() {
  const platform = Platform.OS;

  return (
    <View style={styles.settingsScreen}>
      <Text>{platform}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  settingsScreen: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
