import {useEffect, useState} from 'react';
import {Manager, Socket} from 'socket.io-client';
/**
 * websocket hook
 * @param {Manager} manager
 * @return {Socket}
 */
export function useWebsocket(manager: Manager) {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        if (!socket) {
            const connection = manager.socket('/');
            setSocket(connection);
        }
    }, []);

    useEffect(() => {
        if (socket) {
            socket.on('connect', () => {
                console.log(socket.id);
            });
            socket.on('close', () => {
                setSocket(null);
            });
        }
    }, [socket]);

    return socket;
}
