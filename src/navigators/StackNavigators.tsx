import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { StartScreen } from '../screens/StartScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { NoteScreen } from '../screens/NoteScreen';

export type RootStackParamList = {
  StartScreen: undefined,
  HomeScreen: undefined,
  MyProfile: undefined,
  RegisterScreen: undefined,
  NoteScreen: {
    userId:string,
    id: string,
    title:string,
    content:string,
  };
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
        
      <Stack.Screen
        options={ {
          headerShown: false,
        } }
        name="HomeScreen"
        component={ HomeScreen } />
      {/* podria ser otro stack */ }

      <Stack.Screen
        name="MyProfile"
        component={ ProfileScreen } />
      <Stack.Screen
        options={ {
          headerShown: false,
        } }
        name="RegisterScreen"
        component={ RegisterScreen }
      />
      <Stack.Screen
        name="NoteScreen"
        component={ NoteScreen }
      />
    </Stack.Navigator>
  );
};