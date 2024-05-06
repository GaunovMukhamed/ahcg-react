import { Button } from 'primereact/button'; 
import { InputText } from 'primereact/inputtext';
import { useEffect, useState } from 'react';
import { loginUser } from './login.service';
import { SuccessResponse } from '../../models';
import { Spinner } from '../../components/spinner';
import { getLoginFromStorage, saveLoginToStorage } from '../../tools/general.tools';
import { useNavigate } from 'react-router-dom';
        
const LoginPage: React.FC = (props: any) => {

  const navigate = useNavigate();

  const [login, setLogin] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    checkAuth();
  }, [])

  const checkAuth = (): void => {
    if(getLoginFromStorage()) {
      navigate("/game");
    }
  }

  const onSubmit = (event: any): void => {
    event.preventDefault();
    setLoading(true);
    loginUser(login)
      .then((response: SuccessResponse) => {
        saveLoginToStorage(login);
        navigate("/game");
      })
      .catch((error) => {})
      .finally(() => setLoading(false))
  }

  return(
    <div className='w-full h-full flex justify-content-center align-items-center'>
      <form className='flex flex-column gap-2' onSubmit={(event: any) => onSubmit(event)}>
        <InputText
          placeholder='Логин...'
          required
          value={login}
          onInvalid={(event: any) => event.target.setCustomValidity('Введите логин')}
          onInput={(event: any) => { event.target.setCustomValidity('') }}
          onChange={(e) => setLogin(e.target.value)} />
        <Button label="Войти" type='submit' />
      </form>
      { loading ? <Spinner  /> : '' }
    </div>
  )
}

export { LoginPage };