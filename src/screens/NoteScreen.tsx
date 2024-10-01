
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Alert, Dimensions, KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import { RootStackParamList } from '../navigators/StackNavigators';
import { Button, TextInput, } from 'react-native-paper';
import { findNoteById, Note, removeNote, updateNoteContent, updateNoteTitle } from '../context/notesStore';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { Toolbar, useEditorBridge, RichText } from '@10play/tentap-editor';
import { debounce } from 'lodash';


const { width } = Dimensions.get( "window" );
export const NoteScreen = () => {

  const params = useRoute<RouteProp<RootStackParamList, "NoteScreen">>().params;
  const navigation = useNavigation();
  const note: Note | undefined = findNoteById( params.id );
  const [ title, setTitle ] = useState( note?.title || "" );
  const [ content, setContent ] = useState( note?.content || "" );

  const handleUpdateNoteContent = useCallback( debounce( async () => {//oara que no se llame constantemente
    if ( note ) {
      const editorContent = await editor.getHTML();
      setContent( editorContent );
      updateNoteContent( note.id, editorContent );
    }
  }, 600 ), [ note ] );
  const handleRemoveNote = () => {
    removeNote( params.id );

    if ( navigation.canGoBack() ) {
      navigation.goBack();
    }

  };
  const handleError = ( message: string ) => {
    console.error( message );
    navigation.goBack();
  };

  const editor = useEditorBridge( {
    autofocus: false,
    avoidIosKeyboard: true,
    initialContent: content,
    onChange: async () => {
      if ( note != undefined ) {
        await handleUpdateNoteContent();
      }
    },
  } );

  useLayoutEffect( () => {
    if ( !note ) {
      handleError( "no note found" );
      if(navigation.canGoBack()){
        navigation.goBack();
      }
      return;
    }
    navigation.setOptions( {
      headerTitle: () => (
        <TextInput
          value={ title }
          onChangeText={ setTitle }
          style={ { color: 'black', fontSize: 20, width: width * 0.7, backgroundColor: "transparent", borderWidth: 0, borderBottomWidth: 0 } }
          placeholder="Write title"
          underlineColor="transparent"
          underlineStyle={ { height: 0 } }
        />
      ),
    } );
    if ( note != undefined ) {
      updateNoteTitle( note.id, title );
    }

  }, [ navigation, note, title ] );


  useEffect( () => {//si o si un titulo
    const unsubscribe = navigation.addListener( 'beforeRemove', ( e ) => {
      if ( title === "" && content === "" && navigation.canGoBack() ) {
        removeNote( params.id );
      }
    } );
    return unsubscribe;
    // Limpieza del listener
  }, [ title ] );


  return (
    <View style={ { flex: 1 } }>
      {/* <Text style={ { color: "black" } }>{ params.id }</Text> */ }
      <RichText editor={ editor } />

      <KeyboardAvoidingView
        behavior={ Platform.OS === 'ios' ? 'padding' : undefined }
        style={ {
          position: 'absolute',
          width: '100%',
          bottom: 0,
        } }
      >
        <Button
          mode="contained"
          onPress={ () => handleRemoveNote() }
          style={ { width: 10, height: 40, alignSelf: "flex-end", margin: 10 } }
        > -</Button>
        {/* //icono basurero */ }
        <Toolbar editor={ editor } />

      </KeyboardAvoidingView>

    </View >
  );
};
