import {api} from './api';

type Props = {
  name: string;
  todoId: string;
};

export const updateTask = async ({name, todoId}: Props) => {
  return await api
    .updateTask(todoId, {content: name})
    .then(isSuccess => isSuccess)
    .catch(error => console.log(error));
};
