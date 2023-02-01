import {api} from './api';

export const deleteTask = async (todoId: string) => {
  return await api
    .deleteTask(todoId)
    .then(isSuccess => console.log(isSuccess))
    .catch(error => console.log(error));
};
