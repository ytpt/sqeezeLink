import config from "./config";
import Cookies from 'js-cookie';

const request = async function(method, apiMethod, queryData, bodyData) {
    let requestURL = config.api_base_url + apiMethod;
    let requestOptions = {
        method: method,
        redirect: 'follow'
    };
    const token = Cookies.get(config.cookie_name);

    if (token){
        let authHeaders = new Headers();
        authHeaders.append('Authorization', 'Bearer ' + token);

        requestOptions.headers = authHeaders;
    }

    if (queryData && Object.keys(queryData).length > 0) {
        const searchParams = new URLSearchParams(queryData);
        requestURL += `?${searchParams.toString()}`;
    }

    if (bodyData && Object.keys(bodyData).length > 0) {
        let formData = new FormData();

        for (const [key, value] of Object.entries(bodyData)) {
            formData.append(key, value.toString());
        }

        requestOptions.body = formData;
    }

    return await fetch(requestURL, requestOptions)
        .then(response => response.text())
        .then(result => {
            return JSON.parse(result);
        })
        .catch(error => console.log('error', error));
}

export default request;