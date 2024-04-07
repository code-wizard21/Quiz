import React, { createContext, useContext } from 'react';
import { Socket, io } from 'socket.io-client';
import { serverUrl } from '../../env.config';

interface SocketContextProps {
  socket: Socket | null;
}

const socketClient = io(serverUrl, {
  autoConnect: false,
});

export const SocketContext = createContext<SocketContextProps | undefined>(undefined);

export const useSocket = (): SocketContextProps => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

interface SocketProviderProps {
  children: React.ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const contextValue: SocketContextProps = { socket: socketClient };
  return <SocketContext.Provider value={contextValue}>{children}</SocketContext.Provider>;
};
