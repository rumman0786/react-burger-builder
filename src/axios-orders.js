import axios from 'axios';

const axiosOrder = axios.create({
    baseURL: 'https://react-burger-builder-36731-default-rtdb.firebaseio.com/'
});

export default axiosOrder;