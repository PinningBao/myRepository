import React,{Component} from 'react';
import {ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MyTextInput from '../components/MyTextInput';
import Cards from '../components/cards';
import {connect} from 'react-redux';
import actions from '../action/index';
import LKDiscoverItems from '../components/LKDiscoverItems';
import Toast from 'react-native-easy-toast';
import store from '../store';
import DetailPage from './DetailPage';
import NavigationUtil from '../navigator/NavigationUtil';
const URL='https://api.github.com/search/repositories?q=';
const QUERY_STR='&sort=stars';
const THEME_COLOR='#003366';
type Props={};
const Tab = createMaterialTopTabNavigator();

export default class LKDiscover extends Component<Props>{
	constructor(props) {
		super(props);
		this.tabNames=['Java', 'Android', 'iOS'];
	}
	_genTabs(){
		const tabs={};
		const{theme}=this.props;
		this.tabNames.forEach((item,index)=>{
			tabs[`tab${index}`]={
				screen: props=> <LKDiscoverTabPage  {...props} tabLabel={item} />,
					navigationOptions:{
						title:item,
						tabBarLabel:({tintColor,focused})=>(<Text style={{color:focused ? '#003366' : 'black',fontSize:16,marginTop:50,fontWeight:'400'}}>{item}</Text>
					)
					}

				}
			});
		return tabs;
	}

	render(){
		const{theme}=this.props;
		const TabNavigator= <NavigationContainer independent={true}>
			<Tab.Navigator 
				lazy={true}
				tabBarOptions={
					{
						tabstyle:{
							minWidth:10,
						},
				
						upperCaseLabel:false,
						style:{
							backgroundColor:'white'
						},
						indicatorStyle: {
          					height: 0.5,
         			 		width:50,
         			 		marginLeft:45,
         			 		backgroundColor:'black',
         			 		shadowOffset: {width: 0.5, height: 0.5},
            				shadowOpacity: 10,
            				shadowRadius: 1,
           					 elevation: 2,
       					},
       					labelStyle:{
       						fontSize:20,
       					}		
       			}
       		}
       	>
			
		{
			Object.entries(this._genTabs()).map(item=>{
				return <Tab.screen
					name={item[0]}
					component={item[1].screen}
					options={item[1].navigationOptions}
				/>;
			})
		}
	</Tab.Navigator>
</NavigationContainer>
		return <View style={style.container}>  
           		{TabNavigator}
           		</View>
	}
}



const pageSize=20;
class LKDiscoverTab extends Component<Props>{
	constructor(props){
		super(props);
		const{tabLabel}=this.props;
		this.storeName = tabLabel;
	}
	componentDidMount(){
		this.loadData();
	}
	loadData(loadMore){
		const{onRefreshDiscover,onLoadMoreDiscover} = this.props;
		const store=this._store();
		const url=this.genFetchUrl(this.storeName);
		if(loadMore){
			onLoadMoreDiscover(this.storeName,++store.pageIndex,pageSize,store.items,callBack=>{
				this.refs.toast.show('没有更多了');
			})
		}else{
			onRefreshDiscover(this.storeName,url,pageSize);
		}
	}
	_store(){
		const {discover} =this.props;
		let store = discover[this.storeName];
		if(!store){
			store={
				items:[],
				isLoading:false,
				projectModes:[],
				hideLoadingMore:true,
			};
		}
		return store;
	}
	genFetchUrl(key){
		return URL + key + QUERY_STR;
	}
	renderItem(data){
		const item = data.item;
		const {theme} = this.props;
		return <LKDiscoverItems
			item={item}
		 	onSelect={(callback) => {
                NavigationUtil.goPage({
                    projectModes: item,
                    callback
                }, 'DetailPage');
            }}
		/>
	}
	genIndicator(){
		return this._store().hideLoadingMore ? null:
			<View style={style.indicatorContainer}>
				<ActivityIndicator
					style={style.indicator}

				/>
				<Text>Loading More Cards</Text>
			</View>
	}
	render(){
			let store = this._store();
			const{theme}=this.props;
		return(//refreshControl是为列表提供下拉刷洗
				<View style={style.container}>
				<MyTextInput/>
				<FlatList 
					data={store.projectModes}
					renderItem={data=>this.renderItem(data)}
					keyExtractor={item=>''+ item.id}
					refreshControl={
						<RefreshControl
							title={'Loading'}
							titleColor={THEME_COLOR}
							colors={[THEME_COLOR]}
							refreshing={store.isLoading}
							onRefresh={()=>this.loadData()}
							tintColor={THEME_COLOR}
						/>
					}
					ListFooterComponent={()=> this.genIndicator()}
					onEndReached={()=>{
						this.loadData();
					}}
				></FlatList>
				<Toast ref={'toast'}
                position={'center'}
                />
				</View>
		);
	}
}


const mapStateToProps = state =>({
	discover:state.discover
});
const mapDispatchToProps =dispatch=>({
	onRefreshDiscover:(storeName,url,pageSize)=>dispatch(actions.onRefreshDiscover(storeName,url,pageSize)),
	onLoadMoreDiscover:(storeName,pageIndex,pageSize,items,callBack)=>dispatch(actions.onLoadMoreDiscover(storeName,pageIndex,pageSize,items,callBack))
});

const LKDiscoverTabPage = connect(mapStateToProps,mapDispatchToProps)(LKDiscoverTab)

const style = StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'#f5f5f5'
	},
	indicatorContainer:{
		alignItems:"center",

	},
	indicator:{
		color:'red',
		margin:10
	}

});



