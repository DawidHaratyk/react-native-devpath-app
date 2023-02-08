import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Control, useFieldArray} from 'react-hook-form';

interface TagWithDeleteButtonProps {
  tag: string;
  control: Control;
  index: number;
}

const TagWithDeleteButton = ({
  tag,
  control,
  index,
}: TagWithDeleteButtonProps) => {
  const {remove} = useFieldArray({
    control,
    name: 'tags',
  });

  return (
    <View style={styles.tagContainer}>
      <Text>{tag}</Text>
      <Button title="delete" onPress={() => remove(index)} />
    </View>
  );
};

export default TagWithDeleteButton;

const styles = StyleSheet.create({
  tagContainer: {
    flexDirection: 'row',
  },
});
