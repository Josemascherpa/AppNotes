import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Dimensions, KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native';
import { RootStackParamList } from '../navigators/StackNavigators';
import { TextInput } from 'react-native-paper';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';
import { addNote, getNotes, removeNote, updateNote } from '../context/notesStore';
import { globalColors } from '../themes/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import { RichEditor, RichToolbar } from 'react-native-pell-rich-editor';

const { width } = Dimensions.get("window");

export const NoteScreen = () => {
  const params = useRoute<RouteProp<RootStackParamList, "NoteScreen">>().params;
  const navigation = useNavigation();
  const [title, setTitle] = useState(params.title || "");
  const [isNewNote, setIsNewNote] = useState<boolean>(false);
  const [content, setContent] = useState(params.content || "");
  const [newId, setId] = useState(params.id);

  const editorRef = useRef<RichEditor>(null);

  const handleUpdateNoteContent = useCallback(debounce(async (id: string = newId) => {
    await updateNote(params.userId, id, title, content);
  }, 100), [title, content]);

  const handleRemoveNote = async () => {
    await removeNote(params.userId, params.id);
    navigation.goBack();
  };

  useEffect(() => {
    if (title === "") {
      setIsNewNote(true);
    }
  }, []);

  useEffect(() => {
    const updateOrAddNote = async () => {
      if (title !== "" && isNewNote) {
        setIsNewNote(false);
        await addNote(params.userId, title, content);
        const newId = await getNotes(params.userId);
        setId(newId[newId.length - 1]._id);
      } else if (!isNewNote && title !== "") {
        await handleUpdateNoteContent(newId);
      }
    };
    updateOrAddNote();
  }, [title, content]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <TextInput
          value={title}
          onChangeText={setTitle}
          style={{ fontSize: 20, width: width * 0.7, backgroundColor: "transparent", borderWidth: 0, borderBottomWidth: 0 }}
          textColor="#cdcdcd"
          placeholder="Write title"
          placeholderTextColor="#cdcdcd"
          underlineColor="transparent"
          underlineStyle={{ height: 0 }}
        />
      ),
      headerStyle: {
        backgroundColor: globalColors.backgroundColor
      },
      headerTintColor: "#cdcdcd",
    });
  }, [navigation, title]);

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView 
          style={{ flex: 1 }} 
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <RichEditor
            ref={editorRef}
            initialContentHTML={content}
            placeholder="Write something here..."
            onChange={setContent}
            editorStyle={{ backgroundColor: globalColors.backgroundColor }}
            style={{ flex: 1 }}
          />
          {title !== "" && (
            <Pressable
              onPress={async () => await handleRemoveNote()}
              style={{
                width: 52,
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#cdcdcd",
                borderRadius: 25,
                position: "absolute",
                bottom: 48,
                right: 20,
              }}
            >
              <Icon name="trash-outline" size={25} color="black" style={{ alignSelf: "center", paddingRight: 2 }} />
            </Pressable>
          )}
        </ScrollView>
        <RichToolbar editor={editorRef} />
      </KeyboardAvoidingView>
    </View>
  );
};
