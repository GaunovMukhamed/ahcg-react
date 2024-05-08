import { useEffect } from 'react';
import { Socket, io } from 'socket.io-client';
import { getLoginFromStorage } from './general.tools';
import { showError, showInfo } from './axios.interceptor';
import { Image } from 'primereact/image';
import { useNavigate } from 'react-router-dom';
import { GameState } from '../store/slices/models';
import { useAppDispatch } from '../store/store';
import { updateState } from '../store/slices/general.slice';
        
let socket: Socket | undefined;

//@ts-ignore
const SocketWrapper = ({ children }) => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const address: string = process.env.REACT_APP_API_ADDRESS!+'/images/';

  socket = io(process.env.REACT_APP_SOCKET_ADDRESS!, {
    transportOptions: {
      polling: {
        extraHeaders: {"Authorization": getLoginFromStorage()}
      },
    }
  });

  useEffect(() => {
    socket!.on('notification', (msg: any) => {
      const notif: any = msg.message;
      switch(notif.type) {
        case 'gain':
          showInfo(<div>Вы получили {notif.amount} <Image src={address+`items/${notif.item}.png`} width='12' height='12' /></div>);
          break;
        case 'lose':
          showInfo(<div>Вы потеряли {notif.amount} <Image src={address+`items/${notif.item}.png`} width='12' height='12' /></div>);
          break;
      }
    });
    socket!.on('gameState', (msg: GameState) => {
      dispatch(updateState(msg));
    });
    socket!.on('error', (msg: string) => {
      showError(msg);
    });
    socket!.on('logout', (msg: any) => {
      localStorage.clear();
      navigate("/");
    });

    return () => {
      socket?.close();
    }
  }, [])
  
  return children;
}

const sendSocketMessage = (type: string, message: any): void => {
  if(socket) {
    socket.emit(type, message);
  }
}

const sendSocketMessageWithCallback = async (type: string, message: any): Promise<any> => {
  if(socket) {
    return new Promise(resolve => {
      socket!.emit(type, message, (result: any) => {
        resolve(result)
      });
    })
  }
}

// async function doesSocketAgree(){
//   await new Promise(resolve => {
//     socket.emit('doesOtherSocketAgree', otherSocketId, (answer) => {
//       resolve(answer);
//     });      
//   });
// }

export { socket, SocketWrapper, sendSocketMessage, sendSocketMessageWithCallback };