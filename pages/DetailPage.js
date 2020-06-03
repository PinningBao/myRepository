import React,{Component} from 'react';
import {Platform,StyleSheet,Text,View,TouchableOpacity} from 'react-native';
import {WebView} from 'react-native-webview';
import NavigationBar from '../navigator/NavigationBar';
import ViewUtil from '../Util/ViewUtil';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const TRENDING_URL="https://github.com";
const THEME_COLOR='navy';
import NavigationUtil from '../navigator/NavigationUtil';
type Props = {};
export default class DetailPage extends Component<Props> {
	constructor(props){
		super(props);
		this.params = this.props.route.params;
		const {projectModes} = this.params;
		this.url=projectModes.html_url || TRENDING_URL+ projectModes.item.fullName;
		const title=projectModes.item.full_name||projectModes.item.fullName;
		this.state={
			title:title,
			url:this.url,
			canGoBack:false,
		};
	}
	onBack(){
		if(this.state.canGoBack){
			this.webView.goBack();
		}else{
			NavigationUtil.goBack(this.props.navigation);
		}
	}
	renderRightButton(){
		return (
			<View>
				{ViewUtil.getShareButton(()=>{

				})}
			</View>
			)
	}
	onNavigationStateChange(navState){
		this.setState({
			canGoBack:navState.canGoBack,
			url:navState.url

		});
	}
	render(){
		const {theme} = this.params;
		let navigationBar= <NavigationBar 
		leftButton={ViewUtil.getLeftBackButton(()=>this.onBack())}
		title={this.state.title} 
		 style={{backgroundColor:THEME_COLOR}}
		/>;
		return(
				<View style={styles.container}>
					{navigationBar}
				<WebView
					ref={webView=>this.webView=webView}
					startInLoadingState={true}
					onNavigationStateChange={e=>this.onNavigationStateChange(e)}
					source={{uri:this.state.url}}
				/>
				</View>

			);
	}
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    navBar: {
        position: 'absolute',
        left: 0,
        right: 0,
    },
});