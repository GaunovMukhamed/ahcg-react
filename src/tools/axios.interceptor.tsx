import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';

const address: string = process.env.REACT_APP_API_ADDRESS!;
export const http: AxiosInstance = axios.create({
  baseURL: address
});

interface AxiosProps {
  children: any;
}

let toast: any; 

const AxiosInterceptor: React.FC<AxiosProps> = ({children}) => {

  toast = useRef<Toast>(null);

  http.interceptors.response.use(
    (response: AxiosResponse) => {
      if(Object.keys(response.data).length === 1 && response.data.message)
        toast.current!.show({ severity: 'success', summary: 'Успешно', detail: response.data.message });
      return response.data;
    }, 
    (error: AxiosError) => {
      toast.current!.show({ severity: 'error', summary: 'Ошибка', detail: 
        error.response ?
          (error.response.data! as any).message :
          'Ошибка подключения к серверу' });
      return Promise.reject(error);
    }
  );

  return (
    <>
      <Toast ref={toast} />
      {children}
    </>
  );
}

const showSuccess = (msg: React.Component | string): void => {
  toast.current!.show({ severity: 'success', summary: 'Успешно', detail: msg });
}

const showInfo = (msg: React.Component | any): void => {
  toast.current!.show({ severity: 'info', summary: '', detail: msg });
}

const showError = (msg: React.Component | string): void => {
  toast.current!.show({ severity: 'error', summary: 'Ошибка', detail: msg });
}

export {AxiosInterceptor, showSuccess, showInfo, showError}