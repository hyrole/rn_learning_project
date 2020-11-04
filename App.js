import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';


import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from './src/screens/HomeScreen';
import SecondScreen from './src/screens/SecondScreen';
import StaffScreen from './src/screens/StaffScreen';
import StaffDetailScreen from './src/screens/StaffDetailScreen';
import StaffAddEditScreen from './src/screens/StaffAddEditScreen';

const Stack = createStackNavigator();

function App() {
  return (
    
    // <HomeScreen/>
    // <SecondScreen/>

    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="StaffAddEditScreen" // Prod: HomeScreen        
      >        

        <Stack.Screen name="StaffScreen"
          options={{
            title: 'Staff',            
          }} 
        >
          {props => <StaffScreen {...props} />}
        </Stack.Screen>

        <Stack.Screen name="StaffDetailScreen"
          options={{
            title: 'Staff Details',            
          }} 
        >
          {props => <StaffDetailScreen {...props} />}
        </Stack.Screen>

        <Stack.Screen 
          name="StaffAddEditScreen"
          options={{
            title: 'Add New Staff',            
          }}        
        >
          {props => <StaffAddEditScreen {...props} />}
        </Stack.Screen>

        <Stack.Screen name="HomeScreen">
          {props => <HomeScreen {...props} />}
        </Stack.Screen>

        <Stack.Screen name="SecondScreen">
          {props => <SecondScreen {...props} />}
        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>

  );
}

export default App