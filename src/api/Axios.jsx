import axios from "axios";


const app = axios.create({
    baseURL: "https://mern-backend-ojs2.onrender.com/",
    timeout: 5000,
     headers: {'X-Custom-Header': 'foobar'}
})

export default app;