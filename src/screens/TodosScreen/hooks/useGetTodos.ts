import {useQuery} from '@tanstack/react-query';
import getTasks from '../../../api/getTasks';
import {TodoItemParams} from '../TodosScreen';

type TodosQueryKey = ['todos'];

const useGetTodos = () => {
  const queryKey: TodosQueryKey = ['todos'];

  return useQuery<TodoItemParams[], Error>(queryKey, getTasks);
};

export default useGetTodos;
