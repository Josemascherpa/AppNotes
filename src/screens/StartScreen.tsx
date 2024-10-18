import { Dimensions, Image, KeyboardAvoidingView, Platform, StyleSheet, View, Alert } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import React, { useCallback,  useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { type NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import { type RootStackParamList } from '../navigators/StackNavigators';
import { globalColors } from '../themes/theme';
import { verifyLogin } from '../actions/login';
import { UserLogin } from '../domain/user';
import AsyncStorage from '@react-native-async-storage/async-storage';



const { width } = Dimensions.get( "window" ); //obtener ancho 

export const StartScreen = () => {

  const [ email, setEmail ] = useState( "" );
  const [ password, setPassword ] = useState( "" );
  const [ user, setUser ] = useState<UserLogin>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();


  useFocusEffect(//cada vez que vengo a esta pantalla, actualizo
    useCallback( () => {
      setEmail( "" );
      setPassword( "" );      
    }, [] )
  );

  const handleLogin = async () => {
    if ( email === "" || password === "" ) {
      Alert.alert( 'Error', 'All fields are required' );
      return;
    }
    const user: UserLogin = {//creo usuario        
      email,
      password,
    };

    try {
      setUser( user );
      const responseData = await verifyLogin( user ); // 
      await AsyncStorage.setItem( 'userToken', responseData.token );
      await AsyncStorage.setItem( 'userId', responseData.id );      
      Alert.alert( 'Login Successful', `Welcome, ${ responseData.name }` );
      navigation.navigate( "HomeScreen" );
    } catch ( error ) {      
      Alert.alert( 'Error asdfasd', error instanceof Error ? error.message : "An unexpected error occurred" );
    }
  };


  return (
    <KeyboardAvoidingView // para que usuarios de ios no se les bugee el scroll
      behavior={ Platform.OS === "ios" ? "padding" : undefined }
      style={ { flex: 1, backgroundColor: globalColors.backgroundColor } }
    >
      <ScrollView style={ { flex: 1 } } contentContainerStyle={ { flexGrow: 1 } } keyboardShouldPersistTaps="handled">

        {/* container background */ }
        <View style={ { flex: 1 } }>

          {/* contenedor texts */ }
          <View style={ { flex: 0.1, alignItems: 'center', backgroundColor: globalColors.backgroundColor, marginVertical: 28 } }>
            <Text style={ styles.welcome }>Welcome to the</Text>
            <Text style={ styles.appnotes }>AppNotes</Text>
          </View >

          <View style={ { flex: 0.2, backgroundColor: globalColors.backgroundColor } }>
            <Image source={ require( '../assets/background3.jpeg' ) } style={ { height: width * 0.6, width: width } } resizeMode="cover" />
          </View>

          {/* Contenedor de inputs */ }
          <View style={ { flex: 0.7, backgroundColor: globalColors.backgroundColor, alignItems: 'center' } }>
            <TextInput
              style={ { height: 40, width: width * 0.8, marginBottom: 15 } }
              label="Email"
              mode="outlined"
              placeholder="Type something"
              outlineColor="black"
              activeOutlineColor="black"
              value={ email }
              keyboardType="email-address"
              onChangeText={ setEmail }
              autoCapitalize="none"
            />
            <TextInput
              style={ { height: 40, width: width * 0.8, marginBottom: 3 } }
              label="Password"
              mode="outlined"
              placeholder="Type something"
              outlineColor="black"
              activeOutlineColor="black"
              secureTextEntry
              value={ password }
              onChangeText={ setPassword }
              autoCapitalize="none"
            />
            <Button
              mode="contained"
              style={ { marginTop: 15, width: width * 0.4, borderRadius: 5, backgroundColor: globalColors.buttonBackgroundColor, marginBottom: 5 } }
              onPress={ () => handleLogin() }>
              Login
            </Button>

            <Button
              onPress={ () => navigation.navigate( "RegisterScreen" ) }
              mode="text"
              textColor="white"
              contentStyle={ { borderBottomWidth: 1, borderBottomColor: 'white', width: 180, height: 35 } }
              rippleColor="transparent"
              style={ { borderRadius: 5, } }
            >
              Don't have an account?
            </Button>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView >
  );
};

const styles = StyleSheet.create( {

  welcome: {
    fontSize: 43,
    color: globalColors.titleColor,
    textAlign: 'center',
    marginTop: 30,
  },
  appnotes: {
    fontSize: 55,
    fontWeight: 'bold',
    color: globalColors.titleColor,
    textAlign: 'center',
  }
} );
