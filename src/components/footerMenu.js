import React, {Component} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { 
    StyleSheet,
    View, 
    Text, 
    TouchableOpacity
} from 'react-native';
import { StackActions, withNavigation, NavigationActions } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';

class FooterMenu extends Component{
    handleLogoffPress = async () => {
        try {
            await AsyncStorage.removeItem('@ClickAtivoApp:cliente');
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Login' })],
            });
            this.props.navigation.dispatch(resetAction)
        } catch(exception) {
            return false;
        }
        
    };
  render() {
    return (
        <View style={styles.container}>            
            <TouchableOpacity style={{flexDirection: 'row', }} onPress={this.handleLogoffPress}>
                <View style={styles.buttonPowerOff}>
                    <MaterialIcons
                        name='exit-to-app'
                        size={25}
                        color={'#fff'}
                    />
                </View>
                <Text style={styles.textPowerOff}>Sair</Text>
            </TouchableOpacity>
        </View>
    )
  }
  
}
export default withNavigation(FooterMenu);

const styles = StyleSheet.create({
    container: {
        // backgroundColor: '#fff', 
        height: 50,
        borderTopColor: '#464446',
        borderTopWidth: 1,
        flexDirection: 'row', 
        paddingTop: 10
        // justifyContent: 'center',
    },
    buttonPowerOff: {
        // flex: 1,
        marginLeft: 13, 
        marginBottom: 10, 
        // height:25, 
        // width: 25, 
        // borderRadius: 5,
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    textPowerOff: {
        // fontFamily: '',
        marginLeft: 10, 
        marginTop: 4, 
        fontSize: 14, 
        fontWeight: '700',
        color: '#fff'
    }
});