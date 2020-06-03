import React,{Component} from 'react';
import {Provider} from 'react-redux';
import store from './store';
import MyTextInput from './components/MyTextInput';
import Tab from './navigator/Tab';
import AppNavigator from './navigator/AppNavigator';

export default class App extends Component{
  render(){
    const App = AppNavigator();
    return <Provider store={store}>
    {App}
    </Provider>;
  }
}