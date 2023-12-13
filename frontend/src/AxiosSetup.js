import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL
});

const isTokenExpired = (token) => {

    const payloadBase64 = token.split('.')[1];
    const decodedJson = atob(payloadBase64);
    const decoded = JSON.parse(decodedJson);
    const exp = decoded.exp;

    return Date.now() >= exp * 1000;
};

const handleExpiredToken = () => {
    console.log("here");
    localStorage.removeItem('jwtToken');
    window.location.href = '/';
};

axiosInstance.interceptors.request.use(
    async config => {
        const token = localStorage.getItem('jwtToken');
        if (!token) return config;

        if (isTokenExpired(token)) {
            handleExpiredToken();
            return config;
        }

        config.headers['Authorization'] = `Bearer ${token}`;

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axiosInstance;