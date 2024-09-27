
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

import { Alert, BackHandler, Text, View } from 'react-native';
import { RootStackParamList } from '../navigators/StackNavigators';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export const HomeScreen = () => {

  const {top} = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const logout = async () => {
    // await AsyncStorage.removeItem( 'token' ); // Ejemplo para eliminar el token almacenado
    navigation.navigate( "StartScreen" ); // Navegar a la pantalla de inicio de sesión
  };

  useEffect( () => {
    const backAction = () => {
      Alert.alert( "Hold on!", "Do you want to logout?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: logout }
      ] );
      return true; // Evitar comportamiento por defecto
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [] );

  return (
    <View style={{marginTop:top}}>
      <Text style={{color:'black',textAlign:'center'}}>HomeScreen</Text>
    </View>
  );
};
