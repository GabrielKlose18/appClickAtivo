import React, {Component} from 'react';
import {StackActions, NavigationActions } from 'react-navigation';
import { 
    StyleSheet, 
    View, 
    ImageBackground, 
    Image,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class Login extends Component{

    async componentDidMount(){     
      const cliente = JSON.parse(await AsyncStorage.getItem('@ClickAtivoApp:cliente'));
      if(cliente){
        setTimeout(() => {this.props.navigation.navigate('Home')}, 1000); // show toast after 2s
      }else{
        setTimeout(() => {this.props.navigation.navigate('Login')}, 1000); // show toast after 2s
      }
    }
    
  render() {
    return (     
          <View style={styles.container}>
              <Image 
              source={require('../../images/logo_clickativo.png')} 
              style={styles.logo}
            />
          </View>      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', 
    height: '100%',
    backgroundColor: '#383638'
  },
  logo: {
    width:250, 
    height: 55
  },
});
