import React, {useState, useContext} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FilterComponent from "./FilterComponent";
import {FontAwesome} from '@expo/vector-icons';
import {DarkModeContext} from "../context/DarkModeContext";
import StarCountComponent from "./StarCountComponent";

const Sidebar = ({toilets, toggleSidebar, reloadToilets, setSelectedToilet, movemap, setMoveMap}) => {
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
                <View className="flex-row justify-between h-[70px]">
                    {/*Empty view for spacing purposes*/}
                    <View className="justify-center top-3 h-12 w-12 rounded-3xl"/>

                    {/*Settings button*/}
                    <TouchableOpacity className="justify-center items-center top-3 h-12 w-12 bg-white rounded-3xl" onPress={() => navigation.navigate('Settings')}>
                        <FontAwesome name="gear" size={30}/>
                    </TouchableOpacity>

                    {/*Reload button*/}
                    <TouchableOpacity className="justify-center items-center top-3 right-3 h-12 w-12 bg-white rounded-3xl" onPress={reloadToilets}>
                        <FontAwesome name="rotate-right" size={30} color="black"/>
                    </TouchableOpacity>
                </View>

                {/*ScrollView with all the items inside*/}
                <ScrollView className="p-2">
                    {filteredToilets.map(toilet => (
                        // Select the toilet and close the sidebar
                        <TouchableOpacity key={toilet.id} onPress={() => {
                            setSelectedToilet(toilet);
                            setMoveMap(!movemap)
                            toggleSidebar();
                        }}>
                            <View className="mb-2 p-3 bg-panelLight dark:bg-panelDark rounded-lg relative">

                                {/*Name*/}
                                <Text className="text-black dark:text-white font-bold pb-4 w-[85%]" numberOfLines={1} ellipsizeMode="tail">
                                    {toilet.name}
                                </Text>

                                {/*Distance in KM*/}
                                <View className="flex-row items-center">
                                    <FontAwesome name="compass" size={20} color={colorScheme === 'light' ? 'black' : 'white'}/>
                                    <Text className="text-black dark:text-white pl-1 text-sm">{(toilet.distance * 1.60934).toFixed(1)} km</Text>
                                </View>

                                {/*Star count*/}
                                <View className="absolute top-3 right-3">
                                    <StarCountComponent toiletId={toilet.id} />
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
                <View className="h-20">
                    <FilterComponent setAccessibleFilter={setAccessibleFilter} setUnisexFilter={setUnisexFilter} accessibleFilter={accessibleFilter} unisexFilter={unisexFilter}/>
                </View>
            </View>

            {/*Empty button to the right of the sidebar to close it*/}
            <TouchableOpacity className="h-full w-1/4" onPress={toggleSidebar}></TouchableOpacity>
        </View>
    );
};

export default Sidebar;