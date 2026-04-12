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

function GenderToString(gender){
    switch(gender){
        case 0:
            return  "Not Specified";
        case 1:
            return "Male";
        case 2:
            return "Female";
        case 4:
            return "Other";
        default:
            return "Not Specified";
    }
}

// Calculates age based on the provided date of birth in ISO format (e.g., "1990-01-01").
function getUserAge(isoString) {
  const birthDate = new Date(isoString);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  const hasHadBirthdayThisYear =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() >= birthDate.getDate());

  if (!hasHadBirthdayThisYear) {
    age--;
  }

  return age;
}

// Returns a formatted date string (e.g., "Jan 01, 1990") based on the provided ISO date string.
function formatBirthdayDate(isoString) {
  const date = new Date(isoString);

  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(date);
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

    getSuggestedMatches: async(id) => {
        let response = await fetch(serverRoute("api/users/" + id + "/matches"), {
            headers,
            method: 'GET',
        })
        let data = await response.json();
        return data;
    }
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
const preferences ={
    getAllPrefs: async () => {
        let response = await fetch(serverRoute("api/preferences"),{
            headers,
            method: 'GET'
        });
        let data = await response.json();
        return data;
    }
}
const stats ={
    getAllStats: async () => {
        let response = await fetch(serverRoute("api/admin/dashboard/stats"),{
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
    PictureToBase64,
    GenderToString,
    getUserAge,
    formatBirthdayDate,
    preferences,
    stats
}
