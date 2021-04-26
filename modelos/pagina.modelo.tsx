import React from 'react';

import {
    SafeAreaView,
    StyleSheet,
    View,
    Text
} from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function NomedaFuncao(){

    return(

        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.text}>
                    O texto
                </Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content:{
        flex: 1
    },
    text:{

    }
})