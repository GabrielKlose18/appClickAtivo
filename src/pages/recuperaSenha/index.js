import React, {Component} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { 
    StyleSheet, 
    Text, 
    View, 
    Image, 
    TextInput, 
    TouchableOpacity,
    TouchableHighlight,
    ActivityIndicator,
    Keyboard
} from 'react-native';

import api from '../../services/api';

export default class RecuperarSenha extends Component{
    
    state = { 
      email: '',  
      error: '',
      success: '',
      isLoading: false,
      buttonDisabled: false
    };

    handleEmailChange = (email) => {
        this.setState({ email });
      };

    handleBackToLogin = () => {
        this.props.navigation.navigate('Login');
    };

    handleForgetPassword = async () => {
      Keyboard.dismiss();
      this.setState({isLoading: true});
      this.setState({error: ''});
      if (this.state.email.length === 0) {
          this.setState({ error: 'Preencha o email continuar!' }, () => false);
          this.setState({isLoading: false});
      }else{
          try{
            const response = await api.post('/recuperarSenha', {
              ds_cliente_email: this.state.email,
            })
            
            console.log('Try '+response.data);
            if(response.data.success.length !== 0)
              this.setState({success: response.data.success});

          } catch (response) {
            console.log('catch '+response.data);
            if(response.data.errors.length !== 0)
              this.setState({error: response.data.errors});
          }
          this.setState({isLoading: false});
      }
  };
    
  render() {
    return (
        <View style={styles.container}>
            <View style={styles.viewLogo}>
              <Image 
                source={require('../../images/logo_clickativo.png')} 
                style={styles.logo}
              />
                <TextInput 
                  style={styles.input} 
                  placeholder="Email" 
                  placeholderTextColor="#d8d8d8"
                  onChangeText={this.handleEmailChange}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                {this.state.error.length !== 0 && <Text style={styles.textError}>{this.state.error}</Text>}

                {this.state.success.length !== 0 && <Text style={styles.textSuccess}>{this.state.success}</Text>}

              <TouchableOpacity onPress={this.handleForgetPassword} style={styles.button} disabled={this.state.buttonDisabled}>
                {!this.state.isLoading && <Text style={styles.buttonText}>Enviar</Text>}
                {this.state.isLoading && <ActivityIndicator style={{marginBottom: 6}} size="large" color="#fff"/>}
              </TouchableOpacity>

            </View>           

              <TouchableOpacity onPress={this.handleBackToLogin}>
                <View style={styles.signup}>
                    <AntDesign 
                      name="arrowleft"
                      size={16}
                      color={'#839101'}
                    />
                    <Text style={styles.signupButton}>Voltar</Text>
                </View>
              </TouchableOpacity>
        </View>
      
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
  imgBackGround: {
    width: '100%', 
    height: '100%'
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
    marginVertical: 10,
    marginTop: 20
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
    paddingVertical: 16,
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
  },
  textSuccess: {
    textAlign: 'center',
    color: '#2cce20',
    fontSize: 16,
    marginBottom: 15,
    marginTop: 15,
  }
});
