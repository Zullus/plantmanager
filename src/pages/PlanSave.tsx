import React, { useState } from 'react';

import {
   Alert,
   StyleSheet,
   Text,
   View,
   Image,
   ScrollView,
   Platform,
   TouchableOpacity
} from 'react-native';

import { SvgFromUri } from 'react-native-svg';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import {useRoute} from '@react-navigation/core';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import warterdrop from '../assets/waterdrop.png';
import { Button } from '../components/Button';
import { format, isBefore } from 'date-fns';
import { PlantProps, savePlant } from '../libs/storage';

interface Params {
    plant: PlantProps
}

export function PlantSave(){

    const [ selectedDateTime, setSelectedDateTime] = useState(new Date() );
    const [showDatePicker, setShowDatePicker] = useState( Platform.OS == 'ios' );

    const route = useRoute();
    const {plant} = route.params as Params;

    function handleChangeTime( event: Event, dateTime: Date | undefined){

        if(Platform.OS === 'android'){

            setShowDatePicker(oldState => !oldState);
        }

        if(dateTime && isBefore(dateTime, new Date())){

            setSelectedDateTime( new Date());
            return Alert.alert('Escolha uma hora no furuto! ⏰');
        }

        if(dateTime)
            setSelectedDateTime(dateTime)
    }

    function handleOpenDatetimePickerForAndroid(){
        setShowDatePicker(oldState => !oldState);
    }

    async function handleSave(){

        try{

            await savePlant({
                ...plant,
                dateTimeNotification: selectedDateTime
            });
        }
        catch{
            Alert.alert(' Não foi possível salvar. :😢')
        }
    }

    return(
        <View style={styles.container}>

            <View style={styles.plantinfo}>
                <SvgFromUri
                    uri={plant.photo}
                    height={150}
                    width={150}
                />

                <Text style={styles.plantname}>
                    {plant.name}
                </Text>
                <Text style={styles.plantabout}>
                    {plant.about}
                </Text>
            </View>

            <View style={styles.controllers}>

                <View style={styles.tipcontainer}>

                    <Image
                        source={warterdrop}
                        style={styles.tipimage}
                    />

                    <Text style={styles.tiptext}>
                        {plant.water_tips}
                    </Text>
                </View>

            </View>

            <Text style={styles.alertlabel}>
                Escolha o melhor Horário para ser lembrado
            </Text>

            {showDatePicker && (
                <DateTimePicker
                    value={selectedDateTime}
                    mode="time"
                    display="spinner"
                    onChange={handleChangeTime}
                />
            )}

            {
                Platform.OS === 'android' && (

                    <TouchableOpacity
                        onPress={handleOpenDatetimePickerForAndroid}
                        style={styles.dataTimePickerBuutton}
                    >

                        <Text style={styles.dataTimePickerText}>
                            {`Mudar Horário Para ${format(selectedDateTime, 'HH:mm')}`}
                        </Text>

                    </TouchableOpacity>
                )
            }

            <Button
                title="Cadastrar Planta"
                onPress={handleSave}
            />                
        
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.shape
    },
    plantinfo:{
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.shape
    },
    plantname:{
        fontFamily:fonts.heading,
        fontSize: 24,
        color: colors.heading,
        marginTop: 15
    },
    plantabout:{
        textAlign: 'center',
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 17,
        marginTop: 10
    },
    controllers:{
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingTop:20,
        paddingBottom: getBottomSpace() || 20
    },
    tipcontainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 20,
        borderRadius: 20,
        position: 'relative',
        bottom: 60
    },
    tipimage:{
        width: 56,
        height: 56

    },
    tiptext:{
        flex: 1,
        marginLeft: 20,
        fontFamily: fonts.text,
        color: colors.blue,
        fontSize: 17,
        textAlign: 'justify'
    },
    alertlabel:{
        textAlign: 'center',
        fontFamily: fonts.complement,
        color: colors.heading,
        fontSize: 12,
        marginBottom: 5
    },
    dataTimePickerBuutton:{
        width: '100%',
        alignItems: 'center',
        paddingVertical: 40
    },
    dataTimePickerText:{
        color: colors.heading,
        fontSize: 24,
        fontFamily: fonts.text
    }
    
})