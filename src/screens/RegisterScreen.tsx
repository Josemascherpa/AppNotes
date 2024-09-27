
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Alert, Dimensions, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '../navigators/StackNavigators';

import React, { useState } from 'react';
import { TextInputFlat } from '../components/TextInputFlat';
import { globalColors } from '../themes/theme';
import { Button } from 'react-native-paper';

import Icon from 'react-native-vector-icons/Ionicons';
import { User } from '../domain/user';
import { verifyRegister } from '../actions/register';


const { width } = Dimensions.get( "window" ); //obtener ancho 

export const RegisterScreen = () => {

  const { top } = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [ name, setName ] = useState( "" );
  const [ email, setEmail ] = useState( "" );
  const [ password, setPassword ] = useState( "" );
  const [ rePassword, setRePassword ] = useState( "" );
  const [ user, setUser ] = useState<User>();

  const handleRegister = async () => {
    if ( name === "" || email === "" || password === "" || rePassword === "" ) {
      Alert.alert( 'Error', 'All fields are required' );
      return;
    }
    if ( password !== rePassword ) {
      Alert.alert( 'Error', 'Passwords do not match' );
      return;
    }

    const newUser: User = {//creo usuario
      name,
      email,
      password
    };
    setUser( newUser );//lo guardo

    try {
      const responseData = await verifyRegister( newUser ); // Pasa el nuevo usuario a verifyRegister
      //Deberia guardar token en local storage
      Alert.alert( 'Registration Successful', `Welcome, ${ name }` );
      navigation.navigate( "HomeScreen" );
    } catch ( error ) {
      // Asegúrate de que el error sea de tipo Error para acceder a error.message
      Alert.alert( 'Error', error instanceof Error ? error.message : "An unexpected error occurred" );
    }
  };


  return (

    <KeyboardAvoidingView // para que usuarios de ios no se les bugee el scroll
      behavior={ Platform.OS === "ios" ? "padding" : undefined }
      style={ { flex: 1, backgroundColor: globalColors.backgroundColor } }
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={ { flex: 0.3, backgroundColor: globalColors.backgroundColor, paddingTop: top } }>
          <Pressable
            onPress={ () => navigation.goBack() }
            style={ ( { pressed } ) => [
              { opacity: pressed ? 0.7 : 1, marginLeft: 20, marginTop: 20 } // Cambia la opacidad al presionar
            ] }
          >
            <Icon name="arrow-back-circle-outline" size={ 30 } color="#eceaea" />
          </Pressable>


          <Text style={ {
            fontSize: 38,
            color: '#eceaea',
            textAlign: 'center',
            fontWeight: "bold",
            marginTop: 30,
          } }>Create an { '\n' }account
          </Text>
        </View>


        <View style={ { flex: 1, alignItems: "center", justifyContent: "center", marginTop: 30 } }>
          <TextInputFlat value={ name } onChangeText={ setName } textColorInput="white" padding={ 15 } paddingRight={ 48 } labelTextInput="name" title="Name" isPassword={ false } colorTitle={ globalColors.buttonTextColor } colorLabel={ globalColors.buttonTextColor } style={ { backgroundColor: globalColors.backgroundColor } } />
          <TextInputFlat value={ email } onChangeText={ setEmail } textColorInput="white" padding={ 15 } paddingRight={ 48 } colorTitle={ globalColors.buttonTextColor } colorLabel={ globalColors.buttonTextColor } labelTextInput="example@mail.com" title="Email" isPassword={ false } keyboardType="email-address" style={ { backgroundColor: globalColors.backgroundColor } } />
          <TextInputFlat value={ password } onChangeText={ setPassword } textColorInput="white" padding={ 15 } colorTitle={ globalColors.buttonTextColor } colorLabel={ globalColors.buttonTextColor } labelTextInput="password" title="Password" isPassword={ true } style={ { backgroundColor: globalColors.backgroundColor } } />
          <TextInputFlat value={ rePassword } onChangeText={ setRePassword } textColorInput="white" padding={ 15 } colorTitle={ globalColors.buttonTextColor } colorLabel={ globalColors.buttonTextColor } labelTextInput="password" title="Repeat Password" isPassword={ true } style={ { backgroundColor: globalColors.backgroundColor } } />
        </View>


        <View style={ { alignItems: "center", justifyContent: "center", marginTop: 25 } }>
          <Button
            mode="contained"
            style={ { width: width * 0.4, borderRadius: 5, backgroundColor: "#444248" } }
            onPress={ () => handleRegister() }>
            Register
          </Button>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>

  );
};
