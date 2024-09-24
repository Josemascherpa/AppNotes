
import { useState } from 'react';
import { Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';

export const ProfileScreen = () => {
  const [ text, setText ] = useState( '' );
  return (
    <View style={ { backgroundColor: "black", flex: 1 } }>
      <TextInput        
        label="Email"
        mode="outlined"
        placeholder="Type something"
        outlineColor="black"
        
      />
    </View>
  );
};
