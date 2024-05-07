
export const saveLoginToStorage = (login: string): void => {
  if(login.length) localStorage.setItem('login', login);
}

export const getLoginFromStorage = (): string | null => {
  return localStorage.getItem('login');
}
