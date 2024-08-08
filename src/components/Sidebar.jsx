import React, {useState, useContext} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FilterComponent from "./FilterComponent";
import {FontAwesome} from '@expo/vector-icons';
import {DarkModeContext} from "../context/DarkModeContext";

const Sidebar = ({toilets, toggleSidebar, reloadToilets, setSelectedToilet}) => {
    const {colorScheme} = useContext(DarkModeContext);
    const navigation = useNavigation();
    const [accessibleFilter, setAccessibleFilter] = useState(false);
    const [unisexFilter, setUnisexFilter] = useState(false);

    // Filter the toilets based on Accessability and Unisex
    const filteredToilets = (Array.isArray(toilets) ? toilets : []).filter(toilet => {
        return (
            (!accessibleFilter || toilet.accessible) &&
            (!unisexFilter || toilet.unisex)
        );
    });

    return (
        <View className="flex-1 flex-row">
            <View className="flex-1 h-full w-3/4 bg-bgLight dark:bg-bgDark border-r-2 border-black">

                {/*Top bar*/}
                <View className="flex-row justify-between h-[10vh]">
                    <View className="justify-center top-3 h-12 w-12 rounded-3xl"/> {/*Empty view for spacing purposes*/}

                    {/*Settings button*/}
                    <TouchableOpacity className="justify-center items-center top-3 h-12 w-12 bg-white rounded-3xl" onPress={() => navigation.navigate('Settings')}>
                        <FontAwesome name="gear" size={30}/>
                    </TouchableOpacity>

                    {/*Reload button*/}
                    <TouchableOpacity className="justify-center items-center top-3 right-3 h-12 w-12 bg-white rounded-3xl" onPress={reloadToilets}>
                        <FontAwesome name="rotate-right" size={30} color="black"/>
                    </TouchableOpacity>
                </View>

                {/*ScrollView with all the items inide*/}
                <ScrollView className="p-2">
                    {filteredToilets.map(toilet => (
                        <TouchableOpacity key={toilet.id} onPress={() => {
                            setSelectedToilet(toilet);
                            {/*Select the toilet*/
                            }
                            toggleSidebar();
                            {/*Close the sidebar*/
                            }
                        }}>
                            <View className="mb-2 p-3 bg-panelLight dark:bg-panelDark rounded-lg relative">

                                {/*Name*/}
                                <Text className="text-black dark:text-white font-bold pb-2" numberOfLines={1} ellipsizeMode="tail">
                                    {toilet.name}
                                </Text>

                                {/*Distance in KM*/}
                                <View className="flex-row items-center">
                                    <FontAwesome name="compass" size={20} color={colorScheme === 'light' ? 'black' : 'white'}/>
                                    <Text className="text-black dark:text-white pl-1 text-sm">{(toilet.distance * 1.60934).toFixed(1)} km</Text>
                                </View>

                                {/*Accessible & Unisex icon*/}
                                <View className="absolute bottom-1 right-2 p-2 flex-row space-x-2">
                                    {toilet.accessible && <FontAwesome name="wheelchair" size={20} color={colorScheme === 'light' ? 'black' : 'white'}/>}
                                    {toilet.unisex && <FontAwesome name="intersex" size={20} color={colorScheme === 'light' ? 'black' : 'white'}/>}
                                </View>
                            </View>

                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/*Filter component*/}
                <View className="h-[12vh]">
                    <FilterComponent setAccessibleFilter={setAccessibleFilter} setUnisexFilter={setUnisexFilter} accessibleFilter={accessibleFilter} unisexFilter={unisexFilter}/>
                </View>
            </View>

            {/*Empty button to the right of the sidebar to close it*/}
            <TouchableOpacity className="h-full w-1/4" onPress={toggleSidebar}/>
        </View>
    );
};

export default Sidebar;