import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import DetailScreen from './src/screens/DetailScreen';
import { DarkModeProvider } from './src/context/DarkModeContext';

const Stack = createStackNavigator();

const App = () => {

    return (
        <DarkModeProvider>
            {/*Safe area to prevent camera notches & notification bars from being in way*/}
            <SafeAreaView className="flex-1 bg-bgLight dark:bg-bgDark">
                <NavigationContainer>
                    {/*All routes*/}
                    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="Home" component={HomeScreen} />
                        <Stack.Screen name="Settings" component={SettingsScreen} />
                        <Stack.Screen name="Details" component={DetailScreen} />
                    </Stack.Navigator>
                </NavigationContainer>
            </SafeAreaView>
        </DarkModeProvider>
    );
};

export default App;
