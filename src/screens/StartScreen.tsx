import { Dimensions, ImageBackground, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { globalStyles } from '../themes/theme';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const StartScreen = () => {

  const { width, height } = Dimensions.get( "window" ); //obtener ancho 

  return (
    <KeyboardAvoidingView // para que usuarios de ios no se les bugee el scroll
      behavior={ Platform.OS === "ios" ? "padding" : undefined }
      style={ { flex: 1 } }
    >
      <ScrollView style={ { flex: 1 } } contentContainerStyle={ { flexGrow: 1 } }>

        {/* container background */ }
        <View style={ { flex: 1 } }>
          <ImageBackground
            source={ require( "../assets/background3.jpg" ) }
            resizeMode="cover"
            style={ { width: width, height: height } }//que ocupe toda la pantalla directamente
          >

            {/* contenedor texts */ }
            <View style={ { flex: 0.4, marginTop: 30, alignItems: 'center' } }>
              <Text style={ styles.welcome }>Welcome to the</Text>
              <Text style={ styles.appnotes }>AppNotes</Text>
            </View>

            {/* Contenedor de inputs */ }
            <View style={ { flex: 0.6, justifyContent: 'center', alignItems: 'center' } }>
              <TextInput
                style={ { height: 40, width: width * 0.8 } }
                label="Email"
                mode="outlined"
                placeholder="Type something"
                outlineColor="black"
                activeOutlineColor="black"
              />
              <TextInput
                style={ { height: 40, width: width * 0.8, marginTop: 20 } }
                label="Password"
                mode="outlined"
                placeholder="Type something"
                outlineColor="black"
                activeOutlineColor="black"
                secureTextEntry
              />
            </View>

          </ImageBackground>
        </View>        
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create( {

  welcome: {
    fontSize: 43,
    color: '#2f2f2f',
    textAlign: 'center',
    marginTop: 60,
  },
  appnotes: {
    fontSize: 55,
    fontWeight: 'bold',
    color: '#2f2f2f',
    textAlign: 'center',
  }
} );
