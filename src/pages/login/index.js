import React, {Component} from 'react';
import {StackActions, NavigationActions } from 'react-navigation';
import { 
    StyleSheet, 
    Text, 
    View, 
    Image, 
    TextInput, 
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    StatusBar,
    ActivityIndicator
} from 'react-native';
import api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';

export default class Login extends Component{
    
    state = { 
      username: '', 
      password: '', 
      error: '' ,
      isLoading: false,
      buttonDisabled: false
    };
  
    handleUserNameChange = (username) => {
        this.setState({ username });
      };
      
    handlePasswordChange = (password) => {
        this.setState({ password });
    };

    handleRecuperaSenhaPress = () => {
        this.props.navigation.navigate('RecuperarSenha');
    };

    handleSignInPress = async () => {
        Keyboard.dismiss();
        this.setState({isLoading: true});
        this.setState({error: ''});
        if (this.state.username.length === 0 || this.state.password.length === 0) {
            this.setState({ error: 'Preencha o usuário e senha para continuar!' }, () => false);
            this.setState({isLoading: false});
        }else{
          try{
              console.log('TRY LOGIN CARAI');
              const response = await api.post('/login', {
                ds_cliente_login: this.state.username,
                ds_cliente_senha: this.state.password,
              })
              
              console.log('TRY LOGIN : '+response.data);
  
              const cliente = response.data.data;
              await AsyncStorage.multiSet([
                ['@ClickAtivoApp:cliente' , JSON.stringify(cliente)] 
              ])
  
              const resetAction = StackActions.reset({
                  index: 0,
                  actions: [NavigationActions.navigate({ routeName: 'Home' })],
                });
              this.props.navigation.dispatch(resetAction)

            } catch (response) {
              console.log(response.data);
              this.setState({error: response.data.errors});
            }
            this.setState({isLoading: false});
        }
    };
    
  render() {
    return (
        
        <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss()}>
          <View style={styles.container}>
              <StatusBar 
                barStyle="light-content"
              />
              <View style={styles.viewLogo}>
                <Image 
                  source={require('../../images/logo_clickativo.png')} 
                  style={styles.logo}
                />
              </View>

              
              <View style={styles.inputsLogin}>
                <TextInput 
                  style={styles.input} 
                  placeholder="Usuário" 
                  placeholderTextColor="#d8d8d8"
                  keyboardType="email-address"
                  value={this.state.username}
                  onChangeText={this.handleUserNameChange}
                  autoCapitalize="none"
                  returnKeyType="next"
                  onSubmitEditing={() => this.passwordInput.focus()}
                  autoCorrect={false}
                />

                <TextInput 
                  style={styles.input} 
                  placeholder="Senha" 
                  placeholderTextColor="#d8d8d8"
                  value={this.state.password}
                  onChangeText={this.handlePasswordChange}
                  secureTextEntry={true}
                  returnKeyType="go"
                  autoCorrect={false}
                  onSubmitEditing={() => this.handleSignInPress()}
                  ref = {(input) => this.passwordInput = input}
                />
                  
                  {this.state.error.length !== 0 && <Text style={styles.textError}>{this.state.error}</Text>}

                <TouchableOpacity style={styles.button} onPress={this.handleSignInPress} disabled={this.state.buttonDisabled}>
                  {!this.state.isLoading &&  <Text style={styles.buttonText}>Login</Text>}
                  {this.state.isLoading && <ActivityIndicator style={{marginBottom: 6}} size="large" color="#fff"/>}
                </TouchableOpacity>

              </View>
    
                <TouchableOpacity onPress={this.handleRecuperaSenhaPress}>
                  <View style={[styles.signup,{marginBottom: 0}]}>
                      <Text style={styles.signupText}>Perdeu sua senha de acesso?</Text>
                      <Text style={styles.signupButton}>Reenviar</Text>
                  </View>
                </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#383638'
  },
  viewLogo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width:230, 
    height: 50,
  },
  inputsLogin: {
    marginTop:40
  },
  input: {
    width: 350,
    height: 50,
    backgroundColor: '#464446',
    color: '#d8d8d8',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    marginVertical: 10
  },
  button: {
    width: 350,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#839101',
    marginVertical: 10,
    paddingVertical: 15
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center'
  },
  signup: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  signupText: {
    color: '#fff',
    fontSize: 16
  },
  signupButton: {
    marginLeft: 3,
    color: '#839101',
    fontSize: 16,
    fontWeight: '500'
  },
  textError: {
    textAlign: 'center',
    color: '#f9959b',
    fontSize: 16,
    marginBottom: 15,
    marginTop: 15,
  }
});
