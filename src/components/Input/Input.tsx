import {StyleProp, StyleSheet, TextInput, TextStyle} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';

interface InputProps {
  value: string;
  onChangeText: Dispatch<SetStateAction<string>>;
  placeholder?: string;
  onBlur?: () => void;
  addditionalStyles?: StyleProp<TextStyle>;
}

const Input = ({
  value,
  onChangeText,
  placeholder,
  onBlur,
  addditionalStyles,
}: InputProps) => {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      onBlur={onBlur}
      style={[styles.input, addditionalStyles]}
      testID={placeholder}
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    width: '100%',
    flexGrow: 1,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 6,
  },
});
