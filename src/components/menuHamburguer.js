import React, {Component} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import { 
    StyleSheet,
    View, 
    TouchableOpacity
} from 'react-native';
import { withNavigation, DrawerActions } from 'react-navigation';


class Menu extends Component{
    handleMenuPress = async () => {
        this.props.navigation.toggleDrawer();
    };
  render() {
    return (
        <View style={styles.buttonPowerOff}>
            <TouchableOpacity onPress={this.handleMenuPress}>
                <Entypo 
                    name="menu"
                    size={30}
                    color={'#fff'}                    
                />
            </TouchableOpacity>
        </View>
    )
  }
  
}
export default withNavigation(Menu);

const styles = StyleSheet.create({
    buttonPowerOff: {
        marginLeft: 20,
        marginTop:5 ,
        alignItems: 'center',
        justifyContent: 'center'
    }
});