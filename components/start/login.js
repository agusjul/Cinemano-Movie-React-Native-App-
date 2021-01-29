import React, { Component } from 'react';
import { Text, View, TextInput , StatusBar, TouchableOpacity, Alert, Keyboard, ActivityIndicator} from 'react-native';
import { Icon } from 'react-native-eva-icons';

import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';



export default class Login extends Component {
    constructor(){
        super()
        this.state = {
            email: '',
            password: '',
            isLoading : false
        }

    }
    
    // static contextType = AuthContext;

    changeEmail = (n) => {
        const { text } = n;
        let word = text;
        this.setState({
            email : word
        })
    }

    changePassword = (n) => {
        const { text } = n;
        let word = text;
        this.setState({
            password: word
        })
    }

    signInButton = () =>{
        Keyboard.dismiss();
        this.props.navigation.navigate('Main', {isLoading : 'true'})
        if (this.state.email === '' && this.state.password === '') {
            Alert.alert('Enter details to signin!')
        } else {
            this.setState({
                isLoading: true,
            })
            firebase
                .auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password)
                .then((res) => {
                    console.log(res)
                    console.log('User logged-in successfully!')
                    this.props.navigation.navigate('Homescreen')
                    this.setState({
                        isLoading: false,
                        email: '',
                        password: ''
                    })
                    
                })
                .catch(error => this.setState({ errorMessage: error.message }))
        }
    }

    

    alert = () =>{
        Alert.alert(
            "Alert Title",
            "My Alert Msg",
            [
                {
                    text: "Ask me later",
                    onPress: () => console.log("Ask me later pressed")
                },
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
        );
        
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    position: 'absolute',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#fff',
                    display : 'flex',
                    flexDirection : 'row'
                }}>
                    <ActivityIndicator size="large" color="#1A80AB" />
                    <Text style={{fontSize : 18, fontWeight : 'bold', margin : 5}}>Logining...</Text>
                </View>
            )
        }  
        
        return (
            <View style={{flex : 1, justifyContent : "center"}}>
                <StatusBar barStyle="dark-content" backgroundColor="#f7f9fc"
                />
                <Text style={{fontSize : 36, fontWeight : 'bold', paddingHorizontal :  30, marginBottom :  40}}>
                  {'Selamat Datang \ndi Cinemano'}
                </Text>
                <View style={{paddingHorizontal : 36}}>
                    <View style={{marginBottom : 30}}>
                        <Text style={{fontSize : 16, marginBottom : 2}}>Email</Text>
                        <TextInput 
                            onChangeText={text => this.changeEmail({ text })}
                            value={this.state.email}
                            keyboardType ={"email-address"}
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={{ 
                            borderColor: 'gray',
                             borderWidth: 1,
                             borderRadius : 4,
                             height : 45,
                            
                             }} />
                    </View>
                    <View style={{marginBottom : 30}}>
                        <Text style={{ fontSize: 16, marginBottom: 2}}>Password</Text>
                        <TextInput 
                            onChangeText={text => this.changePassword({ text })}
                            value={this.state.password}
                            secureTextEntry={true}
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={{ 
                            borderColor: 'gray', 
                            borderWidth: 1 ,
                            borderRadius: 4,
                            height: 45
                            }} />
                    </View>
                    <TouchableOpacity 
                        onPress={()=> this.signInButton()}
                        style={{
                            height : 45,
                            backgroundColor: '#8282bf',
                            display : 'flex',
                            flexDirection : "row",
                            justifyContent : 'space-between',
                            paddingHorizontal : 20,
                            alignItems : 'center',
                            borderRadius : 4,
                            marginBottom : 30
                        }}
                        >
                        <Text
                            style={{
                                color : 'white',
                                fontWeight : "bold",
                                fontSize : 16
                            }}
                            >Sign in</Text>
                        <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius : 20}}> 
                            <Icon name='arrow-ios-forward-outline' fill="white" width={24} height={24}  />
                        </View>
                    </TouchableOpacity>
                    <Text>
                        Don't have account ? 
                        <Text onPress={() => this.props.navigation.navigate('Signup')}
                            style={{
                                fontWeight : "bold",
                                color: '#8282bf',
                                
                            }}
                        >
                           {' Sign up'}
                        </Text>
                    </Text>
                </View>
            </View>
        )
    }
};
