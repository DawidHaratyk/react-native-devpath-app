import {Button, StyleSheet, Text, View} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';

interface TagWithDeleteButtonProps {
  tag: string;
  setTagsList: Dispatch<SetStateAction<string[]>>;
}

const TagWithDeleteButton = ({tag, setTagsList}: TagWithDeleteButtonProps) => {
  const deleteItself = () => {
    setTagsList(prevState => prevState.filter(tagName => tagName !== tag));
  };

  return (
    <View style={styles.tagContainer}>
      <Text>{tag}</Text>
      <Button title="delete" onPress={deleteItself} />
    </View>
  );
};

export default TagWithDeleteButton;

const styles = StyleSheet.create({
  tagContainer: {
    flexDirection: 'row',
  },
});
