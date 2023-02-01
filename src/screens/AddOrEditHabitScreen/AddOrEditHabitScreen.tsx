import {Alert, Button, StyleSheet, Text, View} from 'react-native';
import React, {useMemo, useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import FormInput from '../../components/FormInput/FormInput';
import {useAppDispatch, useAppSelector} from '../../app/hooks/hooks';
import {addHabit, editHabit, Habit} from '../../app/habitsSlice/habitsSlice';
import Input from '../../components/Input/Input';
import {formValidation} from '../../constants/formValidation';
import {yupResolver} from '@hookform/resolvers/yup';
import {FormValues, NavigationProps, RouteProps} from './types';
import TagWithDeleteButton from '../../components/TagWithDeleteButton/TagWithDeleteButton';
import SelectDropdown from 'react-native-select-dropdown';
import {difficulties} from '../../constants/variables';
import useHabitValues from './hooks/useHabitValues';

interface AddOrEditHabitScreenProps {
  route: RouteProps;
  navigation: NavigationProps;
}

const AddOrEditHabitScreen = ({
  route,
  navigation,
}: AddOrEditHabitScreenProps) => {
  const habitId = route.params?.habitId;

  const {habitToEdit, initialTagsList, isEditingHabit, submitButtonText} =
    useHabitValues(habitId);
  const dispatch = useAppDispatch();
  const habitsList = useAppSelector(state => state.habits.habitsList);

  const [currentTypedTag, setCurrentTypedTag] = useState('');
  const [tagsList, setTagsList] = useState(initialTagsList || []);

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
    },
  });

  const handleAddTag = () => {
    if (tagsList.includes(currentTypedTag)) {
      return Alert.alert('Typed tag is already in list ;)');
    }

    if (currentTypedTag) {
      setTagsList(prevState => [...prevState, currentTypedTag]);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = ({
    name,
    description,
    difficultyCount,
  }) => {
    const currentBiggestId = habitsList.length
      ? Math.max(...habitsList.map(habit => habit.id))
      : 0;

    const habitContent = {
      name,
      description,
      tags: tagsList,
      difficultyCount,
      id: isEditingHabit ? habitId : currentBiggestId + 1,
      completedData: null,
    };

    // how to avoid the typing below?
    isEditingHabit
      ? dispatch(editHabit(habitContent as Habit))
      : dispatch(addHabit(habitContent as Habit));
    navigation.navigate('HabitsScreen');
  };

  const tags = useMemo(
    () =>
      tagsList?.length ? (
        tagsList?.map((tag, key) => (
          <TagWithDeleteButton tag={tag} setTagsList={setTagsList} key={key} />
        ))
      ) : (
        <Text>No available tags yet</Text>
      ),
    [tagsList],
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
          value={currentTypedTag}
          onChangeText={setCurrentTypedTag}
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
