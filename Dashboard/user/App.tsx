import { StatusBar } from 'expo-status-bar';
import AuthNavigator from './navigation/AuthNavigator';

import './global.css';

export default function App() {
  return (
    <>
      <AuthNavigator />
      <StatusBar style="auto" />
    </>
  );
}
