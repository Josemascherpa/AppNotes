import { NavigationContainer } from '@react-navigation/native';

import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { StackNavigator } from './navigators/StackNavigators';
import { StatusBar } from 'react-native';

export const AppNotes = () => {
  return (
    <PaperProvider theme={ DefaultTheme }>
      <StatusBar translucent backgroundColor="transparent" />
      <NavigationContainer>

        <StackNavigator />

      </NavigationContainer>


    </PaperProvider>

  );
};
