import React from 'react'
import {View, Text,StatusBar, Image, ScrollView, TouchableOpacity} from 'react-native';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import { useScrollToTop } from '@react-navigation/native';
import { Icon } from 'react-native-eva-icons';
import Runtime from './Runtime';
import Genre from './Genre';

function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();

    return isFocused ? <StatusBar {...props} /> : null;
}

class Items extends React.Component{

    state= {
        recomended : [],
        trendings : [],
        currentUser : [],
        action : [],
        family : [],
        movie : {}
    }


    componentDidMount(){
        let user = firebase.auth().currentUser;
        this.setState({
            currentUser: user.providerData[0]
        })
        this.fetchRecomended();
        this.fetchTrending();
        // this.fetchAnimation();
        // this.fetchFamily();
    }

    fetchRecomended = async() => {
        const url = 'https://api.themoviedb.org/3/discover/movie?api_key=5975c66f617c3f0ffe45de019a9950ce&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1';
        await axios.get(url).then(response => {
            this.setState({
                recomended : response.data.results
            })
        })
             
    }

    

    fetchTrending = async() => {
        const url = 'https://api.themoviedb.org/3/trending/movie/day?api_key=5975c66f617c3f0ffe45de019a9950ce';
        await axios.get(url).then(response => {
            
            this.setState({
                trendings : response.data.results
            })
        })

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

    listMovies = (params, datas) => {
        
        return(
        <View style={{marginTop : 20}}>
            <Text style={{
                fontSize: 20,
                fontWeight: '700',
                paddingVertical: 10,
                marginLeft : 20,
                color : 'rgba(0,0,0,0.8)'
            }}>
                {params}
                                </Text>
            <View style={{ marginBottom : 10 }}>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    {datas.map((data, index) =>

                       
                        <TouchableOpacity style={{
                            width: 154,
                            marginHorizontal: 20,
                            marginBottom : 10,
                            borderRadius: 5
                            }}
                            key={index}
                            onPress={() => this.props.navigation.navigate('Detailmovie',{movietitle : data.id})}
                        >   
                            <View style={{
                                height: 231,
                                width: 154,
                                borderRadius: 5
                            }}>
                                
                                <Image
                                    source={{
                                        uri: `https://image.tmdb.org/t/p/w500${data.poster_path}`
                                    }}

                                    style={{
                                        flex: 1,
                                        width: null,
                                        height: null,
                                        resizeMode: "cover",
                                        borderRadius : 5
                                    }}

                                />
                            </View>
                            <View style={{ position: "absolute", right : 0, backgroundColor : 'rgba(0,0,0,0.5)', borderRadius : 10,  paddingHorizontal : 5, marginRight : 5, marginTop : 5}}>
                                <Text><Runtime id={data.id} /></Text>
                            </View>
                            <View style={{
                                flex: 1,
                                paddingTop: 10,
                                height : 50
                            }}>
                                
                                <Text style={{fontWeight : 'bold'}}>
                                    {((data.title).length > 22) ?
                                        (((data.title).substring(0, 22 - 3)) + '...') :
                                        data.title}
                                </Text>
                                <View style={{width:75, position : "relative"}}>
                                    <View style={{ width: `${(data.vote_average*10)}%`, display: "flex", flexDirection: 'row', overflow: 'hidden', position : "absolute", zIndex : 9 }}>
                                        <Icon name={'star'} width={15} height={15} fill={'#fc8617'} />
                                        <Icon name={'star'} width={15} height={15} fill={'#fc8617'} />
                                        <Icon name={'star'} width={15} height={15} fill={'#fc8617'} />
                                        <Icon name={'star'} width={15} height={15} fill={'#fc8617'} />
                                        <Icon name={'star'} width={15} height={15} fill={'#fc8617'} />
                                    </View>
                                    <View style={{ width: '100%', display: "flex", flexDirection: 'row', overflow: 'hidden',position : "absolute", zIndex : 8}}>
                                        <Icon name={'star-outline'} width={15} height={15} fill={'#e3e3e3'} />
                                        <Icon name={'star-outline'} width={15} height={15} fill={'#e3e3e3'} />
                                        <Icon name={'star-outline'} width={15} height={15} fill={'#e3e3e3'} />
                                        <Icon name={'star-outline'} width={15} height={15} fill={'#e3e3e3'} />
                                        <Icon name={'star-outline'} width={15} height={15} fill={'#e3e3e3'} />
                                    </View>
                                </View>
                            </View>

                        </TouchableOpacity>
                                            
                    )}
                </ScrollView>

            </View>
        </View>
        )
    }

    

    listMoviesHorizontal = (params, datas) => {
        return(
            <View>
                <Text style={{
                    fontSize: 20,
                    fontWeight: '700',
                    marginLeft : 20,
                    color: 'rgba(0,0,0,0.8)'
                }}>{params}</Text>
                <View style={{marginLeft : 20}}>
                    {datas.map((data, index) =>


                        <TouchableOpacity style={{
                            width: 154,
                            marginLeft : 10,
                            marginRight : 30,
                            borderRadius: 5,
                            display : "flex",
                            flexDirection : "row",
                            width : '90%',
                            borderBottomWidth: 0.5,
                            borderColor: '#dedede',
                            paddingVertical : 20,
                            alignItems : 'center'
                        }}
                            key={index}
                            onPress={() => this.props.navigation.navigate('Detailmovie', { movietitle: data.id })}
                        >
                            <View style={{
                                height : 100,
                                width: 92,
                                borderRadius: 5, 
                                paddingRight : 20
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
                                justifyContent : "center"
                            }}>
                                <Text style={{ fontWeight: 'bold' }}>
                                    {((data.title).length > 22) ?
                                        (((data.title).substring(0, 22 - 3)) + '...') :
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
                                        <View style={{width : 200, position : 'absolute'}}>
                                                <Text style={{ padding: 0, margin: 0, color: '#cf1515', fontWeight : 'bold'}}>
                                                Coming Soon
                                            </Text>
                                        </View>
                                    )
                                    
                                   }
                                </View>
                                <View style={{marginTop : 20, width : '80%', flexDirection : "row", flexWrap : "wrap" }}>  
                                    <Genre id={data.id} />
                                </View>
                            </View>

                        </TouchableOpacity>
                    )}
                </View>
            </View>
        )
    }

    render(){
        

        return(
            <View style={{backgroundColor : '#fff', height : '100%', paddingBottom : 100}}>
                <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fff" />
                    <View style={{}}>
                        <View style={{
                            display : 'flex', 
                            flexDirection : 'row', 
                            justifyContent : 'space-between', 
                            alignItems : 'center',
                            width : '100%',
                            paddingVertical : 20,
                            borderBottomWidth : 1,
                            borderColor : '#dedede'
                            }}>
                            <View>
                                <Text style={{ fontSize: 16 , color : 'rgba(0,0,0,0.5)', paddingHorizontal : 20,}}>
                                    Welcome Back
                                </Text>
                            <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'rgba(0,0,0,0.8)', paddingHorizontal: 20}}>
                                    {this.state.currentUser.displayName}
                                </Text>
                            </View>
                            
                        </View>
                        <ScrollView ref={this.props.scrollRef} scrollEventThrottle={16}>
                                {this.listMovies('Recomended for You', this.state.recomended)}
                                {this.listMoviesHorizontal('Trendings', this.state.trendings)}
                                {/* {this.listMovies('For Kids', this.state.action)}
                                {this.listMovies('Family Movies', this.state.family)} */}
                        </ScrollView>
                       
                    </View>
                
            </View>
            // {/* <View style={{flex : 1, alignItems : "center", justifyContent : "center"}}>
            //     <Text>Welcome {this.state.currentUser.displayName}</Text>
            // </View> */}
        )
    }
}

export default function Beranda(props) {
    const ref = React.useRef(null);

    useScrollToTop(ref);

    return <Items {...props} scrollRef={ref} />;
}