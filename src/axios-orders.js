import Axios from "axios";

const instance = Axios.create({
    baseURL: 'https://react-my-burger-c1dff.firebaseio.com/'
});

export default instance;