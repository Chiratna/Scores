import { StyleSheet} from 'react-native';
import React, { ReactNode } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../screens/home';
import LeagueTable from '../../screens/league-table';

const Tab = createBottomTabNavigator();
interface Props{
    children : ReactNode
}
const HomeScreenWrapper = () => {
  return (
    <Tab.Navigator screenOptions={{headerStyle : styles.appbar, headerTitleStyle : styles.appbar_title, headerTintColor : 'white', tabBarStyle: styles.bottom_bar, tabBarActiveTintColor : '#395B64', tabBarInactiveTintColor : '#E7F6F2', tabBarLabelStyle: styles.tab_bar_lable,}}>
        <Tab.Screen name='Home' component={Home}/>
        <Tab.Screen name='Table' component={LeagueTable}/>
    </Tab.Navigator>
  )
}

export default HomeScreenWrapper

const styles = StyleSheet.create({
    appbar : {
      backgroundColor : 'black',
      shadowColor : 'transparent'
    },
    appbar_title : {
      fontFamily : 'Poppins_700Bold',
      fontSize : 20,
      fontWeight : '700',
      color : 'white',
    },
    bottom_bar : {
        backgroundColor : '#A5C9CA'
    },

    tab_bar_lable : {
      fontFamily : 'Poppins_700Bold',
      fontSize : 16,
    }

  });
  