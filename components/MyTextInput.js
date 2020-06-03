
import React,{PureComponent} from 'react';
import {
 View,
 StyleSheet,
 TextInput,
 Text,
 AppRegistry
} from 'react-native';


export default class MyTextInput extends PureComponent{

    render(){
      return(
        <View>
          <TextInput
            style={{
              height:45,
              //borderColor:'black',
              borderWidth:2,
              marginTop:20,
              marginLeft:18,
              marginRight:18,
              paddingLeft:10,
              borderColor:'#003366',
              borderWidth:0.5,
              borderRadius:30,
              marginBottom:10,
            shadowOffset: {width: 0.2, height: 0.2},
            shadowOpacity: 5,
            shadowRadius: 1,
            elevation: 2,
            }}
            clearButtonMode="while-editing"
            placeholder="Search"
           // onChangeText={(text)=>{this.setState(state:{inputValue:text})}}
          />
          
        </View>
      )
    }
}

