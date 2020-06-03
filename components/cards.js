import React,{Component} from 'react';
import {
 View,
 Text
} from 'react-native';

export default class Cards extends React.Component{
	render(){
		return(
		//从following那里fetch接受的数据，然后forloopjson的个数，就可以设置有几个view的卡片和卡片的背景
				<View style={{width:300, height:380, backgroundColor:'#e0eee8',borderRadius:30,marginTop:20,marginLeft:'13.33333%'}} >
				<Text></Text>
				<Text>
					{this.props.passValue}
				</Text>
				</View>
			)
	}
}



