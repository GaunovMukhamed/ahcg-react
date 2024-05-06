import { Provider } from "react-redux";
import { SocketWrapper } from "../../tools/socket-wrapper";
import { store } from "../../store/store";

const GamePage: React.FC<any> = () => {
  return(
    <Provider store={store}>
      <SocketWrapper>
        <div className="w-full h-full bg-gray-900 relative flex flex-column">
          asd
        </div>
      </SocketWrapper>
    </Provider>
  )
}

export { GamePage }