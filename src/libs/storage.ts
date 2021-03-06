import AsyncStorage, { useAsyncStorage } from "@react-native-async-storage/async-storage";
import {format} from "date-fns";
import { asin } from "react-native-reanimated";

export interface PlantProps{
    id: string;
    name: string;
    about: string;
    water_tips: string;
    photo: string;
    environments: [string];
    frequency: {
      times: number;
      repeat_every:string;
    },
    dateTimeNotification: Date;
    hour: string;
}

interface StoragePlantProps{
    [id: string]: {
        data: PlantProps;
    }
}

export async function savePlant(plant: PlantProps): Promise<void>{
 
    try{

        const data = await AsyncStorage.getItem('@planmanager:user:plants');
        const oldPlants = data ? (JSON.parse(data) as StoragePlantProps) : {};

        const newPlant = {
            [plant.id]: {
                data: plant
            }
        }

        await AsyncStorage.setItem('@planmanager:user:plants',
        JSON.stringify({
            ...newPlant,
            ...oldPlants
        }));
    }
    catch(error){
        throw new Error(error)
    }
}

export async function loadPlant(): Promise<PlantProps[]>{

        try{

            const data = await AsyncStorage.getItem('@planmanager:user:plants');
            const plants = data ? (JSON.parse(data) as StoragePlantProps) : {};

            const planstsSortes = Object
            .keys(plants)
            .map((plant) =>{
                return{
                    ...plants[plant].data,
                    hour: format(new Date(plants[plant].data.dateTimeNotification), 'HH:mm')
                }
            })
            .sort((a, b) =>
                Math.floor(
                    new Date(a.dateTimeNotification).getTime() / 1000 -
                    Math.floor(new Date(b.dateTimeNotification).getTime() / 1000)
                )
            );

            return planstsSortes;

        }
        catch(error){
            throw new Error(error)
        }

}