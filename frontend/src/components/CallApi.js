import axios from 'axios';
// get commend to the backend
const api = 'http://localhost:5001';

class CallApi {
    getSomething() {
        console.log('succ')
        return new Promise((resolve) => resolve(axios.get(`${api}`)));
    }
}

export default new CallApi();