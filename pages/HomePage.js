import React,{Component} from 'react';
import {View} from 'react-native';
import Tab from '../navigator/Tab';
import NavigationUtil from '../navigator/NavigationUtil';
export default class HomePage extends Component{
		render(){
			 NavigationUtil.navigation = this.props.navigation;
	return(
		<Tab/>
	)
	}
}
