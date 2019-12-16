import { create } from 'apisauce';

const api = create({
    baseURL: 'http://clickgestor.com.br/slim',
    timeout: 30000 // 30 segundos 
});

api.addResponseTransform( response => {
    if(response.data.errors != '') throw response;
})

export default api;