
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';
import { useRef } from 'react';
import { PrimeIcons } from 'primereact/api';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { useNavigate } from 'react-router-dom';

const SettingsButton: React.FC<any> = () => {

  const menuLeft = useRef<Menu>(null);
  const navigate = useNavigate();

  const items: MenuItem[] = [
    {
      label: 'Опции',
      items: [
        {
          label: 'Выйти',
          icon: PrimeIcons.SIGN_OUT,
          command: () => {
            confirmDialog({
              message: 'Вы точно хотите выйти?',
              header: 'Выход',
              icon: 'pi pi-info-circle',
              defaultFocus: 'reject',
              acceptClassName: 'p-button-danger',
              draggable: false,
              dismissableMask: true,
              acceptLabel: 'Да',
              rejectLabel: 'Нет',
              accept: () => {
                localStorage.clear();
                navigate('/');
              }             
          });
          }
        }
      ]
    }
  ];

  return(
    <div className="absolute" style={{ top: '0.5rem', right: '0.5rem' }}>
      <Button className='p-1 w-2rem' icon="pi pi-cog" onClick={(event) => menuLeft.current!.toggle(event)} />
      <Menu model={items} popup ref={menuLeft} id="popup_menu_left" />
      <ConfirmDialog />
    </div>
  )
}

export {SettingsButton};