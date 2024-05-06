import { useNavigate } from 'react-router-dom'
import { getCharacterFromStorage, getLoginFromStorage } from './general.tools'
import { useEffect } from 'react';

//@ts-ignore
const Protected = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const signedIn: boolean = !!(getLoginFromStorage());
    const hasCharacter: boolean = !!(getCharacterFromStorage());
    if (signedIn) {
      if(hasCharacter) navigate('/game/play');
    } else {
      navigate('/');
    }
  }, [])
  
  return children;
}

export default Protected;