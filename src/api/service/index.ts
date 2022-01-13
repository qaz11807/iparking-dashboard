import {Order} from '../../models/order';
import {Plate} from '../../models/plate';
import {User} from '../../models/user';
import Config from '../../config';
import {CRUDRepository, SimulateRepository} from '../../utils/repository';

const prefix = Config.dashboardPrefix;
export const OrderRepo = new CRUDRepository<Order>(prefix+'/order');
export const PlateRepo = new CRUDRepository<Plate>(prefix+'/plate');
export const UserRepo = new CRUDRepository<User>(prefix+'/user');
export const SimulateRepo = new SimulateRepository(prefix+'/simulate');

export default [OrderRepo, PlateRepo, UserRepo, SimulateRepo];
