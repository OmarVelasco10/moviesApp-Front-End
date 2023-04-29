import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';


const baseURL = 'http://192.168.1.5:4002/api';

const movieApi = axios.create({baseURL});


movieApi.interceptors.request.use(
    async (config)=> {
        const token = await AsyncStorage.getItem('token');
         console.log(token);

        if( token ) {
            config.headers['x-token'] = token;
        }

        return config;
    }
)



export default movieApi;