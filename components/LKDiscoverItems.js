import React,{Component} from 'react';
import {Image,StyleSheet,Text,TouchableOpacity,View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DetailPage from '../pages/DetailPage';
import NavigationUtil from '../navigator/NavigationUtil';
export default class LKDiscoverItems extends Component{
	render(){
        const {projectModes}=this.props;
		const {item}=projectModes;
		if(!item || !item.owner) {
            return null;
        }
		let favouriteButton=
			<TouchableOpacity
				style={{flexDirection:'row',marginTop:40}}
				     onPress={() => {}}
				underlayerColor={'transparent'}
			>
                <FontAwesome
                    name={'star-o'}
                    size={40}
                    style={{color:'navy',marginLeft:'60%'}}
                />
      
                 <FontAwesome
                    name={'heart-o'}
                    size={40}
                    style={{color:'red',marginLeft:25}}
                />
            </TouchableOpacity>                  
  return (
            <TouchableOpacity
                onPress={() => this.onItemClick()}
            >
            <View>
                <Text style={{fontSize:20,marginLeft:15,marginTop:20,marginBottom:10,fontWeight:'400'}}>#Sign your loves</Text>
                </View>
                <View style={styles.cell_container}>
                    <Text style={styles.title}>
                        {item.full_name}
                    </Text>
                    <Text style={styles.description}>
                        {item.description}
                    </Text>
                    <View style={styles.row}>
                        <View style={styles.row}>
                            <Text>Author:</Text>
                            <Image style={{height: 22, width: 22}}
                                   source={{uri: item.owner.avatar_url}}
                            />
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text>Start:</Text>
                            <Text>{item.stargazers_count}</Text>
                        </View>
                        {favouriteButton}
                    </View>
                </View>

            </TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create({
        cell_container: {
            backgroundColor: 'white',
            padding: 20,
         	marginLeft: 30,
            marginRight: 30,
            marginBottom:10,
            height:400,
            marginVertical: 3,
            borderColor: '#dddddd',
            borderWidth: 2,
            borderRadius: 10,
            shadowColor: 'gray',
            shadowOffset: {width: 8, height: 8},
            shadowOpacity: 5,
            shadowRadius: 1,
            elevation: 8,
        },

        row: {
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
        },
        title: {
            fontSize: 16,
            marginBottom: 2,
            color: '#212121',
        },
        description: {
            fontSize: 14,
            marginBottom: 2,
            color: '#757575',
        }
    }
);