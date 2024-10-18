import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, BackHandler, Dimensions, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../navigators/StackNavigators';
import { Button } from 'react-native-paper';
import { globalColors } from '../themes/theme';
import { logout } from '../actions/logout';
import { getNotes, Note } from '../context/notesStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { stripHTML } from '../config/helpers/stripHtml';
import Icon from 'react-native-vector-icons/Ionicons';


const { width } = Dimensions.get( "window" );

export const HomeScreen = () => {

  const [ notesUser, setNotes ] = useState<Note[]>( [] );//deberia llamar al getnotes para obtener el array de notas
  const navigator = useNavigation<NavigationProp<RootStackParamList>>();
  const userId = useRef<string>( "" );

  const fetchUserIdAndNotes = async () => {
    let notes: Note[] = [];
    try {
      if ( userId.current != "" ) {
        notes = await getNotes( userId.current );
      } else {
        const id = await AsyncStorage.getItem( "userId" );
        if ( id ) {
          userId.current = id;
          notes = await getNotes( userId.current );
        }
      }
      setNotes( notes );
    } catch ( error ) {
      console.log( "Error al obtener userId o notas:", error );
    }
  };

  // como dibujo cada nota
  const renderNote = ( { item }: { item: Note; } ) => (
    <Pressable onPress={ () => {            
      navigator.navigate( "NoteScreen", {
        userId: userId.current,
        id: item._id,
        title: item.title,
        content: item.content,
      } );
    } }>
      <View style={ styles.noteCard }>
        <Text style={ styles.noteTitle }>{ item.title }</Text>
        <Text style={ styles.noteContent }>{ stripHTML( item.content ) }</Text>
      </View>
    </Pressable>
  );

  useFocusEffect(//cada vez que vengo a esta pantalla, actualizo
    useCallback( () => {
      fetchUserIdAndNotes();
    }, [] )
  );


  useEffect( () => {//logout
    const backAction = () => {
      Alert.alert( "Hold on!", "Do you want to logout?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        {
          text: "YES", onPress: async () => {
            await logout();
            navigator.navigate( "StartScreen" );
          }
        }
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
    <View style={ { flex: 1, backgroundColor: globalColors.backgroundColor } }>

      <FlatList
        ListHeaderComponent={ () => (
          <View style={ { flexDirection: "row", alignItems: "center" } }>
            <Text style={ styles.headerTitle }>App Notes</Text>
            <Icon name="document-text-outline" size={ 35 } color="#cdcdcd" style={ styles.iconAppNotes } />
          </View>


        ) }
        contentContainerStyle={ { flexGrow: 1, paddingHorizontal: 5 } }
        data={ notesUser }
        keyExtractor={ item => item._id }
        renderItem={ renderNote }
        numColumns={ 2 }
        columnWrapperStyle={ { justifyContent: 'space-between' } }
      />
      {/* Contenedor para el botón */ }
      <View style={ styles.containerButton } >
        <Pressable
          onPress={ () => {
            navigator.navigate( "NoteScreen", {
              userId: userId.current,
              id: "",
              title: "",
              content: "",
            } );
          } }
          style={ styles.styleButton }
        >
          <Icon name="add-circle-outline" size={ 30 } color="white" style={ styles.icon } />
        </Pressable>
      </View>
    </View >

  );
};

const styles = StyleSheet.create( {
  headerTitle: {
    fontSize: 43,
    color: "#cdcdcd",
    textAlign: 'center',
    paddingLeft: width * 0.2,
    marginTop: 30,
  },
  containerButton: {
    justifyContent: "center",
    alignContent: "center",
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  styleButton: {
    width: 52,
    height: 50,
    justifyContent: 'center', // Centra el contenido verticalmente
    backgroundColor: 'grey',
    borderRadius: 25, // Para hacer el botón circular
  },
  icon: {
    alignSelf: "center",
    paddingRight: 2
  },
  noteCard: {
    width: width * 0.47,
    height: 100,
    backgroundColor: '#cdcdcd',
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
  iconAppNotes: {
    alignSelf: "center",
    paddingTop: 30,
  }
} );