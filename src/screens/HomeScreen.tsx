
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';

import { Alert, BackHandler, Button, Dimensions, FlatList, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { RootStackParamList } from '../navigators/StackNavigators';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { globalColors } from '../themes/theme';


interface Notes {
  title: string;
  content: string;
}

const { width } = Dimensions.get( "window" ); //obtener ancho 
export const HomeScreen = () => {

  const [ notes, setNotes ] = useState<Notes[]>( [] );//array con todas las notas
  const [ note, setNote ] = useState<Notes>( { title: 'title', content: 'write' } );
  const [ isModalVisible, setIsModalVisible ] = useState( false );
  const { top } = useSafeAreaInsets();

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  //Nueva nota
  const addNote = () => {
    setNotes( [ ...notes, note ] ); // Agregar la nota al arreglo de notas       
  };

  // Función para renderizar cada nota
  const renderNote = ( { item }: { item: Notes; } ) => (
    <Pressable onPress={ () => navigation.navigate( "NoteScreen" ) }>
      <View style={ styles.noteCard } >
        <Text style={ styles.noteTitle }>{ item.title }</Text>
        <Text style={ styles.noteContent }>{ item.content }</Text>
      </View>
    </Pressable>

  );


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
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [] );

  return (
    <ScrollView style={ { flex: 1, paddingTop: top, backgroundColor: globalColors.backgroundColor, padding: 5 } } keyboardShouldPersistTaps="handled">
      <Button title="Add Note" onPress={ () => addNote() } />
      <FlatList
        data={ notes }
        keyExtractor={ ( _, index ) => index.toString() }
        renderItem={ renderNote }
        contentContainerStyle={ { paddingBottom: 20 } }
        numColumns={ 2 } // Especificar cuántas columnas (en este caso, 2 columnas)
        columnWrapperStyle={ { justifyContent: 'space-between' } } // Estilo para distribuir las notas
      />

    </ScrollView>
  );
};


// Estilos
const styles = StyleSheet.create( {
  noteCard: {
    width: width * 0.47,
    height: 100,
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "black"
  },
  noteContent: {
    marginTop: 5,
    fontSize: 14,
    color: "black"
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  input: {
    width: '90%',
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
} );