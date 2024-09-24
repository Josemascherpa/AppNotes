/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import { AppNotes } from './src/AppNotes';
import 'react-native-gesture-handler';



AppRegistry.registerComponent(appName, () => AppNotes  );
