import React from 'react';
import{
	StyleSheet,
	View,
	Text,
	Navigator,
	Button
}from 'react-native';
import {createAppContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

class LKMe extends React.Component{
	static navigationOptions={
		title: 'Me'
	};
	render(){
		return(  
				<View style={style.Recommend}>
					<View style={style.each}>
					<Text style={{fontSize:21,marginLeft:'6%'}}>Released
					</Text>
					</View>
					<View style={style.each}>
         			<Text style={{fontSize:21,marginLeft:'6%'}}>Profile</Text>
          			</View>
          			<View style={style.each}>
          			<Text style={{fontSize:21,marginLeft:'6%'}}>Setting</Text>
          			</View>
          			<View style={style.each}>
          			<Text style={{fontSize:21,marginLeft:'6%'}}>Safety Monitoring</Text>
					</View>
				</View>
			)
	}
}
