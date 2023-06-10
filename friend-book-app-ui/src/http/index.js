import axios from "axios";

const $host = axios.create({
    baseURL : process.env.REACT_APP_IDENTITY_SERVER
})

const $authHost = axios.create({
    baseURL : process.env.REACT_APP_IDENTITY_SERVER
})

const $authGroupHost = axios.create({
    baseURL : process.env.REACT_APP_GROUP_SERVICE
})

const authInterceptors = config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    console.log(config.headers.Authorization)
    return config;
}

$authHost.interceptors.request.use(authInterceptors)
$authGroupHost.interceptors.request.use(authInterceptors)

export {
    $host,
    $authHost,
    $authGroupHost
}