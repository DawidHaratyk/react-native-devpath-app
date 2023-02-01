import {render, screen, waitFor} from '@testing-library/react-native';
import TodoItem from '../TodoItem';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClientProvider} from '@tanstack/react-query';
import {queryClient} from '../../../../App';
import {act} from 'react-test-renderer';

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

const renderComponent = (isCompleted: boolean) => {
  render(
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <TodoItem
          content="content"
          description="desc"
          id="yey"
          isCompleted={isCompleted}
        />
      </NavigationContainer>
    </QueryClientProvider>,
  );
};

describe('TodoItem', () => {
  it('should change state to completed of a pressed todo', async () => {
    renderComponent(false);

    const checkboxParent = screen.getByTestId('checkbox');
    const checkbox = checkboxParent.children[0];

    act(() => {
      checkbox.props.onClick();
    });

    await waitFor(() => {
      expect(checkbox.props.isChecked).toBeTruthy();
    });
  });

  it('should change state to uncompleted of a pressed todo', async () => {
    renderComponent(true);

    const checkboxParent = screen.getByTestId('checkbox');
    const checkbox = checkboxParent.children[0];

    act(() => {
      checkbox.props.onClick();
    });

    await waitFor(() => {
      expect(checkbox.props.isChecked).toBeFalsy();
    });
  });
});
