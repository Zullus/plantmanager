import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { 
    SafeAreaView, 
    View,
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    Image,
    Dimensions
} from 'react-native';

import { Feather } from '@expo/vector-icons';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import WateringImg from '../assets/watering.png';

export function Welcome(){

    const navigation = useNavigation();

    function handleStart(){

        navigation.navigate('UserIdentification')
        
    }

    return(

        <SafeAreaView style={styles.container}>

            <View style={styles.wrapper}>
                
                <Text style={styles.tilte}>
                Gerencie {'\n'}
                    suas plantas de {'\n'}
                    formas fácil
                </Text>

                <Image 
                    source={WateringImg} 
                    style={styles.image}
                    resizeMode="contain"
                />

                <Text style={styles.subtitle}>
                    Não se esqueça nunca mais de regar suas plantas. {'\n'}
                    Nós cuidamos de lembrar você sempre que precisar.
                </Text>

                <TouchableOpacity 
                    style={styles.button}
                    activeOpacity={0.7}
                    onPress={handleStart}
                >

                    <Feather 
                        name="chevron-right"
                        style={styles.buttonIcon}
                    />

                </TouchableOpacity>

            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    wrapper:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'        
    },
    tilte:{
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 38,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 34
    },
    subtitle:{
        textAlign: 'center',
        fontSize: 16,
        paddingHorizontal: 20,
        color: colors.heading,
        fontFamily: fonts.text
    },
    button:{
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 10,
        height: 56,
        width: 56
    },
    buttonIcon:{
        color: colors.white,
        fontSize: 32
    },
    image:{
        height: Dimensions.get('window').width * 0.7
    }
})