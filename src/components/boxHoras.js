import React, {Component} from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    Image,
    Dimensions
} from 'react-native';
/*
    https://github.com/oblador/react-native-progress
*/
import * as Progress from 'react-native-progress';


export default class BoxHoras extends Component{
    state = { 
        colorProgressBar: '',
      };
      
    componentDidMount(){
        const porcentagem = this.props.projeto['porcentagem_utilizada'];
        if(porcentagem <= 50)
            this.setState({ colorProgressBar:  '#c0d102'});
        else if(porcentagem > 50 && porcentagem <= 70)
            this.setState({ colorProgressBar:  '#f4da73'});
        else if(porcentagem > 70 && porcentagem <= 90)
            this.setState({ colorProgressBar:  '#f4a773'});
        else    
            this.setState({ colorProgressBar:  '#d10202'}); 
    }

  render() {
    return (
        <View style={styles.container}>
            <Text style={styles.textContainer}>{this.props.projeto['projeto']}</Text>
            <View style={styles.progressBar}>
                <View style={styles.viewTextHora}>
                    <Text style={styles.textHora}>0h</Text>
                    <Text style={styles.textHora}>{this.props.projeto['horas_contratadas']}h</Text>
                </View>
                <Progress.Bar  borderRadius={10} borderWidth={0} unfilledColor={'#e4e5e9'} color={this.state.colorProgressBar} progress={(this.props.projeto['porcentagem_utilizada']/100)} width={Dimensions.get("window").width - 80} height={30} />
            </View>
            <View style={styles.subProgressBar}>
                <Text style={styles.textSubProgressBar}>Contando de {this.props.projeto['inicio_mes'].substring(0, 5)} à {this.props.projeto['fim_mes'].substring(0, 5)}</Text>
                <Text style={styles.textSubProgressBar}>Renova em {this.props.projeto['mes_renovacao'].substring(0, 5)}</Text>
            </View>

            <View style={styles.viewLegendaConsumido}>
                <View style={{flexDirection: 'row'}}>
                    <View style={[styles.circuloConsumido,{backgroundColor: this.state.colorProgressBar, overflow: 'hidden'}]} />
                    <Text style={styles.textLegendaConsumido}>Consumido</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{marginRight: 5 ,fontFamily: 'Helvetica',fontSize: 12,color: '#8f8c8f'}}>{this.props.projeto['porcentagem_utilizada']}%</Text>
                    <Text style={styles.textLegendaDisponivel}>{this.props.projeto['horas_utilizadas']}h</Text>
                </View>
            </View>

            <View style={styles.viewLegendaDisponivel}>
                <View style={{flexDirection: 'row'}}>
                    <View style={styles.circuloDisponivel} />
                    <Text style={styles.textLegendaDisponivel}>Disponivel</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{marginRight: 5 ,fontFamily: 'Helvetica',fontSize: 12,color: '#8f8c8f'}}>{this.props.projeto['porcentagem_naoutilizada']}%</Text>
                    <Text style={styles.textLegendaDisponivel}>{this.props.projeto['saldo']}</Text>
                </View>
            </View>
            
        </View>
    )
  }
  
}


const styles = StyleSheet.create({
    container: {
        // flexDirection: 'row',
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 10,
        height: 305,
        width: '90%',
    },
    textContainer: {
        fontWeight: '600',
        fontSize: 16,
        color: '#8f8c8f'
    },
    progressBar: {
        // backgroundColor: 'yellow',
        // alignItems: 'center',
        marginTop: 30
    },
    viewTextHora: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        marginBottom: 5
    },
    textHora: {
        fontFamily: 'Helvetica',
        fontSize: 18,
        fontWeight: '700',
        color: '#696769'
    },
    subProgressBar: {
        marginTop: 10,
    },

    textSubProgressBar: {
        marginTop: 5,
        fontFamily: 'Helvetica',
        fontSize: 12,
        color: '#8f8c8f'
    },
    viewLegendaConsumido: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopColor: '#e4e5e9',
        borderTopWidth: 1,
        marginTop: 40,
        paddingTop: 15
    },    
    circuloConsumido: {
        height: 15,
        width: 15,
        borderRadius: 10,
        // backgroundColor: '#c0d102'
    },
    textLegendaConsumido: {
        marginLeft: 8,
        fontFamily: 'Helvetica',
        fontSize: 12,
        fontWeight: '700',
        color: '#696769'
    },
    viewLegendaDisponivel: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopColor: '#e4e5e9',
        borderTopWidth: 1,
        marginTop: 10,
        paddingTop: 15
    },
    circuloDisponivel: {
        height: 15,
        width: 15,
        borderRadius: 10,
        backgroundColor: '#e4e5e9'
    },
    textLegendaDisponivel: {
        marginLeft: 8,
        fontFamily: 'Helvetica',
        fontSize: 12,
        fontWeight: '700',
        color: '#696769'
    },
    
});
