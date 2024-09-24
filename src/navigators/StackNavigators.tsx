import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { StartScreen } from '../screens/StartScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

const Stack = createStackNavigator();

export const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={ {
          headerShown: false,
        } }
        name="StartScreen"
        component={ StartScreen } />
      <Stack.Screen name="HomeScreen" component={ HomeScreen } />
      <Stack.Screen name="My Profile" component={ ProfileScreen } />
    </Stack.Navigator>
  );
};