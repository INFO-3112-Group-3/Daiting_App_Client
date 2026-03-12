const API_IP = 'https://localhost';
const API_PORT = 7195;


const headers = {
    // https://www.rfc-editor.org/rfc/rfc7231#section-5.3.2
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept
    'Accept': '*/*',
    // https://www.rfc-editor.org/rfc/rfc7231#section-3.1.1.5
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type
    'Content-Type': 'application/json'
}

const serverRoute = (route) => `${API_IP}:${API_PORT}/${route}`;


const users = {
    getUserInformation: async (userName) => {
        let response = await fetch (serverRoute(`api/users/email/${userName}`), {
            headers,
            method: 'GET'   
        });
        let data = await response.json();
        return data;
    },
    login: async(userEmail,password) => {
        let response = await fetch(serverRoute("api/users/login"), {
            headers,
            method: 'POST',
            body: JSON.stringify({Email : userEmail, Password : password})
        })
        return response;
    }
}

export {
    users
}