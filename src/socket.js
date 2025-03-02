import { Client } from '@stomp/stompjs';
import token from './utils/token';

const stompClient = new Client({
    brokerURL: 'ws://localhost:8080/api/v1/notification',
    reconnectDelay: 5000, // 자동 재 연결

    onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
    },
    onDisconnect: () => {
        console.log('websocker disconnect');
    },
});

// stompClient.onConnect = () => {
//     console.log('connect ws sucessfully');
//     stompClient.subscribe('/ws/pong', (message) => console.log('Received : ', message.body));
//     stompClient.publish({
//         destination: '/app/ping',
//         body: 'PING',
//     });
// };

export const connect = (userId) => {
    // connect to server
    console.log('connect WS');

    try {
        stompClient.configure({
            connectHeaders: {
                userId: userId,
            },
        });
        stompClient.activate();
    } catch (err) {
        console.log(err);
    }
};

export const disconnect = () => {
    if (stompClient.current === null) {
        return;
    }
    stompClient.deactivate();
};

export const sendNotificationWithCondition = (condition, data) => {
    if (condition) {
        stompClient.publish({
            destination: '/app/notification',
            body: JSON.stringify(data),
        });
    }
};

export default stompClient;
