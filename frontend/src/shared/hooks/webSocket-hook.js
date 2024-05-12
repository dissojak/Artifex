import { useEffect, useState } from 'react';

const useWebSocket = (url) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = new WebSocket(url);
        setSocket(newSocket);

        newSocket.onopen = () => console.log('WebSocket Connected');
        newSocket.onerror = (error) => console.error('WebSocket Error:', error);
        newSocket.onclose = () => console.log('WebSocket Disconnected');

        return () => {
            newSocket.close();
        };
    }, [url]);

    return socket;
};
