import React, {Component} from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    FlatList,
    ActivityIndicator,
    StatusBar,
    RefreshControl,
    TouchableOpacity
} from 'react-native';
import BoxHoras from '../../components/boxHoras';
import Icon from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';
import Toast from 'react-native-tiny-toast';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

export default class Home extends Component{
  state = { 
    boxHoras: [], 
    error: '',
    isLoading: false,
    refreshing: false,
    toastVisible: false
  };

  componentDidUpdate(){
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      if(this.props.navigation.state.params){
        this._onRefresh();
        setTimeout(() => this.setState({
          toastVisible: true
        }), 1000); // show toast after 2s
    
        setTimeout(() => this.setState({
          toastVisible: false
        }), 5000); // hide toast after 5s
        this.props.navigation.state.params = null;
      }
    });
  }

  handleAbreChamado = () => {
    this.props.navigation.navigate('AbrirChamado');
  };
  async componentDidMount(){
    this.setState({isLoading: true});
    const cliente = JSON.parse(await AsyncStorage.getItem('@ClickAtivoApp:cliente'));
    try{
      // console.log('CD_USUARIIO: '+cliente[0]['cd_cliente']);
      // console.log('ENTROU NO TRRYYY');
      const response = await api.get('/getHours', {
        cd_cliente: cliente[0]['cd_cliente'],
      })

      const horas = response.data.data[0];
      this.setState({boxHoras: horas});
    } catch (response) {
      this.setState({
        error: 'Nenhum projeto cadastrado...'
      });
      // console.log('CD_USUARIIO: '+cliente[0]['cd_cliente']);
      // console.log('CAIU DO CATCH');
      // console.log(response.data.errors);
      // this.setState({error: response.data.errors});
    }
    this.setState({isLoading: false});
  }

  _onRefresh = async () => {
    this.setState({refreshing: true});
    try{
      const cliente = JSON.parse(await AsyncStorage.getItem('@ClickAtivoApp:cliente'));
      const response = await api.get('/getHours', {
        cd_cliente: cliente[0]['cd_cliente'],
      })

      const horas = response.data.data[0];
      this.setState({boxHoras: horas});
    } catch(error){
      this.setState({
        error: 'Ops... erro inesperado.'
      });
    }
    this.setState({refreshing: false});
  }
  render() {
    return (
      <View style={{flex:1 ,height: '100%',backgroundColor: '#f2f3f5'}}>
      <StatusBar 
        barStyle="light-content"
      />
      <ShimmerPlaceHolder autoRun={true} />
      <ShimmerPlaceHolder width={300} height={400} style={{alignSelf: 'stretch'}} autoRun={true} visible={true}>
        <Text style={styles.text}>Controle de Horas</Text>
      </ShimmerPlaceHolder>
      <Toast
            visible={this.state.toastVisible}
            position={180}
            animationDuration={600}
            animation={true}
            // shadow={true}
            // textColor={'white'}
            // backgroundColor={'green'}
        >Chamado aberto com sucesso!</Toast>
      <View style={styles.errors}>
        {this.state.isLoading && <ActivityIndicator style={{marginTop: 40}} size="large" />}
        {this.state.error.length !== 0  && <Text style={{marginTop: 40}}>{this.state.error}</Text>}
      </View>
      

      <FlatList
        data={this.state.boxHoras}
        renderItem={({item}) => <BoxHoras projeto={item} />}
        keyExtractor = { (item) => item.cd_projeto}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      />
      <TouchableOpacity style={styles.buttonFloating} onPress={this.handleAbreChamado}>
        <Icon name="plus"  size={30} color="#fff" />
      </TouchableOpacity>
      </View>
    )
  }
  
}

const styles = StyleSheet.create({
  text: {
    marginHorizontal: 20,
    marginTop: 20,
    fontSize: 22,
    fontFamily: 'Helvetica',
    color: '#383638',
    fontWeight: '400',
  },
  errors: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonFloating: {
    alignItems:'center',
    justifyContent:'center',
    width:56,
    height:56,
    position: 'absolute',                                          
    bottom: '5%',                                                    
    right: '5%',
    backgroundColor:'#839101',
    borderRadius:100
  }
});