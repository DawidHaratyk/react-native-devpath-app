import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import React from 'react';
import {QueryClientProvider} from '@tanstack/react-query';
import {queryClient} from '../../../../App';
import {store} from '../../../app/store';
import {Provider} from 'react-redux';
import {api} from '../../../api/api';
import {TodosStack} from '../../../navigation/TodosStack';
import {NavigationContainer} from '@react-navigation/native';
import {rest} from 'msw';
import {setupServer} from 'msw/node';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
}));

jest.mock('redux-persist', () => {
  const real = jest.requireActual('redux-persist');
  return {
    ...real,
    persistReducer: jest
      .fn()
      .mockImplementation((config, reducers) => reducers),
  };
});

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

// const server = setupServer(
//   rest.get('https://api.todoist.com/rest/v2/tasks', (req, res, ctx) => {
//     return res(
//       ctx.json([
//         {
//           id: '2995104339',
//           content: 'Buy Milk',
//           description: '',
//           comment_count: 0,
//           is_completed: false,
//           order: 1,
//           priority: 1,
//           project_id: '2203306141',
//           labels: [],
//           due: null,
//           section_id: null,
//           parent_id: null,
//           creator_id: 2671355,
//           created_at: '2019-12-11T22:36:50.000000Z',
//           assignee_id: null,
//           assigner_id: null,
//           url: 'https://todoist.com/showTask?id=2995104339',
//         },
//         {
//           id: '2995104339',
//           content: 'Buy Milk',
//           description: '',
//           comment_count: 0,
//           is_completed: false,
//           order: 1,
//           priority: 1,
//           project_id: '2203306141',
//           labels: [],
//           due: null,
//           section_id: null,
//           parent_id: null,
//           creator_id: 2671355,
//           created_at: '2019-12-11T22:36:50.000000Z',
//           assignee_id: null,
//           assigner_id: null,
//           url: 'https://todoist.com/showTask?id=2995104339',
//         },
//       ]),
//     );
//   }),
// );

describe('TodosScreen', () => {
  const mockedNavigate = jest.fn();

  const mockedNavigation = {navigate: mockedNavigate};

  // beforeAll(() => server.listen());

  // afterEach(() => server.resetHandlers());

  // afterAll(() => server.close());

  it('renders appropriate count of todos and shows a new todo when adding a new one', async () => {
    rest.get('https://api.todoist.com/rest/v2/tasks', (req, res, ctx) => {
      return res(
        ctx.json([
          {
            id: '2995104339',
            content: 'Buy Milk',
            description: '',
            comment_count: 0,
            is_completed: false,
            order: 1,
            priority: 1,
            project_id: '2203306141',
            labels: [],
            due: null,
            section_id: null,
            parent_id: null,
            creator_id: 2671355,
            created_at: '2019-12-11T22:36:50.000000Z',
            assignee_id: null,
            assigner_id: null,
            url: 'https://todoist.com/showTask?id=2995104339',
          },
          {
            id: '2995104339',
            content: 'Buy Milk',
            description: '',
            comment_count: 0,
            is_completed: false,
            order: 1,
            priority: 1,
            project_id: '2203306141',
            labels: [],
            due: null,
            section_id: null,
            parent_id: null,
            creator_id: 2671355,
            created_at: '2019-12-11T22:36:50.000000Z',
            assignee_id: null,
            assigner_id: null,
            url: 'https://todoist.com/showTask?id=2995104339',
          },
        ]),
      );
    });

    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <TodosStack />
          </NavigationContainer>
        </QueryClientProvider>
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('todos-list').children).toHaveLength(2);
    });

    const showAddTodoForm = screen.getByTestId('show-add-todo-form');
    fireEvent.press(showAddTodoForm);

    await waitFor(() => {
      const nameInput = screen.getByTestId('name');
      fireEvent.changeText(nameInput, 'new todo');
    });

    act(() => {
      fireEvent.press(screen.getByText('Add'));
    });

    expect(screen.getByTestId('todos-list').children).toHaveLength(3);
  });

  it('should be able to mark todo as completed', async () => {
    await waitFor(() => {
      api.getTasks = jest.fn(
        () =>
          new Promise(resolve => {
            resolve(
              Array.from([...Array(210).keys()], index => ({
                creator_id: '2671355',
                created_at: '2019-12-11T22:36:50.000000Z',
                assignee_id: '2671362',
                assigner_id: '2671355',
                comment_count: 10,
                is_completed: false,
                content: `Buy Milk ${index}`,
                description: '',
                due: {
                  date: '2016-09-01',
                  is_recurring: false,
                  datetime: '2016-09-01T12:00:00.000000Z',
                  string: 'tomorrow at 12',
                  timezone: 'Europe/Moscow',
                },
                id: '2995104339',
                labels: ['Food', 'Shopping'],
                order: 1,
                priority: 1,
                project_id: '2203306141',
                section_id: '7025',
                parent_id: '2995104589',
                url: 'https://todoist.com/showTask?id=2995104339',
              })),
            );
          }),
      );
    });

    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <TodosStack />,
        </QueryClientProvider>
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('todos-list').children).toHaveLength(200);
    });
  });
});
