import React from 'react';
import {Text, Platform, View, StyleSheet} from 'react-native';

export function SettingsScreen() {
  const platform = Platform.OS;

  return (
    <View style={styles.settingsScreen}>
      <Text style={styles.platformText}>{platform}</Text>
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
