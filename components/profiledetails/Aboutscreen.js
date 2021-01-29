import * as React from 'react';
import { ScrollView, Text, View, Image, Animated, StatusBar, TouchableOpacity } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';

import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import { useIsFocused } from '@react-navigation/native';

function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();

    return isFocused ? <StatusBar {...props} /> : null;
}


const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 70;
const PROFILE_IMAGE_MAX_HEIGHT = 80;
const PROFILE_IMAGE_MIN_HEIGHT = 40;

class Albums extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            scrollY : new Animated.Value(0),
            currentUser : []
        }
    }

    componentDidMount(){
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

        const headerHeight = this.state.scrollY.interpolate({
            inputRange : [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
            outputRange : [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
            extrapolate : 'clamp'
        })
        const profileHeight = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
            outputRange: [PROFILE_IMAGE_MAX_HEIGHT, PROFILE_IMAGE_MIN_HEIGHT],
            extrapolate: 'clamp'
        })
        const profileImageMarginTop = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
            outputRange: [(HEADER_MAX_HEIGHT)- (PROFILE_IMAGE_MAX_HEIGHT/2),
            HEADER_MAX_HEIGHT + 5],
            extrapolate: 'clamp'
        })
        const headerZIndex = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 80],
            outputRange: [0,1],
            extrapolate: 'clamp'
        })
        const headerTitleBottom = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
            HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_IMAGE_MIN_HEIGHT,
            HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_IMAGE_MIN_HEIGHT + 30
            ],
            outputRange: [-20, -20 , -20, 20],
            extrapolate: 'clamp'
        })

        return (
            <View style={{backgroundColor : '#fff', paddingHorizontal : 20}}>
                <FocusAwareStatusBar barStyle="white-content" backgroundColor="lightskyblue" />
                <Animated.View style={{
                    position :"absolute",
                    top :0,
                    right : 0,
                    left :0,
                    backgroundColor : 'lightskyblue',
                    height : headerHeight,
                    zIndex : headerZIndex,
                    alignItems : 'center'
                }}>
                    <Animated.View style={{position : "absolute", bottom : headerTitleBottom}}>
                        <Text style={{fontSize : 14, fontWeight : 'bold', color : '#fff'}}>{this.state.currentUser.displayName}</Text>
                    </Animated.View>

                </Animated.View>
                <ScrollView ref={this.props.scrollRef} showsVerticalScrollIndicator={false}  
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }], { useNativeDriver: false},
                    )}
                    >
                  <View style={{  display : 'flex',
                        justifyContent : 'center', width : '100%'}}>
                        <Animated.View style={{
                        height : profileHeight,
                        width : profileHeight,
                        borderRadius : PROFILE_IMAGE_MAX_HEIGHT/2,
                        marginTop : profileImageMarginTop,
                        borderColor : 'white',
                        borderWidth : 3,
                        overflow : "hidden",
                        backgroundColor : '#fff',
                      
                    }}>
                        <Image source={require('../../assets/aji.png')}
                        
                            style={{
                                flex : 1,
                                width : null,
                                height : null
                            }}>
                             
                        </Image>
                        
                    </Animated.View>
                   <View style={{height : 600, backgroundColor : '#fff', marginBottom: 100}}>
                        <Text style={{fontSize :  24, fontWeight : 'bold'}}>{this.state.currentUser.displayName}</Text>
                        <Text style={{fontSize :  18, fontWeight : 'bold'}}>{this.state.currentUser.email}</Text>
                        <View style={{marginTop : 20}}>
                            <TouchableOpacity onPress={()=>this.logOut()} style={{padding : 10, backgroundColor : '#8282bf', display : 'flex' , justifyContent : 'center', alignItems : 'center', borderRadius : 10}}>
                            <Text style={{fontSize : 18, color : '#fff', fontWeight : 'bold'}}>Log Out</Text>
                            </TouchableOpacity>
                        </View>
                   </View>
                  </View>
                    
                </ScrollView>
            </View>
        )
    }
}

//  Wrap and export
export default function About (props) {
    const ref = React.useRef(null);

    useScrollToTop(ref);

    return <Albums {...props} scrollRef={ref} />;
}