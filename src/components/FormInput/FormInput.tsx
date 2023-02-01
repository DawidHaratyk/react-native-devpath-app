import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  Control,
  Controller,
  FieldValues,
  Path,
  FieldError,
} from 'react-hook-form';
import Input from '../Input/Input';

interface FormInputProps<T extends FieldValues> {
  control: Control<T>;
  errors: FieldError | undefined;
  name: Path<T>;
}

const FormInput = <T extends FieldValues>({
  control,
  errors,
  name,
}: FormInputProps<T>) => {
  return (
    <View style={styles.formInput}>
      <Controller
        control={control}
        render={({field: {onBlur, value, onChange}}) => (
          <Input
            value={value}
            onChangeText={onChange}
            placeholder={name}
            onBlur={onBlur}
          />
        )}
        name={name}
      />
      {errors && <Text>{errors.message}</Text>}
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  formInput: {
    width: '100%',
  },
});
