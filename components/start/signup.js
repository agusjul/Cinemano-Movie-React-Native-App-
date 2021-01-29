import React, { Component, useContext } from 'react';
import { Text, View, TextInput, StatusBar, TouchableOpacity, Keyboard, Alert, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

export default class Signup extends Component {

   constructor(){
       super();
       this.state = {
           email: '',
           password: '',
           name: '',
           isLoading : false
       }
   }
    
    changeEmail = (n) => {
        const { text } = n;
        let word = text;
        this.setState({
            email: word
        })
    }

    changeName = (n) => {
        const { text } = n;
        let word = text;
        this.setState({
            name: word
        })
    }

    changePassword = (n) => {
        const { text } = n;
        let word = text;
        this.setState({
            password: word
        })
    }

    signUpButton = () => {
        Keyboard.dismiss()
        if (this.state.email === '' && this.state.password === '') {
            Alert.alert('Enter details to signup!')
        } else {
            this.setState({
                isLoading: true,
            })
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then((res) => {
                    res.user.updateProfile({
                        displayName: this.state.name
                    })
                    console.log('User registered successfully!')
                    this.setState({
                        isLoading: false,
                        displayName: '',
                        email: '',
                        password: ''
                    })
                    this.props.navigation.navigate('Login')
                })
                .catch(error => this.setState({ errorMessage: error.message }))
        }
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
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                    <ActivityIndicator size="large" color="#1A80AB" />
                    <Text style={{ fontSize: 18, fontWeight: 'bold', margin: 5 }}>Creating Account...</Text>
                </View>
            )
        }  

        return (
            <View style={{ flex: 1, justifyContent: "center" }}>
                <StatusBar barStyle="dark-content" backgroundColor="#f7f9fc"
                />
                <Text style={{ fontSize: 36, fontWeight: 'bold', paddingHorizontal: 30, marginBottom: 40 }}>
                    {'Membuat Akun \ndi Cinemano'}
                </Text>
                <View style={{ paddingHorizontal: 36 }}>
                    <View style={{ marginBottom: 30 }}>
                        <Text style={{ fontSize: 16, marginBottom: 2 }}>Email</Text>
                        <TextInput
                            onChangeText={text => this.changeEmail({ text })}
                            value={this.state.email}
                            keyboardType={"email-address"}
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={{
                            borderColor: 'gray',
                            borderWidth: 1,
                            borderRadius: 4,
                            height: 45
                        }} />
                    </View>
                    <View style={{ marginBottom: 30 }}>
                        <Text style={{ fontSize: 16, marginBottom: 2 }}>Name</Text>
                        <TextInput 
                            onChangeText={text => this.changeName({ text })}
                            value={this.state.name}
                            style={{
                            borderColor: 'gray',
                            borderWidth: 1,
                            borderRadius: 4,
                            height: 45
                        }} />
                    </View>
                    <View style={{ marginBottom: 30 }}>
                        <Text style={{ fontSize: 16, marginBottom: 2 }}>Password</Text>
                        <TextInput
                            onChangeText={text => this.changePassword({ text })}
                            value={this.state.password}
                            secureTextEntry={true}
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={{
                            borderColor: 'gray',
                            borderWidth: 1,
                            borderRadius: 4,
                            height: 45
                        }} />
                    </View>
                    <TouchableOpacity
                        onPress={()=>this.signUpButton()}
                        style={{
                            height: 45,
                            backgroundColor: '#8282bf',
                            display: 'flex',
                            flexDirection: "row",
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            alignItems: 'center',
                            borderRadius: 4,
                            marginBottom: 10
                        }}
                    >
                        <Text
                            style={{
                                color: 'white',
                                fontWeight: "bold",
                                fontSize: 16
                            }}
                        >Create Account</Text>
                        <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 20 }}>
                            <Icon name='arrow-ios-forward-outline' fill="white" width={24} height={24} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.goBack()}
                        style={{
                            height: 45,
                            backgroundColor: 'rgba(255, 255, 255, 0.5)',
                            borderColor: '#8282bf',
                            borderWidth : 2,
                            display: 'flex',
                            flexDirection: "row",
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            alignItems: 'center',
                            borderRadius: 4,
                            marginBottom: 30,
                            borderColor: '#8282bf'
                        }}
                    >
                        <Text
                            style={{
                                color: '#8282bf',
                                fontWeight: "bold",
                                fontSize: 16
                            }}
                        >Cancel</Text>
                        
                    </TouchableOpacity>
                    
                </View>
            </View>
        )
    }
};