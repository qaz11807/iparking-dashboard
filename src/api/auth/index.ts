import Axios from 'axios';
import Config from '../../config';

const authRequest = Axios.create({
    baseURL: Config.serverUrl + Config.dashboardPrefix,
});

export const login = (data: {username:string, password: string}) => {
    return authRequest.post('/auth/signin', data);
};
