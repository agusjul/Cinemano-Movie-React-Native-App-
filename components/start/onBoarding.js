import React, { Component } from 'react';
import { TouchableOpacity,StatusBar, Button, StyleSheet, Image, Text } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import Image1 from '../../assets/image-01.svg';
import Image2 from '../../assets/image-02.svg';
import Image3 from '../../assets/image-03.svg';

const Skip =({...props})=> {
    return (
        <TouchableOpacity
            style={{
                marginLeft : 20,
                marginBottom : 0,
                backgroundColor : '#white',
                width : 60,
                height : 32,
                borderRadius : 10,
                justifyContent : "center",
                alignItems : 'center'
            }}
            {...props}>
            <Text
            style={{
                color: '#8282bf',
                fontSize : 16,
                
                }}
            >Skip</Text>
        </TouchableOpacity>
        
    )
    
}

const Next = ({ ...props }) => {
    
    return(
        <TouchableOpacity
            style={{
                marginRight : 20,
                backgroundColor: '#white',
                width: 60,
                height: 32,
                borderRadius: 50,
                justifyContent: "center",
                alignItems: 'center'
            }}
            {...props}>
            <StatusBar barStyle="dark-content" backgroundColor="#EBEBFB"
            />
            <Text
                style={{
                    color: '#E5A529',
                    fontSize: 16,

                }}
            >Next</Text>{console.log("next ditekan")}
            
        </TouchableOpacity>

    )
}

const Done = ({ ...props }) => {
   return(
       <TouchableOpacity
           style={{
               marginRight: 20,
               backgroundColor: '#8282bf',
               width: 60,
               height: 32,
               borderRadius: 4,
               justifyContent: "center",
               alignItems: 'center'
           }}
           {...props}>
           <StatusBar barStyle="dark-content" backgroundColor="#EBEBFB"
           />
           <Text
               style={{
                   color: 'white',
                   fontSize: 16,

               }}
           >Done</Text>
       </TouchableOpacity>
   )
}

const Onboardingscreen = ({navigation}) => {
    return(
        <Onboarding
            SkipButtonComponent={Skip}
            NextButtonComponent={Next}
            DoneButtonComponent={Done}
            onDone={()=>navigation.navigate('Login')}
            onSkip={() => navigation.navigate('Login')}
            bottomBarHighlight = {false}
            imageContainerStyles={{paddingBottom : 10}}
            containerStyles={{paddingBottom : 100}}
            pages={[
                {
                    backgroundColor: '#EBEBFB',
                    image: <Image1 width={300} height={300}/>,
                    title: 'Tempat Makan Favoritmu',
                    subtitle: 'Temukan tempat makan favoritmu langsung dari smartphonemu',
                },
                {
                    backgroundColor: '#EBEBFB',
                    image: <Image2 width={300} height={300}/>,
                    title: 'Scan QR Code',
                    subtitle: 'Dapatkan pencegahan dari covid-19 dengan scan qr code menu kesukaanmu',
                },
                {
                    backgroundColor: '#EBEBFB',
                    image: <Image3 width={300} height={300}/>,
                    title: 'Dapatkan Makananmu',
                    subtitle: 'Dapatkan makananmu dengan protokol kesehatan yang ketat',
                },
                
            ]}
        />
    )
}

export default Onboardingscreen;