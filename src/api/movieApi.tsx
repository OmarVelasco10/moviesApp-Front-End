import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from "react-native";



 const baseURL = Platform.OS === 'ios' ? 'http://127.0.0.1:4050/api' : 'http://10.0.2.2:4050/api';



const movieApi = axios.create({baseURL});


movieApi.interceptors.request.use(
    async (config)=> {
        try {
            const token = await AsyncStorage.getItem('token');
            config.headers.Accept = 'application/json';
            config.headers["Content-Type"] = "application/json; charset=utf-8";

            if( token ) {
                config.headers['x-token'] = token;
            } 
            
        } catch (error) {
            console.log(error, 'Interceptor');
        }
        return config;
    }
)



export default movieApi;