import {Manager} from 'socket.io-client';
import Config from '../../config';

export const manager = new Manager(Config.websocketUrl, {
    reconnectionDelayMax: 10000,
    withCredentials: true,
});

manager.open((err) => {
    if (err) {
        console.log(err);
    } else {
    }
});
