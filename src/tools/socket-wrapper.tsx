import { useEffect } from 'react';
import { Socket, io } from 'socket.io-client';
import { getCharacterFromStorage, getLoginFromStorage } from './general.tools';
import { NotificationMessage, SocketMessage } from '../models';
import { useAppDispatch } from '../store/store';
import { showError, showInfo } from './axios.interceptor';
import { setCharacterStats } from '../store/slices/character.slice';
import { Image } from 'primereact/image';
        
let socket: Socket | undefined;

//@ts-ignore
const SocketWrapper = ({ children }) => {

  const address: string = process.env.REACT_APP_API_ADDRESS!+'/images/';

  socket = io(process.env.REACT_APP_SOCKET_ADDRESS!, {
    transportOptions: {
      polling: {
        extraHeaders: {"Authorization": `${getLoginFromStorage()}~/${getCharacterFromStorage()}`}
      },
    }
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    socket!.on('game', (msg: SocketMessage) => {
      socketMessageProcessor(msg)
    });
    socket!.on('error', (msg: string) => {
      showError(msg);
    });
  }, [])

  const socketMessageProcessor = (msg: SocketMessage): void => {
    switch(msg.type) {
      case 'character':
        dispatch(setCharacterStats(msg.message));
        break;
      case 'notification':
        const notif: NotificationMessage = msg.message;
        switch(notif.type) {
          case 'gain':
            showInfo(<div>Вы получили {notif.amount} <Image src={address+`items/${notif.item}.png`} width='12' height='12' /></div>);
            break;
          case 'lose':
            showInfo(<div>Вы потеряли {notif.amount} <Image src={address+`items/${notif.item}.png`} width='12' height='12' /></div>);
            break;
        }
    }
  }
  
  return children;
}

const sendSocketMessage = (type: string, message: any): void => {
  if(socket) {
    socket.emit(type, message);
  }
}

const sendSocketMessageWithCallback = (type: string, message: any, responseFunc: (result: any) => void): void => {
  if(socket) {
    socket.emit(type, message, responseFunc);
  }
}

export { SocketWrapper, sendSocketMessage, sendSocketMessageWithCallback };