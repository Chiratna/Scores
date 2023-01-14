import axios from "axios";


const headers = {
    'X-RapidAPI-Key' : 'your-api-key',
    'X-RapidAPI-Host' : 'api-football-v1.p.rapidapi.com'
}

const client = axios.create({
    baseURL : 'https://api-football-v1.p.rapidapi.com/v3',
    headers,
})

export default client