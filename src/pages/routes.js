import React from 'react';
import { createDrawerNavigator, createStackNavigator, createAppContainer, DrawerItems } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { 
    StyleSheet,
    Image,
    TouchableHighlight,
    SafeAreaView,
    Dimensions,
    ScrollView,
    View,
    Text,
} from 'react-native';

import Login from './login';
import RecuperarSenha from './recuperaSenha';
import Home from './home';
import Splash from './splash';
import AbrirChamado from './abrirChamado';
import MenuHamburguer from '../components/menuHamburguer';
import FooterMenu from '../components/footerMenu';

import {isLogaded} from '../services/auth';

// console.log('AQui: '+isLogaded);
const {width} = Dimensions.get('window');

const CustomDrawerComponent = (props) => (
    <SafeAreaView style={{flex: 1, backgroundColor: '#383638'}}>
    <View style={{height: 100, borderRadius: 35, justifyContent: 'center', alignItems: 'center'}}>
        <Image 
            source={require('../images/sem-foto.jpg')} 
            style={{height: 70, width: 70, borderRadius: 35}}
        />
    </View>
        <ScrollView>
            <DrawerItems {... props}/>
        </ScrollView>
    <FooterMenu />
    </SafeAreaView>
);


const DrawerNavigator = createDrawerNavigator({
    Home :{
        screen: Home,
        navigationOptions : {
            title: 'Home',
            drawerIcon : ({ tintColor }) => (
                <Ionicons
                    style={{marginLeft: 0}}
                    name="md-home"
                    size={20}
                    color={tintColor}  
                />
            )
        },
    }
},{
    contentComponent: CustomDrawerComponent,
    contentOptions: {
        // activeBackgroundColor: 'gray',
        activeTintColor: '#fff',
        itemsContainerStyle: {
            marginLeft: 0,
        },
        labelStyle: {
            marginLeft: -10
        }
    },
    
    // drawerWidth: width - 100
});


const AppNavigator = createStackNavigator({
    
    Login : {
        screen: Login,
        navigationOptions : {
            gesturesEnabled: false,
            header: null,
            // title: 'Home',
        },
    },
    RecuperarSenha : {
        screen: RecuperarSenha,
        navigationOptions : {
            header: null,
        },
    },
    Home :{
        screen: DrawerNavigator,
        navigationOptions : {
            gesturesEnabled: false,
            headerStyle: {
                height: 50,
                backgroundColor: '#383638',
                // alignSelf: 'center'
                // headerTitleStyle
            },
            headerTitle:   
                <View style={{flex: 1, alignItems: "center"}}>
                    <Image 
                        source={require('../images/logo_clickativo.png')}
                        style={{ width: 140, height: 30 }}
                    />
                </View>,
            headerLeft: 
                <MenuHamburguer />,
            
            headerRight: 
                <View/>,
            headerBackTitle:'Voltar',
        },
    },
    Splash : {
        screen: Splash,
        navigationOptions : {
            header: null,
        },
    },
    AbrirChamado : {
        screen: AbrirChamado,
        navigationOptions : {
            headerStyle: {
                height: 50,
                backgroundColor: '#383638',
                // alignSelf: 'center'
                // headerTitleStyle
            },
            headerTitle:   
                <View style={{flex: 1, alignItems: "center"}}>
                    <Image 
                        source={require('../images/logo_clickativo.png')}
                        style={{ width: 140, height: 30 }}
                    />
                </View>,
            
            headerRight: 
                <View/>,
            headerBackTitleStyle: {
                color: 'white'
            },
            headerTintColor: '#fff',
                
        },
    },
    
  
    
},{initialRouteName: 'Home' }
);

const Routes = createAppContainer(AppNavigator, DrawerNavigator);

export default Routes;
