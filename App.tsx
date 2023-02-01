import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/app/store';
import {HomeTabs} from './src/navigation/HomeTabs';
import RNBootSplash from 'react-native-bootsplash';

type HomeTabParamList = {
  Habits: undefined;
  Todos: undefined;
  Settings: undefined;
};

export type AppStackParamList = {
  Home: HomeTabParamList;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer onReady={() => RNBootSplash.hide()}>
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name="Home" component={HomeTabs} />
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
