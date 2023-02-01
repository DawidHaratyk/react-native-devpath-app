import {Task} from '@doist/todoist-api-typescript';
import {useQuery} from '@tanstack/react-query';
import getTasks from '../../../api/getTasks';

type TodosQueryKey = ['todos'];

const useGetTodos = () => {
  const queryKey: TodosQueryKey = ['todos'];

  return useQuery<Task[], Error>(queryKey, getTasks);
};

export default useGetTodos;
