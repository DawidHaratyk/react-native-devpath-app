import {api} from './api';

const getTask = async (todoId: string | undefined) => {
  // how to avoid as string below?
  return await api
    .getTask(todoId as string)
    .then(task => task)
    .catch(error => console.log(error));
};

export default getTask;
