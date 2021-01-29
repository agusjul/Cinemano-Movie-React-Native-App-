import React from 'react';
import {Button, View, Text, StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import { Icon } from 'react-native-eva-icons';

import Beranda from './Beranda';
import Collection from './Collection';
import Find from './Find';
import Profile from './Profile';
import About from '../profiledetails/Aboutscreen';

const Tab = createBottomTabNavigator();




class Homescreen extends React.Component {

    render(){
        
        return(
            
           
                <Tab.Navigator
                screenOptions={({ route }) => ({

                    tabBarIcon: ({ focused, color }) => {
                        let iconName;

                        if (route.name === 'Beranda') {
                            iconName = focused
                                ? 'home'
                                : 'home-outline';
                        }
                        else if (route.name === 'Collection') {
                            iconName = focused ? 'layers' : 'layers-outline';
                        } else if (route.name === 'Profile') {
                            iconName = focused ? 'person' : 'person-outline';
                        }
                        else if (route.name === 'Find') {
                            iconName = focused ? 'search' : 'search-outline';
                        }


                        return (<Icon name={iconName} width={24} height={24} fill={color} />)
                    }
                    })}
                tabBarOptions={{
                    activeTintColor: '#598bff',
                    inactiveTintColor: 'gray',
                    showLabel: false,
                    height : 70
                }}

                >
                    <Tab.Screen name="Beranda" component={Beranda} />
                    <Tab.Screen name="Find" component={Find} />
                    <Tab.Screen name="Profile" component={About} />
                </Tab.Navigator>

        )
    }
}

export default Homescreen;