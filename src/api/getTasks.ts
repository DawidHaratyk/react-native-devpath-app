import {api} from './api';

const getTasks = async () => {
  return await api
    .getTasks()
    .then(tasks => tasks)
    .catch(error => console.log(error));
};

export default getTasks;
