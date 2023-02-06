import {Alert, Button, StyleSheet, Text, View} from 'react-native';
import React, {useMemo, useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import FormInput from '../../components/FormInput/FormInput';
import {useAppDispatch} from '../../app/hooks/hooks';
import {addHabit, editHabit} from '../../app/habitsSlice/habitsSlice';
import Input from '../../components/Input/Input';
import {formValidation} from '../../constants/formValidation';
import {yupResolver} from '@hookform/resolvers/yup';
import {FormValues, NavigationProps, RouteProps} from './types';
import TagWithDeleteButton from '../../components/TagWithDeleteButton/TagWithDeleteButton';
import SelectDropdown from 'react-native-select-dropdown';
import {difficulties} from '../../constants/variables';
import useHabitValues from './hooks/useHabitValues';
import {useDate} from '../../contexts/HabitsContext';

interface AddOrEditHabitScreenProps {
  route: RouteProps;
  navigation: NavigationProps;
}

const AddOrEditHabitScreen = ({
  route,
  navigation,
}: AddOrEditHabitScreenProps) => {
  const habitId = route.params?.habitId;
  const isEditingHabit = !!habitId;

  const {habitToEdit, submitButtonText} = useHabitValues(habitId);
  const dispatch = useAppDispatch();
  const {now} = useDate();

  const [tagName, setTagName] = useState('');

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
    getValues,
  } = useForm<FormValues>({
    resolver: yupResolver(formValidation),
    defaultValues: {
      name: habitToEdit?.name || '',
      description: habitToEdit?.description || '',
      completed: habitToEdit?.completed || false,
      difficultyCount: habitToEdit?.difficultyCount || 1,
      tags: habitToEdit?.tags || [],
    },
  });

  const handleAddTag = () => {
    if (tagsList.includes(tagName)) {
      return Alert.alert('Typed tag is already in list ;)');
    }

    if (tagName) {
      setValue('tags', [...getValues().tags, tagName]);
      setTagName('');
    }
  };

  const onSubmit: SubmitHandler<FormValues> = ({
    name,
    description,
    difficultyCount,
    completed,
    tags,
    completedDate,
  }) => {
    const habitContent = {
      name,
      description,
      tags,
      difficultyCount,
      id: habitId || 0,
      completed,
      completedDate,
    };

    isEditingHabit
      ? dispatch(editHabit({habitContent, now}))
      : dispatch(addHabit({habitContent, now}));

    navigation.navigate('HabitsScreen');
  };

  const tagsList = getValues().tags;

  console.log(tagsList);

  const tags = useMemo(
    () =>
      tagsList?.length ? (
        tagsList?.map((tag, key) => (
          <TagWithDeleteButton tag={tag} control={control} key={key} />
        ))
      ) : (
        <Text>No available tags yet</Text>
      ),
    [tagsList, control],
  );

  return (
    <View style={styles.addOrEditHabitContainer}>
      <FormInput control={control} errors={errors.name} name="name" />
      <FormInput
        control={control}
        errors={errors.description}
        name="description"
      />
      <View style={styles.tagsInputAndButton}>
        <Input
          value={tagName}
          onChangeText={setTagName}
          placeholder="tag"
          addditionalStyles={styles.inputAdditionalStyles}
        />
        <Button title="Add tag" onPress={handleAddTag} />
      </View>
      {tags}
      <View style={styles.difficultyContainer}>
        <Text>Difficulty: </Text>
        <SelectDropdown
          buttonStyle={styles.select}
          defaultValue={getValues().difficultyCount}
          data={difficulties}
          onSelect={selectedItem => setValue('difficultyCount', selectedItem)}
        />
      </View>
      <Button title={submitButtonText} onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default AddOrEditHabitScreen;

const styles = StyleSheet.create({
  checkboxLabel: {
    flexDirection: 'row',
  },
  tagsInputAndButton: {
    flexDirection: 'row',
  },
  addOrEditHabitContainer: {
    padding: 30,
  },
  select: {
    backgroundColor: '#e3e3e3',
    marginVertical: 15,
    height: 30,
    width: 120,
  },
  difficultyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputAdditionalStyles: {
    width: 'auto',
  },
});
