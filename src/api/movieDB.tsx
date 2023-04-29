import axios from "axios";

const movieDB = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    params:{
        api_key: 'd09c2f8957986db7531a8cc8ac1bd11b',
    },
    headers: {
        Accept: 'application/json',
        'content-type': 'application/json'
    }
});

export default movieDB;