import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import Appstack from '../navigation/appStack';

import {
    Alert,
    StyleSheet,
    Text,
    Button,
    View
} from "react-native";
import Modal from 'react-native-modal';



//  const [firstLaunch, setFirstLaunch] = useState(null);
//     let routeName = 'OnBoarding';

//     useEffect(()=> {
//         AsyncStorage.getItem('alreadyLaunched').then((value) => {
//             if(value == null) {
//                 AsyncStorage.setItem('alreadyLaunched', 'true');
//                 setFirstLaunch(true);
//             } else {
//                 setFirstLaunch(false);
//             }
//         });
//     },[]);



//     if(firstLaunch === null) {
//         routeName = null;
//     } else if (firstLaunch === true) {
//         routeName = 'OnBoarding';
//     } else {
//         routeName = 'Login';
//     }


class Routes extends React.Component {
    render(){
        return(
            
            <NavigationContainer>
               <Appstack/>
            </NavigationContainer>
        )
    }
}

export default Routes;