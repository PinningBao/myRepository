import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import DetailPage from '../pages/DetailPage';
import HomePage from '../pages/HomePage';
import {connect} from 'react-redux';

const Stack = createStackNavigator();

export default function App(){
	return (
			 <NavigationContainer>
			 		<Stack.Navigator>
			 				<Stack.Screen name="DetailPage" component={DetailPage}
			 					options={{headerShown:false}}/>
			 				<Stack.Screen name="HomePage" component={HomePage}
			 					options={{headerShown:false}}/>
			 		</Stack.Navigator>
			 </NavigationContainer>

		);
}














