import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';


const baseURL = 'http://127.0.0.1:4050/api';

const movieApi = axios.create({baseURL});


movieApi.interceptors.request.use(
    async (config)=> {
        try {
            console.log(config, 'config');
            const token = await AsyncStorage.getItem('token');
            config.headers.Accept = 'application/json';
            config.headers["Content-Type"] = "application/json; charset=utf-8";

            if( token && config.data !== undefined) {
                config.headers['x-token'] = token;
            } // else {
            //     config.headers['x-token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NDQ5ZDAwMDhkMDU2Y2UyOTY3MmQ3MjIiLCJuYW1lIjoib21hciIsImlhdCI6MTY4Mjg5OTYwOSwiZXhwIjoxNjgyOTA2ODA5fQ._2shIUI0gxAnTILb-VYAl-cyJ3iNudp6XRoP8VeN7co'
            //     // config.data = undefined;
            // }
    
            // config.headers['x-token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NDQ5ZDAwMDhkMDU2Y2UyOTY3MmQ3MjIiLCJuYW1lIjoib21hciIsImlhdCI6MTY4Mjg5OTYwOSwiZXhwIjoxNjgyOTA2ODA5fQ._2shIUI0gxAnTILb-VYAl-cyJ3iNudp6XRoP8VeN7co'
            // console.log(config.headers['x-token'], 'x-token');
            
        } catch (error) {
            console.log(error, 'interceptor');
        }
        return config;
    }
)



export default movieApi;