import { Dimensions, Image, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { type NavigationProp, useNavigation } from '@react-navigation/native';
import { type RootStackParamList } from '../navigators/StackNavigators';


const { width, height } = Dimensions.get( "window" ); //obtener ancho 

export const StartScreen = () => {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <KeyboardAvoidingView // para que usuarios de ios no se les bugee el scroll
      behavior={ Platform.OS === "ios" ? "padding" : undefined }
      style={ { flex: 1, backgroundColor: "#69676a" } }
    >
      <ScrollView style={ { flex: 1 } } contentContainerStyle={ { flexGrow: 1 } }>

        {/* container background */ }
        <View style={ { flex: 1 } }>
          {/* contenedor texts */ }
          <View style={ { flex: 0.1, alignItems: 'center', backgroundColor: "#69676a", marginVertical: 10 } }>
            <Text style={ styles.welcome }>Welcome to the</Text>
            <Text style={ styles.appnotes }>AppNotes</Text>
          </View >

          <View style={ { flex: 0.2, backgroundColor: "#69676a" } }>
            <Image source={ require( '../assets/background3.jpeg' ) } style={ { height: width * 0.7, width: width } } resizeMode="cover" />
          </View>

          {/* Contenedor de inputs */ }
          <View style={ { flex: 0.7, backgroundColor: "#69676a", alignItems: 'center' } }>
            <TextInput
              style={ { height: 40, width: width * 0.8, marginBottom: 15 } }
              label="Email"
              mode="outlined"
              placeholder="Type something"
              outlineColor="black"
              activeOutlineColor="black"
            />
            <TextInput
              style={ { height: 40, width: width * 0.8, marginBottom: 3 } }
              label="Password"
              mode="outlined"
              placeholder="Type something"
              outlineColor="black"
              activeOutlineColor="black"
              secureTextEntry
            />
            <Button
              mode="contained"
              style={ { marginTop: 8, width: width * 0.4, borderRadius: 5, backgroundColor: "#444248", marginBottom: 15 } }
              onPress={ () => console.log( 'Pressed' ) }>
              Login
            </Button>

            <Text onPress={ () => navigation.navigate( "RegisterScreen" ) } style={ { color: "white", } }>
              Don't have an account?
            </Text>

          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView >
  );
};

const styles = StyleSheet.create( {

  welcome: {
    fontSize: 43,
    color: '#2f2f2f',
    textAlign: 'center',
    marginTop: 30,
  },
  appnotes: {
    fontSize: 55,
    fontWeight: 'bold',
    color: '#2f2f2f',
    textAlign: 'center',

  }
} );
