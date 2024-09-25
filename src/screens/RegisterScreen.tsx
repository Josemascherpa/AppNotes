
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Dimensions, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '../navigators/StackNavigators';

import React from 'react';
import { TextInputFlat } from '../components/TextInputFlat';
import { globalColors } from '../themes/theme';
import { Button } from 'react-native-paper';

import Icon from 'react-native-vector-icons/Ionicons';


const { width, height } = Dimensions.get( "window" ); //obtener ancho 

export const RegisterScreen = () => {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (

    <KeyboardAvoidingView // para que usuarios de ios no se les bugee el scroll
      behavior={ Platform.OS === "ios" ? "padding" : undefined }
      style={ { flex: 1, backgroundColor: globalColors.backgroundColor } }
    >
      <ScrollView>
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
          <TextInputFlat textColorInput="white" padding={ 12 } paddingRight={ 48 } labelTextInput="name" title="Name" isPassword={ false } colorTitle={ globalColors.buttonTextColor } colorLabel={ globalColors.buttonTextColor } style={ { backgroundColor: globalColors.backgroundColor } } />
          <TextInputFlat textColorInput="white" padding={ 12 } paddingRight={ 48 } colorTitle={ globalColors.buttonTextColor } colorLabel={ globalColors.buttonTextColor } labelTextInput="example@mail.com" title="Email" isPassword={ false } keyboardType="email-address" style={ { backgroundColor: globalColors.backgroundColor } } />
          <TextInputFlat textColorInput="white" padding={ 12 } colorTitle={ globalColors.buttonTextColor } colorLabel={ globalColors.buttonTextColor } labelTextInput="password" title="Password" isPassword={ true } style={ { backgroundColor: globalColors.backgroundColor } } />

        </View>


        <View style={ { alignItems: "center", justifyContent: "center", marginTop: 25 } }>
          <Button
            mode="contained"
            style={ { width: width * 0.4, borderRadius: 5, backgroundColor: "#444248" } }
            onPress={ () => console.log( 'Pressed' ) }>
            Register
          </Button>
        </View>


      </ScrollView>
    </KeyboardAvoidingView>

  );
};
