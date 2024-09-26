
import { Dimensions, DimensionValue, StyleProp, Text, TextStyle, View } from 'react-native';
import { TextInput } from 'react-native-paper';


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
  value:string;
  onChange: (text: string) => void;
}


export const TextInputFlat = ( { title, labelTextInput, style, isPassword, keyboardType = "default", colorLabel, colorTitle, paddingRight = 20, padding = 10, textColorInput = "black",onChange,value=""}: Props ) => {

  return (
    <View style={ { flexDirection: "row", padding: padding, alignItems: "center", justifyContent: "center" } }>
      <Text style={ { width: width * 0.3, height: 35, fontWeight: "bold", paddingRight: paddingRight, color: colorTitle,  textAlignVertical: 'center', textAlign: 'center' } }>
        { title }
      </Text>
      <TextInput
        style={ [ { height: 34, width: width * 0.6, borderBottomWidth: 1, borderBottomColor: "black", textAlignVertical: 'center' }, style ] }
        mode="flat"
        placeholder={ labelTextInput }
        placeholderTextColor={ colorLabel }
        activeOutlineColor="black"
        secureTextEntry={ isPassword ? true : false }
        keyboardType={ keyboardType }
        textColor={ textColorInput }
        value={value}
        onChangeText={onChange} 
      />
    </View>
  );
};

