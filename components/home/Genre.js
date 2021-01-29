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
        genremovie: ''
    }

    componentDidMount() {
        let id = this.props.id
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=5975c66f617c3f0ffe45de019a9950ce&language=en-US`;
        axios.get(url).then(response => {
            this.setState({
                genremovie: response.data.genres
            })
        })

    }
    render() {
        console.log(this.state.genremovie)
        if (this.state.genremovie.length > 0) {
            return (
                <React.Fragment>
                   {this.state.genremovie.map((genre,index)=>
                        <View style={{ paddingHorizontal: 5,backgroundColor : 'rgba(0,0,0,0.1)',flexDirection : "row", display : "flex", borderRadius : 20, margin : 2, flexWrap : "wrap" }}>
                            <Text style={{fontSize : 12}} key={index}>{genre.name}</Text>
                        </View>
                   )}
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <Text style={{ color: 'white', fontSize: 12 }}>Coming Soon</Text>
                </React.Fragment>
            )
        }
    }
}

export default Runtimedata