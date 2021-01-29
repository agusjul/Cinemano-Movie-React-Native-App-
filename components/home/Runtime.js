import React from 'react'
import { View, Text, StatusBar, Image, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import { useScrollToTop } from '@react-navigation/native';
import { Icon } from 'react-native-eva-icons';


class Runtimedata extends React.Component {

    state = {
        runtimemovie : ''
    }

    componentDidMount(){
        let id = this.props.id
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=5975c66f617c3f0ffe45de019a9950ce&language=en-US`;
        axios.get(url).then(response => {
           this.setState({
                runtimemovie : response.data.runtime
           })
        })
        
    }
    render(){
        if(this.state.runtimemovie > 0){
        return(
                <React.Fragment>
                 <Text style={{color: 'white', fontSize : 12}}>{this.state.runtimemovie} m</Text>
                </React.Fragment>
        )}else{
            return(
                <React.Fragment>
                    <Text style={{ color: 'white', fontSize: 12 }}>Coming Soon</Text>
                </React.Fragment>
            )
        }
    }
}

export default Runtimedata