import {api} from './api';

export const closeTask = async (id: string) => {
  return await api
    .closeTask(id)
    .then(isSuccess => console.log(isSuccess))
    .catch(error => console.log(error));
};
