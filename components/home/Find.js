import React from 'react'
import {View, Text,StatusBar, Image, ScrollView, TouchableOpacity, TextInput} from 'react-native';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import { useScrollToTop } from '@react-navigation/native';
import Genre from '../home/Genre';
import Runtime from '../home/Runtime';
import { Icon } from 'react-native-eva-icons';

function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();

    return isFocused ? <StatusBar {...props} /> : null;
}

class Items extends React.Component{

    state= {
        recomended : [],
        trendings : [],
        currentUser : [] ,
        action : [],
        family : []
    }

    componentDidMount(){
        let user = firebase.auth().currentUser;
        this.setState({
            currentUser: user.providerData[0]
        })
         this.fetchAnimation();
        this.fetchFamily();
    }


 
     fetchAnimation = async() => {
        const url = 'https://api.themoviedb.org/3/discover/movie?api_key=5975c66f617c3f0ffe45de019a9950ce&with_genres=16';
        await axios.get(url).then(response => {
            
            this.setState({
                action : response.data.results
            })
        })

    }

    fetchFamily = async() => {
        const url = 'https://api.themoviedb.org/3/discover/movie?api_key=5975c66f617c3f0ffe45de019a9950ce&with_genres=10751';
        await axios.get(url).then(response => {
            
            this.setState({
                family : response.data.results
            })
        })

    }

    toDetailScreen = () =>{
        this.props.navigation.navigate('Detailmovie')
    }


    listMoviesHorizontal = (datas) => {
        return (
            <View style={{paddingHorizontal : 15}}>
                <View style={{ flexDirection : "row", flexWrap : 'wrap', justifyContent : 'space-around' }}>
                    {datas.map((data, index) =>


                        <TouchableOpacity style={{
                            width : 80,
                           
                            borderRadius: 5,
                            display: "flex",
                            paddingVertical: 20,
                            height : 150,
                            marginBottom : 20
                        }}
                            key={index}
                            onPress={() => this.props.navigation.navigate('Detailmovie', { movietitle: data.id })}
                        >
                            <View style={{
                                height: 100,
                                width: 92,
                                borderRadius: 5,
                                paddingRight: 20
                            }}>

                                <Image
                                    source={{
                                        uri: `https://image.tmdb.org/t/p/w154${data.poster_path}`
                                    }}

                                    style={{
                                        flex: 1,
                                        width: null,
                                        height: null,
                                        resizeMode: "cover",
                                        borderRadius: 5
                                    }}

                                />
                            </View>
                            <View style={{
                                paddingTop: 10,
                                height: 100,
                            }}>
                                <Text style={{ fontWeight: 'bold', fontSize : 12 }}>
                                    {((data.title).length > 12) ?
                                        (((data.title).substring(0, 12 - 3)) + '...') :
                                        data.title}
                                </Text>
                                <View style={{ width: 75, position: "relative" }}>
                                    {(data.vote_average > 0) ?

                                        (

                                            <View>
                                                <View style={{ width: `${(data.vote_average * 10)}%`, display: "flex", flexDirection: 'row', overflow: 'hidden', position: "absolute", zIndex: 9 }}>
                                                    <Icon name={'star'} width={15} height={15} fill={'#fc8617'} />
                                                    <Icon name={'star'} width={15} height={15} fill={'#fc8617'} />
                                                    <Icon name={'star'} width={15} height={15} fill={'#fc8617'} />
                                                    <Icon name={'star'} width={15} height={15} fill={'#fc8617'} />
                                                    <Icon name={'star'} width={15} height={15} fill={'#fc8617'} />
                                                </View>
                                                <View style={{ width: '100%', display: "flex", flexDirection: 'row', overflow: 'hidden', position: "absolute", zIndex: 8 }}>
                                                    <Icon name={'star-outline'} width={15} height={15} fill={'#e3e3e3'} />
                                                    <Icon name={'star-outline'} width={15} height={15} fill={'#e3e3e3'} />
                                                    <Icon name={'star-outline'} width={15} height={15} fill={'#e3e3e3'} />
                                                    <Icon name={'star-outline'} width={15} height={15} fill={'#e3e3e3'} />
                                                    <Icon name={'star-outline'} width={15} height={15} fill={'#e3e3e3'} />
                                                </View>
                                            </View>
                                        )
                                        :

                                        (
                                            <View style={{ width: 200, position: 'absolute' }}>
                                                <Text style={{ padding: 0, margin: 0, color: '#cf1515', fontWeight: 'bold' }}>
                                                    Coming Soon
                                            </Text>
                                            </View>
                                        )

                                    }
                                </View>
                                {/* <View style={{ marginTop: 20, width: '80%', flexDirection: "row", flexWrap: "wrap" }}>
                                    <Genre id={data.id} />
                                </View> */}
                            </View>

                        </TouchableOpacity>
                    )}
                </View>
            </View>
        )
    }

    render(){
        

        return(
            <View style={{backgroundColor : '#fff', height : '100%', paddingBottom : 70}}>
                <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fff" />
                    <View style={{}}>
                    <View style={{
                        borderBottomWidth: 1,
                        borderColor: '#dedede',
                        paddingBottom : 20}}>
                            <Text style={{marginTop : 20, fontWeight : "bold", fontSize : 20, paddingLeft : 20}}> Find Your Best Movies</Text>
                       
                        </View>
                        <View style={{ flexDirection: "row", marginVertical : 20, justifyContent: "center", width: '100%' }}>
                            <View style={{ height: 40, width: '70%', borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }}>
                                <TextInput
                                    style={{
                                        borderColor: '#dedede',
                                        borderWidth: 0.5
                                    }}
                                />
                            </View>
                            <View style={{ backgroundColor: '#dedede', height: 40, width: 40, justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 5, borderBottomRightRadius: 5 }}>
                                <Icon name='search-outline' fill="white" width={24} height={24} />
                            </View>
                        </View>
                        <ScrollView ref={this.props.scrollRef} horizontal={false}>
                            <View style={{paddingBottom : 80}}>
                                {this.listMoviesHorizontal(this.state.action)}
                                {this.listMoviesHorizontal(this.state.family)}
                            </View>
                                
                              
                        </ScrollView>
                       
                    </View>
                
            </View>
        )
    }
}

export default function Beranda(props) {
    const ref = React.useRef(null);

    useScrollToTop(ref);

    return <Items {...props} scrollRef={ref} />;
}