import React from 'react';
import {View, Text, Image, TouchableOpacity, ImageBackground, StatusBar, Platform, ScrollView} from 'react-native';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import { Icon } from 'react-native-eva-icons';
import Genre from '../home/Genre';
import Runtime from '../home/Runtime'

function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();

    return isFocused ? <StatusBar {...props} /> : null;
}

class DetailMovie extends React.Component {

    state = {
        movieid : this.props.route.params.movietitle,
        data : []
    }

    componentDidMount(){
        this.fetchDetails()
    }

    fetchDetails = async() => {
        const url = `https://api.themoviedb.org/3/movie/${this.state.movieid}?api_key=5975c66f617c3f0ffe45de019a9950ce&language=en-US`;
        await axios.get(url).then(response => {
            this.setState({
                data : response.data
            })
            console.log(this.state.data)
        })
    }

    dataDetails = (id)=> {
        if(id){
            return(
                id.map((prod, index)=>
                    <View key={index}>
                        <Text style={{fontSize : 16}}>- {prod.name}</Text>
                    </View>
                 )
            )
        } else {
            return(
                null
            )
        }
    }

    render(){
        const { navigation } = this.props;
        return(
            <View style={{flex :1 }}>
                <FocusAwareStatusBar barStyle="light-content" backgroundColor="transparent" translucent={true}/>
                <ImageBackground 
                    blurRadius={Platform.OS == 'ios' ? 10 : 2} 
                    source={{uri: `https://image.tmdb.org/t/p/w500${this.state.data.poster_path}`}} 
                    style={{ flex: 1, resizeMode: "cover",}}
                    >
                    <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={{position : 'absolute', top : 40, left : 10, padding : 5,flexDirection : 'row'}}>
                        <Icon name='arrow-ios-back-outline' fill="white" width={24} height={24} />
                        <Text style={{fontWeight : "bold", fontSize : 16, color : 'white'}}>Back</Text>
                    </TouchableOpacity>
                    <View style={{width : '100%', height : '100%', justifyContent : 'flex-end'}}>
                        <View style={{width: '100%', height: '80%', backgroundColor: 'white', borderTopLeftRadius: 20,
                            borderTopRightRadius: 20}}>
                            
                            <View style={{
                                height: 170,
                                width: 120,
                                borderRadius: 5,
                                position : "absolute",
                                top : -40,
                                marginLeft : 20
                            }}>

                                <Image
                                    source={{
                                        uri: `https://image.tmdb.org/t/p/w500${this.state.data.poster_path}`
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
                            <View style={{ marginLeft: 150, marginTop : 20 }}>
                                <Text style={{fontWeight : "bold", fontSize : 18, marginBottom : 10}}>{this.state.data.title}</Text>
                               <View style={{width : '100%', justifyContent : 'space-between'}}>
                                    <View style={{ width: 75, position: "relative", marginBottom: 5 }}>
                                        <View style={{ width: `${(this.state.data.vote_average * 10)}%`, display: "flex", flexDirection: 'row', overflow: 'hidden', position: "absolute", zIndex: 9 }}>
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
                                    <View style={{ position: 'absolute', right: 20, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 10, paddingHorizontal: 5, marginRight: 5, marginTop: 5}}>
                                        <Text><Runtime id={this.state.movieid} /></Text>
                                    </View>
                               </View>
                                <View style={{ marginTop: 20, width: '100%', flexDirection: "row", flexWrap: "wrap" }}>
                                    <Genre id={this.state.movieid} />
                                </View>
                            </View>
                           <View style={{marginTop : 50, marginLeft : 20}}>
                               <View>
                                    <Text style={{ borderBottomWidth: 2, width: 110, fontWeight: 'bold', fontSize: 18, color: '#4878FF', borderBottomColor: '#4878FF' }}>About Movie</Text>
                               </View>
                               <View style={{marginTop : 20}}>
                               
                                    <View style={{paddingRight : 20}}>
                                        <Text style={{fontWeight : 'bold', fontSize : 16}}>Overview</Text>
                                        <Text style={{fontSize : 16}}>{this.state.data.overview}</Text>
                                    </View>
                                    <View style={{ paddingRight: 20, marginTop : 20 }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Diproduksi Oleh</Text>
                                        {this.dataDetails(this.state.data.production_companies)}
                                    </View>
                                    <View style={{ paddingRight: 20, marginTop: 20 }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Bahasa</Text>
                                        {this.dataDetails(this.state.data.spoken_languages)}
                                    </View>
                               </View>
                           </View>
                        </View>
                    </View>

               </ImageBackground>
            </View>
        )
    }
}

export default DetailMovie;


{/* <View  style={{
                    height : 300,
                    width : '100%'
                }}>
                    <Image 
                        source={{ 
                            uri: `https://image.tmdb.org/t/p/w500${this.state.data.poster_path}` 
                        }} 
                        style={{ 
                            flex : 1,
                            width: null,
                            height: null,
                            resizeMode: "cover",
                        }}

                        />
                </View>
                <View 
                    style={{
                        marginTop : -40,
                        borderTopRightRadius : 40,
                        borderTopLeftRadius : 40,
                        backgroundColor : '#fff',
                        width : '100%',
                        height : '100%',
                        paddingTop : 40,
                        paddingHorizontal : 20
                    }}
                >   

                    <View>
                        
                        <Text style={{ fontSize: 28, fontWeight: "bold" }}>
                            {this.state.data.title}
                        </Text>
                        <Text style={{ fontSize: 14, color: '#FC6917', fontWeight: "bold", opacity: 0.7 }}>
                Rating : {this.state.data.vote_average}
                        </Text>
                    </View>
                    <View>
                        <Text style={{fontWeight: 'bold', color : '#121212', opacity : 0.3}}>{this.state.data.release_date}</Text>    
                    </View>
                    <View style={{marginTop : 20}}>
                        <Text>
                            {this.state.data.overview}
                        </Text>
                    </View>
                     <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={{marginTop : 20, padding : 5, backgroundColor : '#FC6917', display : 'flex' , justifyContent : 'center', alignItems : 'center', borderRadius : 10}}>
                            <Text style={{fontSize : 18, color : '#fff', fontWeight : 'bold'}}>Back</Text>
                    </TouchableOpacity>
                </View> */}