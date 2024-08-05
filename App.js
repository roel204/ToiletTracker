import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { DarkModeProvider } from './src/context/DarkModeContext';

const Stack = createStackNavigator();

const App = () => {

    return (
        <DarkModeProvider>
            <SafeAreaView className="flex-1">
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="Home" component={HomeScreen} />
                        <Stack.Screen name="Settings" component={SettingsScreen} />
                    </Stack.Navigator>
                </NavigationContainer>
            </SafeAreaView>
        </DarkModeProvider>
    );
};

export default App;
