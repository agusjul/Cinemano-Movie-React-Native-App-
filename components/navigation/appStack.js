import React, { useState } from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Homescreen from '../home/homeScreen';
import {View, Modal, Text, Button} from 'react-native';
import { Icon } from 'react-native-eva-icons';

const Stack = createStackNavigator();
const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

import Signup from '../start/signup';
import Login from '../start/login';
import OnBoarding from '../start/onBoarding';
import DetailMovie from '../details/DetailMovie';

function Appstack () {
    return (
        <Stack.Navigator headerMode="none" initialRouteName={'Login'}>
            <Stack.Screen name="OnBoarding" component={OnBoarding} />
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Homescreen" component={Homescreen} />
            <Stack.Screen name="Detailmovie" component={DetailMovie} />
        </Stack.Navigator>
    )
}

function ModalScreen({ navigation }) {
    return (
        <View>
            <Modal isVisible={true}>
                <View style={{ flex: 1 }}>
                    <Text>I am the modal content!</Text>
                </View>
            </Modal>
        </View>
    );
}

function RootStackScreen() {

   
    
    const [isLoading, setIsLoading] = useState(false);

    return (
        <RootStack.Navigator mode="modal">
            { (isLoading) ? 
            <RootStack.Screen name="MyModal" component={ModalScreen} /> 
            :
            <RootStack.Screen
                name="Main"
                component={Appstack}
                options={{ headerShown: false }}
            />
            }
        </RootStack.Navigator>
    );
}

export default RootStackScreen;