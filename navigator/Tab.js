import React,{Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import{createBottomTabNavigator,BottomTabBar} from '@react-navigation/bottom-tabs';
import LKDiscover from '../pages/LKDiscover';
import LKBookmarks from '../pages/LKBookmarks';
import LKFriends from '../pages/LkFriends';
import LKMe from '../pages/LKMe';
import {connect} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {
  StyleSheet,
  Image,

} from 'react-native';
import LKAdd from '../pages/LKAdd';

type Props={};


const TABS={
    screen:LKDiscover,
    navigationOptions:{
      tabBarLabel:'Discover',
      tabBarIcon:({color,focused})=>(
          <FontAwesome
                    name={'envelope-open-o'}
                    size={22}
                    style={{marginTop:2}}
          />
        ),
      },
  
    LKAdd:{
    screen:LKAdd,
    navigationOptions:{
      tabBarLabel:'Add',
      tabBarIcon:({color,focused})=>(
          <FontAwesome
                name={'plus-circle'}
                 size={36}
                style={{color:'navy'}}
           />
           ),
      },
    },
    LKBookmarks:{
    screen:LKBookmarks,
    navigationOptions:{
      tabBarLabel:'BookMarks',
      tabBarIcon:({color,focused})=>(
               <FontAwesome
                    name={'star-o'}
                    size={28}
                    style={{marginTop:2}}
                />
      ),
    },
  },
    LKFriends:{
    screen:LKFriends,
    navigationOptions:{
      tabBarLabel:'Friends',
      tabBarIcon:({color,focused})=>(
               <FontAwesome
                    name={'comments-o'}
                    size={28}
               
                />
        ),
    },
  },
    LKMe:{
    screen:LKMe,
    navigationOptions:{
      tabBarLabel:'Me',
      tabBarIcon:({color,focused})=>(
              <FontAwesome
                    name={'user-o'}
                    size={23}
                    style={{marginTop:2}}
                />
      ),
},
},
};
class Tab extends Component <Props> {
      constructor(props){
      super(props);
      console.disableYellowBox=true;//关闭黄色弹窗
    }
    _tabNavigator(){
      const {LKDiscover,LKBookmarks,LKAdd,LKFriends,LKMe}=TABS;
      const tabs={LKDiscover,LKBookmarks,LKAdd,LKFriends,LKMe};
      if(!this.tabNavigator){
          this.tabNavigator=<NavigationContainer independent={true}>
            <Tab.Navigator
                 tabBar={props => {
                     return <TabBarComponent theme={this.props.theme} {...props}/>;
           }}
     >
    {
        Object.entries(tab).map(item=>{
          return <Tab.screen 
              name={item[0]}
              component={item[1].screen}
              options={item[1].navigationOptions}
           />
        })
    }
  </Tab.Navigator>
  </NavigationContainer>

}
}
  render(){
    const Tab = this._tabNavigator();
    return <Tab/>;

  }
}

const styles =StyleSheet.create({
    bottomTabIconStyle:{
      width:40,
      height:30,
    }
  });
const mapStateToProps = state => ({
    theme: state.theme.theme,
});
export default connect(mapStateToProps)(Tab);


