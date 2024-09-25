
import { Dimensions, DimensionValue, StyleProp, Text, TextStyle, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { globalColors } from '../themes/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';

const { width, height } = Dimensions.get( "window" ); //obtener ancho 


interface Props {
  title: string;
  labelTextInput: string;
  style?: StyleProp<TextStyle>;
  isPassword: boolean;
  keyboardType?:
  'default'
  | 'numeric'
  | 'number-pad'
  | 'decimal-pad'
  | 'email-address'
  | 'phone-pad'
  | 'url'
  | 'ascii-capable';
  colorTitle?: string;
  colorLabel?: string;
  paddingRight?: number;
  padding?: number;
  textColorInput?: string;
}


export const TextInputFlat = ( { title, labelTextInput, style, isPassword, keyboardType = "default", colorLabel, colorTitle, paddingRight = 20, padding = 10, textColorInput = "black" }: Props ) => {
  const [ secureTextEntry, setSecureTextEntry ] = useState( true );
  return (

    <View style={ { alignItems: "center", justifyContent: "center", flexDirection: "row", padding: padding, } }>
      <Text style={ { fontWeight: "bold", paddingRight: paddingRight, color: colorTitle } }>{ title }</Text>
      <TextInput
        style={ [ { height: 34, width: width * 0.6, borderBottomWidth: 1, borderBottomColor: "black" }, style ] }
        mode="flat"
        placeholder={ labelTextInput }
        placeholderTextColor={ colorLabel }
        activeOutlineColor="black"
        secureTextEntry={ isPassword ? true : false }
        keyboardType={ keyboardType }
        textColor={ textColorInput }
        
      />

    </View>
  );
};
