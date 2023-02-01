import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';

interface FloatingButtonProps {
  handleClick: () => void;
}

const FloatingButton = ({handleClick}: FloatingButtonProps) => {
  return (
    <TouchableOpacity onPress={handleClick} testID="show-add-todo-form">
      <View style={styles.floatingButton}>
        <View style={styles.line} />
        <View style={[styles.line, styles.rotatedLine]} />
      </View>
    </TouchableOpacity>
  );
};

export default FloatingButton;

const styles = StyleSheet.create({
  floatingButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    backgroundColor: 'blue',
    borderRadius: 50,
  },
  line: {
    width: 15,
    height: 3,
    backgroundColor: 'white',
  },
  rotatedLine: {
    transform: [
      {
        rotate: '90deg',
      },
      {
        translateX: -3,
      },
    ],
  },
});
