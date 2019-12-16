import React, {Component} from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    StatusBar,
    ActivityIndicator,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';


export default class Home extends Component{
  state = { 
    comentario: '',
    assunto: '',
    lengthComentario: 0,
    error: '',
    isLoading: false,
    refreshing: false,
  };
  handleAssunto = (assunto) => {
    this.setState({ assunto });
    lengthComentario = assunto.length;
    this.setState({ lengthComentario });
  };

  handleComentario = (comentario) => {
    this.setState({ comentario });
    lengthComentario = comentario.length;
    this.setState({ lengthComentario });
  };
  componentDidMount(){
  }
  
  handleAbreChamadoPress = async () => {
    Keyboard.dismiss();
    this.setState({isLoading: true});
    this.setState({error: ''});
    const cliente = JSON.parse(await AsyncStorage.getItem('@ClickAtivoApp:cliente'));
    try {
      const response = await api.post('/abrirChamado', {
          ds_cliente_email: cliente[0].ds_cliente_email,
          ds_assunto: this.state.assunto,
          ds_comentario: this.state.comentario
      });
      // console.log(response.data);
      if(response.data.success){
          this.props.navigation.navigate('Home', 'ok');
      }else if(response.data.errors != ''){
          this.setState({error: response.data.errors});
      }else{
          this.setState({error: 'Ops! Houve um problema e não foi possível conectar.'});
      }  
    } catch (error) {
      console.log(error);
      this.setState({error: error.data.errors});
    }
    this.setState({isLoading: false});
  };
  render() {
    return (
      <View style={{flex:1}}> 
         <StatusBar 
          barStyle="light-content"
        />
        <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss()}>
            <View style={{flex:1, padding: 20}}>

                <View> 
                    <View style={styles.errors}>
                    {this.state.error.length !== 0  && <Text style={{marginTop: 10, marginBottom:10}}>{this.state.error}</Text>}
                    </View>

                    <View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.textEscolha}>Assunto</Text>
                        </View>
                        <TextInput 
                          style={styles.inputAssunto} 
                          placeholder="Motivo do contato" 
                          placeholderTextColor="#d8d8d8"
                          // keyboardType="email-address"
                          value={this.state.assunto}
                          onChangeText={this.handleAssunto}
                          autoCorrect={true}
                        />
                    </View>

                    <View style={{marginTop: 20}}>
                        <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                            <Text style={styles.textEscolha}>Descrição</Text>
                            <Text style={styles.textEscolhaSub}>{this.state.lengthComentario}/200</Text>
                        </View>
                        <TextInput 
                            style={styles.inputDescricao} 
                            placeholder="Conte-nos o que aconteceu" 
                            placeholderTextColor="#d8d8d8"
                            value={this.state.comentario}
                            onChangeText={this.handleComentario}
                            autoCapitalize="none"
                            autoCorrect={true}
                            multiline={true}
                            maxLength={200}
                        />
                    </View>

                </View>

                <View style={{marginTop: 20}}>
                    <TouchableOpacity style={[styles.button,{opacity: this.state.comentario == 0 ? 0.3 : 1}]} onPress={this.handleAbreChamadoPress} disabled={ this.state.comentario == 0 ? true : false } >
                        {!this.state.isLoading && <Text style={styles.buttonText}>Abrir Chamado</Text>}
                        {this.state.isLoading && <ActivityIndicator style={{marginBottom: 6}} size="large" color="#fff"/>}
                    </TouchableOpacity>
                </View>

            </View>
        </TouchableWithoutFeedback>
      </View>

      
    )
  }
  
}

const styles = StyleSheet.create({
    textEscolha:{
        fontWeight: '500',
        fontSize: 16,
        color: '#616161'
    },
    textEscolhaSub: {
        fontSize: 12,
        marginTop: 2,
        color: '#8b8b8b'
    },
    errors: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputDescricao: {
        width: '100%',
        height: 100,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#8b8b8b',
        paddingTop: 13,
        paddingLeft: 13,
        fontSize: 16,
        marginTop: 5
    },
    inputAssunto: {
      width: '100%',
      height: 50,
      // backgroundColor: '#464446',
      // color: '#d8d8d8',
      borderRadius: 10,
      borderWidth: 0.5,
      borderColor: '#8b8b8b',
      paddingHorizontal: 16,
      fontSize: 16,
      marginVertical: 10
    },
    button: {
        width: '100%',
        height: 50,     
        borderRadius: 10,  
        backgroundColor: '#839101',
        marginVertical: 10,
        paddingVertical: 15
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center'
    },
});