import { NativeBaseProvider, StatusBar } from 'native-base';
import { Login } from './src/screens/Login';
import { SafeAreaView } from 'react-native';
import { Home } from './src/screens/Home';
import { Loading } from './src/components/Loading';
import { THEME } from './src/styles/theme';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import { Maps } from './src/components/Maps';
export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <Home /> : <Loading />}
    </NativeBaseProvider>
  );
}
