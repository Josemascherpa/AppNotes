import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { StartScreen } from '../screens/StartScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { RegisterScreen } from '../screens/RegisterScreen';

export type RootStackParamList = {
  StartScreen: undefined,
  HomeScreen: undefined,
  MyProfile: undefined,
  RegisterScreen: undefined,
};

const Stack = createStackNavigator<RootStackParamList>();

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
      <Stack.Screen name="MyProfile" component={ ProfileScreen } />
      <Stack.Screen
        options={ {
          headerShown: false,
        } }
        name="RegisterScreen" component={ RegisterScreen }
      />
    </Stack.Navigator>
  );
};