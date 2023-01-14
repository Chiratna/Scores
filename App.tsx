import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/home';
import { HOME, MATCH_DETAIL } from './src/constants/routes';
import { useFonts,Poppins_400Regular, Poppins_600SemiBold, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { QueryClient, QueryClientProvider } from 'react-query';
import MatchDetails from './src/screens/match_details';
import { Goals } from './src/utils/types';
import HomeScreenWrapper from './src/components/Layout/HomeScreenWrapper';
import { MenuProvider } from 'react-native-popup-menu';

export type AppStackParams = {
  HOME : undefined
  MATCH_DETAILS : {matchId : string, teams : Goals, goals : Goals, venue : string, date : string};
}

const Stack = createNativeStackNavigator()



export default function App() {

const queryClient = new QueryClient()

  let [fontsLoaded] = useFonts({
    Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <MenuProvider>
      <NavigationContainer>
      <Stack.Navigator screenOptions={{headerStyle : styles.appbar,  headerTitleStyle : styles.appbar_title, headerTintColor : 'white'}}>
        <Stack.Screen name={HOME} component={HomeScreenWrapper} options={{title : 'Home', headerShown : false}} />
        <Stack.Screen name={MATCH_DETAIL} component={MatchDetails} options={{title : 'Match Details'}} />
      </Stack.Navigator>
    </NavigationContainer>
      </MenuProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  appbar : {
    backgroundColor : 'black'
  },
  appbar_title : {
    fontFamily : 'Poppins_700Bold',
    fontSize : 20,
    fontWeight : '700',
    color : 'white',
  }
});
