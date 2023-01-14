import axios from "axios";


const headers = {
    'X-RapidAPI-Key' : '248b7a8767msh09d736a40a93349p19af8fjsn6bb8371a1213',
    'X-RapidAPI-Host' : 'api-football-v1.p.rapidapi.com'
}

const client = axios.create({
    baseURL : 'https://api-football-v1.p.rapidapi.com/v3',
    headers,
})

export default client