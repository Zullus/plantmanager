import React, { useEffect, useState } from 'react';

import {
    StyleSheet,
    View,
    Text,
    FlatList,
    ActivityIndicator
} from 'react-native';

import api from '../services/api';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import { Header } from '../components/Header'
import { EnviromentButton } from '../components/EnviromentButton';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import { Load } from '../components/Load';
import { useNavigation } from '@react-navigation/native';

interface EnvironmentProps{
    key: string;
    title: string;
}

interface PlantsProps{
    id: string;
    name: string;
    about: string;
    water_tips: string;
    photo: string;
    environments: [string];
    frequency: {
      times: number;
      repeat_every:string;
    }
}

export function PlantSelect(){

    const [enviroments, setEnviroments] = useState<EnvironmentProps[]>([]);
    const [plants, setPlants] = useState<PlantsProps[]>([]);
    const [filteredPlants, setFilteredPlants] = useState<PlantsProps[]>([]);
    const [enviromentSelected, setEnviromentSelected] = useState('all');
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const navegation = useNavigation();

    function handleEnviromentSelected(enviroment: string){

        setEnviromentSelected(enviroment);

        if(enviroment == 'all')
            return setFilteredPlants(plants);
        
        const filtered = plants.filter(plant =>
            plant.environments.includes(enviroment)
        );

        setFilteredPlants(filtered);        
    }

    async function fetchPlants(){

        const {data} = await api
        .get('plants?_sort=name&order=asc&_page=${page}&_limit=8');

        if(!data)
            return setLoading(true)

        if(page > 1){
            setPlants(oldValue => [...oldValue, ...data])
            setFilteredPlants(oldValue => [...oldValue, ...data])
        }
        else{
            setPlants(data)
            setFilteredPlants(data)
        }

        setLoading(false)
        setLoadingMore(false)
    }

    function handleFechMore(distance: number){

        if(distance < 1)
            return;

        setLoadingMore(true)
        setPage(oldValue => oldValue + 1)

        fetchPlants();
    }

    function handlePlantSelect(plant: PlantsProps){

        navegation.navigate('PlantSave', {plant});
    }

    useEffect(() => {
        
        async function fetchEnviroment(){

            const {data} = await api
            .get('plants_environments?_sort=title&order=asc');

            setEnviroments([
                {
                    key: 'all',
                    title: 'Todos',
                },
                ...data
            ])
        }

        fetchEnviroment()
    }, [])

    useEffect(() => {

        fetchPlants();
    }, [])

    if(loading)
        return < Load />

    return(

            <View style={styles.container}>

                <View style={styles.header}>

                    <Header />

                    <Text style={styles.title}>
                        Em qual ambiente
                    </Text>

                    <Text style={styles.subtitle}>
                        Você quer colocar sua planta?
                    </Text>

                </View>

                <View>
                    <FlatList
                        data={enviroments}
                        keyExtractor={(item) => item.key }
                        renderItem={( {item} ) => (
                            <EnviromentButton 
                                title={item.title} 
                                active={item.key === enviromentSelected}
                                onPress={() => handleEnviromentSelected(item.key)}
                            />                            
                        )
                        }
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.enviromentList}
                 />

                </View>

                <View style={styles.plants}>

                    <FlatList
                        data={filteredPlants}
                        keyExtractor={(item) => String(item.id) }
                        renderItem={({item}) => (
                            <PlantCardPrimary 
                                data={item} 
                                onPress={() => handlePlantSelect(item)}
                            />
                        )}
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        onEndReachedThreshold={0.1}
                        onEndReached={( {distanceFromEnd} ) => 
                            handleFechMore(distanceFromEnd)                        
                        }
                        ListFooterComponent={
                            loadingMore
                            ? <ActivityIndicator color={colors.green} />
                            : <></>
                        }
                    />
                </View>


            </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    header:{
        paddingHorizontal: 30
    },
    title:{
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop: 15
    },
    subtitle:{
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.text,
        lineHeight: 20,
        marginTop: 15
    },
    enviromentList:{
        height: 40,
        justifyContent: "center",
        paddingBottom: 5,
        marginLeft: 32,
        marginVertical: 32 
    },
    plants:{
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center'
    }
})