import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Control} from 'react-hook-form';
import {useController} from 'react-hook-form/dist/useController';
import { useFormState } from 'react-hook-form/dist/useFormState';

interface TagWithDeleteButtonProps {
  tag: string;
  control: Control;
}

const TagWithDeleteButton = ({tag, control}: TagWithDeleteButtonProps) => {
  const {field} = useController({
    control,
    name: "tags"
  });

  const deleteItself = () => {
    const index = getValues(). .indexOf(tag);

    setValue('tags', tags.splice(index, 1));
  };

  return (
    <View style={styles.tagContainer}>
      <Text>{tag}</Text>
      <Button
        title="delete"
        onPress={() => field.onChange((xd: string) => console.log(first))}
      />
    </View>
  );
};

export default TagWithDeleteButton;

const styles = StyleSheet.create({
  tagContainer: {
    flexDirection: 'row',
  },
});
