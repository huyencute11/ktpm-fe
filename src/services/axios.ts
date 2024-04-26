import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://example.com/api',
    //process.env.API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        // withCredentials: true,
    },
});

axiosInstance.interceptors.request.use(
    (config : any) => {
        const rawPersistData = localStorage.getItem('token');
        if (rawPersistData) {
            config.headers['Authorization'] = `Bearer ${rawPersistData}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
        // return response.data;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance