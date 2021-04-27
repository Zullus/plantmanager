import React, { useEffect, useState } from 'react';

import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';

import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import userImg from '../assets/hal9000.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Header(){

    const [userName, setUserName] = useState<string>();

    useEffect(() => {
      
        async function loadStoreagedUserName(){

            const user = await  AsyncStorage.getItem('@planmanager:user:name');

            setUserName(user || '');

        }

        loadStoreagedUserName();
               
    }, []);

    return(
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Olá,</Text>
                <Text style={styles.username}>
                    {userName}
                </Text>
            </View>

            <View>
                <Image 
                    source={userImg}
                    style={styles.userimage}
                />                
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: getStatusBarHeight()
    },
    greeting:{
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text
    },
    username:{
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 40
    },
    userimage:{
        width:80,
        height:80,
        borderRadius: 40
    }
    
})