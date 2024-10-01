
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { Alert, BackHandler, Dimensions, FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View, StyleProp } from 'react-native';
import { RootStackParamList } from '../navigators/StackNavigators';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { globalColors } from '../themes/theme';
import { addNote, getNotes } from '../context/notesStore';
import { Button } from 'react-native-paper';



interface Notes {
  id: string;
  title: string;
  content: string;
}

const { width, height } = Dimensions.get( "window" );
export const HomeScreen = () => {
  const [ notes, setNotes ] = useState<Notes[]>( [] );//deberia llamar al getnotes para obtener el array de notas
  const { top } = useSafeAreaInsets();

  const navigator = useNavigation<NavigationProp<RootStackParamList>>();

  useFocusEffect(//cada vez que vengo a esta pantalla, actualizo
    useCallback( () => {
      setNotes( [ ...getNotes() ] );
    }, [] )
  );
  const handleAddNote = () => {
    const newNote = addNote( "", "" );
    setNotes( [ ...getNotes() ] );
    if ( newNote ) {
      navigator.navigate( "NoteScreen", {
        id: newNote.id.toString(),
      } );
    } else {
      console.error( "Error al agregar la nota" );
    }
  };

  // como dibujo cada nota
  const renderNote = ( { item }: { item: Notes; } ) => (
    <Pressable onPress={ () => navigator.navigate( "NoteScreen", {
      id: item.id,
    } ) }>
      <View style={ styles.noteCard } >
        <Text style={ styles.noteTitle }>{ item.title }</Text>
        <Text style={ styles.noteContent }>{ item.content }</Text>
      </View>
    </Pressable>
  );
  const logout = async () => {
    // await AsyncStorage.removeItem( 'token' ); // Ejemplo para eliminar el token almacenado
    navigator.navigate( "StartScreen" );
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
    <View style={ { flex: 1 } }>

      <FlatList
        style={ { flex:1} }
        contentContainerStyle={{flexGrow:1,padding:5,paddingTop:top}}
        data={ notes }
        keyExtractor={ item => item.id }
        renderItem={ renderNote }
        numColumns={ 2 }
        columnWrapperStyle={ { justifyContent: 'space-between' } }
      />
      

      {/* Contenedor para el botón */ }
      <View style={ { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', position: 'absolute', bottom: 20, right: 20, backgroundColor: "red" } }>
        <Button
          onPress={ () => handleAddNote() }
          style={ {
            backgroundColor: 'red',
            width: 50,
            height: 50,
            justifyContent: 'center', // Centra el texto en el botón
            alignItems: 'center',     // Centra el texto en el botón
          } }
        >+</Button>
      </View>
      
    </View>

  );
};

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
    flex: 1,
    fontSize: 14,
    color: "black",
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