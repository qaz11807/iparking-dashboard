import Config from '../../config';
import {Order} from '../../models/order';
import {Plate} from '../../models/plate';
import {User} from '../../models/user';
import {CRUDRepository, SimulateRepository} from '../../utils/repository';

const baseUrl = Config.serverUrl + Config.dashboardPrefix;
export const OrderRepo = new CRUDRepository<Order>(baseUrl, '/order');
export const PlateRepo = new CRUDRepository<Plate>(baseUrl, '/plate');
export const UserRepo = new CRUDRepository<User>(baseUrl, '/user');
export const SimulateRepo = new SimulateRepository(baseUrl + '/simulate');

export const repoSelector = (type:string) => {
    switch (type.toLowerCase()) {
    case 'order':
        return OrderRepo;
    case 'user':
        return UserRepo;
    case 'plate':
        return PlateRepo;
    default:
        throw new Error('Repo Not exist!');
    }
};

export const updateAllRepoToken = (token:string | null) =>
    [OrderRepo, PlateRepo, UserRepo, SimulateRepo].forEach((repo) => repo.updateToken(token));
