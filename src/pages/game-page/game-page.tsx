import { Provider } from "react-redux";
import { SocketWrapper } from "../../tools/socket-wrapper";
import { store } from "../../store/store";
import { TopBar } from "./top-bar/top-bar";
import { Locations } from "./locations-popups/locations-popups";

const GamePage: React.FC<any> = () => {
  return(
    <Provider store={store}>
      <SocketWrapper>
        <div className="w-full h-full bg-gray-900 relative flex flex-column">
          <TopBar className="sticky top-0 left-0" />
          <Locations className="flex-1 flex flex-column overflow-hidden" />
        </div>
      </SocketWrapper>
    </Provider>
  )
}

export { GamePage }