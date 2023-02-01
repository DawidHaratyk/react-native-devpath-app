import {v4 as uuidv4} from 'uuid';

type Props = {
  name: string;
  projectId: string;
};

export const addTask = async ({name, projectId}: Props) => {
  const response = await fetch('https://api.todoist.com/rest/v2/tasks', {
    method: 'POST',
    body: JSON.stringify({
      content: name,
      project_id: projectId,
    }),
    headers: {
      'Content-Type': 'application/json',
      'X-Request-Id': uuidv4(),
      Authorization: 'Bearer a55027c5e564be487f68051071022850058454b2',
    },
  });

  const data = await response.json();

  return data;
};
