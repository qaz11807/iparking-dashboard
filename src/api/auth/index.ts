import Config from '../../config';
import {Repository} from '../../utils/repository';

const baseUrl = Config.serverUrl + Config.dashboardPrefix;
const AuthRepo = new Repository(baseUrl);

export const login = (username:string, password: string) => {
    return AuthRepo.getAxios().post('/auth/signin', {
        username,
        password,
    });
};

