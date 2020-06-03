import {combineReducers} from 'redux';
import theme from './theme';
import discover from './Discover';



const index = combineReducers({
	theme:theme,
	discover:discover
});
export default index;
