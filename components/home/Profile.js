import React from 'react'
import { View, Text, Button, StatusBar, ScrollView, TouchableOpacity } from 'react-native';

import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import { Icon } from 'react-native-eva-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useIsFocused } from '@react-navigation/native';
import ProfileDetailsScreen from '../profiledetails/Profiledetails';
import AboutScreen from '../profiledetails/Aboutscreen';

function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();

    return isFocused ? <StatusBar {...props} /> : null;
}

const Tab = createMaterialTopTabNavigator();

class Beranda extends React.Component {
    state = {
        currentUser: []
    }

    componentDidMount() {
        let user = firebase.auth().currentUser;
        this.setState({
            currentUser: user.providerData[0]
        })

    }

    logOut = () => {
        firebase.auth().signOut().then(() => {
            this.props.navigation.navigate('Login')
        })
    }

    render() {
        return (
             <View>
                <FocusAwareStatusBar barStyle="white-content" backgroundColor="white" />
                <View style={{ 
                        backgroundColor: "#333951",
                        height : 200,
                        }}>
                    <View style={{ height: 80, width: '100%', paddingTop: 20, paddingRight: 20, display: 'flex', alignItems: 'flex-end' }}>
                        <Icon name={'settings-2-outline'} width={24} height={24} fill={'rgba(255, 255, 255, 0.9)'} />
                    </View>
                </View>
                <View style={{
                        backgroundColor : '#fff',
                        width : '100%',
                        borderTopLeftRadius : 20,
                        borderTopRightRadius : 20,
                        marginTop : -20
                        }}>
                    <View style={{
                            display : "flex",
                            justifyContent : 'center',
                            alignItems : 'center',
                            marginTop : -65
                            }}>
                        <View style={{ 
                                height: 130, 
                                width: 130, 
                                backgroundColor: '#333951', 
                                borderRadius: 200, 
                                marginBottom: 10, 
                                borderColor: '#fff', 
                                borderWidth: 2 
                                }}>
                        </View>
                    </View>
                    <View style={{
                        display: "flex",
                        justifyContent: 'center',
                        alignItems: 'center',
                            }}>
                        <Text style={{
                            fontSize: 24,
                            fontWeight: "bold",
                            color: "rgba(51, 57, 81, 0.9)",
                        }}>
                            {this.state.currentUser.displayName}
                        </Text>
                        <Text style={{
                            fontSize: 16,
                            color: "rgba(51, 57, 81, 0.5)"
                        }}>
                            {this.state.currentUser.email}
                        </Text>
                      
                    </View>
                    <View style={{height : 300}}>
                        
                    </View>
                </View>            
            </View>
        )
    }
}

export default Beranda;