import { Dimensions, Image, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { type NavigationProp, useNavigation } from '@react-navigation/native';
import { type RootStackParamList } from '../navigators/StackNavigators';
import { globalColors } from '../themes/theme';


const { width } = Dimensions.get( "window" ); //obtener ancho 

export const StartScreen = () => {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <KeyboardAvoidingView // para que usuarios de ios no se les bugee el scroll
      behavior={ Platform.OS === "ios" ? "padding" : undefined }
      style={ { flex: 1, backgroundColor: globalColors.backgroundColor } }
    >
      <ScrollView style={ { flex: 1 } } contentContainerStyle={ { flexGrow: 1 } }>

        {/* container background */ }
        <View style={ { flex: 1 } }>

          {/* contenedor texts */ }
          <View style={ { flex: 0.1, alignItems: 'center', backgroundColor:globalColors.backgroundColor, marginVertical: 10 } }>
            <Text style={ styles.welcome }>Welcome to the</Text>
            <Text style={ styles.appnotes }>AppNotes</Text>
          </View >

          <View style={ { flex: 0.2, backgroundColor: globalColors.backgroundColor } }>
            <Image source={ require( '../assets/background3.jpeg' ) } style={ { height: width * 0.7, width: width } } resizeMode="cover" />
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
              style={ { marginTop: 8, width: width * 0.4, borderRadius: 5, backgroundColor: globalColors.buttonBackgroundColor, marginBottom: 12 } }
              onPress={ () => console.log( 'Pressed' ) }>
              Login
            </Button>

            <Button
              onPress={ () => navigation.navigate( "RegisterScreen" ) }
              mode="text"
              textColor="white"
              contentStyle={ { borderBottomWidth: 1, borderBottomColor: 'white', width: width * 0.45, height: 35 } }
              rippleColor="transparent"
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
