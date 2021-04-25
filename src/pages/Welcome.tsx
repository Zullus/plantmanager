import React from 'react';

import { SafeAreaView, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

import colors from '../styles/colors';

import WateringImg from '../assets/watering.png';

export function Welcome(){

    return(

        <SafeAreaView style={styles.container}>
            <Text style={styles.tilte}>
            Gerencie {'\n'}
                suas plantas {'\n'}
                de formas fácil
            </Text>
            
            <Image source={WateringImg} style={styles.image}></Image>

            <Text style={styles.subtitle}>
                Não se esqueça nunca mais de regar suas plantas. {'\n'}
                Nós cuidamos de lembrar você sempre que precisar.
            </Text>

            <TouchableOpacity 
                style={styles.button}
                activeOpacity={0.7}
            >

                <Text style={styles.buttonText}>
                    Avançar
                </Text>

            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    tilte:{
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 38,
        color: colors.heading
    },
    subtitle:{
        textAlign: 'center',
        fontSize: 16,
        paddingHorizontal: 20,
        color: colors.heading
    },
    button:{
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 10,
        height: 56,
        padding: 10
    },
    image:{
        width: 292,
        height: 284
    },
    buttonText:{
        color: colors.white,
        fontSize: 24
    }
})