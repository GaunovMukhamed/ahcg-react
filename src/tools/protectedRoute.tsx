import { useNavigate } from 'react-router-dom'
import { getLoginFromStorage } from './general.tools'
import { useEffect } from 'react';

//@ts-ignore
const Protected = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const signedIn: boolean = !!(getLoginFromStorage());
    if (!signedIn) {
      navigate('/');
    }
  }, [])
  
  return children;
}

export default Protected;