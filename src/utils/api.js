const API_IP = 'http://localhost';
const API_PORT = 5129;


const headers = {
    // https://www.rfc-editor.org/rfc/rfc7231#section-5.3.2
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept
    'Accept': '*/*',
    // https://www.rfc-editor.org/rfc/rfc7231#section-3.1.1.5
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type
    'Content-Type': 'application/json'
}

const serverRoute = (route) => `${API_IP}:${API_PORT}/${route}`;

// Used to convert an uploaded file to a base64 string for easier storage in the database and transmission over the network.
function PictureToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
}

const users = {
    getUserInformation: async (id) => {
        let response = await fetch (serverRoute(`api/users/${id}`), {
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
            body: JSON.stringify({email : userEmail, password : password})
        })
        return response;
    },
    register: async (user) => {
        let response = await fetch(serverRoute("api/users/register"), {
            headers,
            method: 'POST',
            body: JSON.stringify(user)
        })
        return response;
    },
    update: async(user) => {
        let response = await fetch(serverRoute("api/users/" + user.id), {
            headers,
            method: 'PUT',
            body: JSON.stringify(user)
        })
        return response;
    },
}
const skills = {
    getSkills: async () => {
        let response = await fetch(serverRoute("api/skills"), {
            headers,
            method: 'GET'
        });
        let data = await response.json();
        return data;
    }
}

export {
    users,
    skills,
    PictureToBase64
}
