import AsyncStorage from '@react-native-community/async-storage';

export default isLogaded = () => {
    const token = JSON.parse(AsyncStorage.getItem('@ClickAtivoApp:cliente'));

    return token[0]['cd_cliente'];
};