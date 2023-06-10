import {$authHost, $host} from "../http";

const controllerAuth = 'IdentityServer/'
const controllerContact = 'Contact/'
export const registration = async (login,password) => {
    try {
        const response = (await $host.post(`${controllerAuth}registration`, {Login:login, Password:password})).data
        if (response.data !== null) {
            localStorage.setItem('token', response.data)
        }
        return response
    }
    catch (e) {
        console.log(e.message)
        return {message:e.message};
    }
}

export const authorisation = async (login, password) => {
    try {
        const response = (await $host.post(`${controllerAuth}authenticate`, {login, password})).data;
        if (response.data !== null) {
            localStorage.setItem('token', response.data)
        }
        return response
    }
    catch (e) {
        console.log(e.message)
        return {message:e.message};
    }
}

export const check = async () => {
    let isAuthorize
    try {
        const response = await $authHost.get(`${controllerAuth}checkToken`)
        isAuthorize = true
    } catch (e) {
        isAuthorize = false
    }
    return isAuthorize;
}

export const getMyContact = async () => {
    try {
        const response = (await $authHost.get(`${controllerContact}getMyContact`)).data
        return response;
    }
    catch (e) {
        console.log(e.message)
        return {message:e.message};
    }
}

export const getContact = async (id) => {
    try {
        const response = (await $authHost.get(`${controllerContact}getContact/${id}`)).data
        return response;
    }
    catch (e) {
        console.log(e.message)
        return {message:e.message};
    }
}

export const GetProfiles = async (login) => {
    try {
        let url = `${controllerContact}GetProfiles`;
        if (login) {
            url += `/${login}`;
        }
        const response = (await $authHost.get(url)).data;
        return response;
    } catch (e) {
        console.log(e.message);
        return {message:e.message};
    }
}

export const updateMyContactInformation = async (userContact) => {
    try {
        const response = (await $authHost.put(`${controllerContact}updateMyContactInformation`,
            {
                FullName: userContact.fullName?? '',
                Email:userContact.email?? '',
                Login: userContact.login?? '',
                Info: userContact.info?? '',
                Profession: userContact.profession?? '',
                Telephone: userContact.telephone?? ''
            }
        )).data;
        return response;
    } catch (e) {
        console.error(e);
        return {message:e.message};
    }
}