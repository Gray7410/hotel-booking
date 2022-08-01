import AppLoader from "./components/ui/hoc/appLoader";
import NavBar from "./components/ui/navBar";
import { Route, Switch } from "react-router-dom";
import Rooms from "./layouts/rooms";
import Main from "./layouts/main";
import RoomAdd from "./layouts/roomAdd";
import Auth from "./layouts/auth";

function App() {
  return (
    <AppLoader>
      <NavBar />
      <Switch>
        <Route path="/rooms/add" component={RoomAdd} />
        <Route path="/rooms/:roomId?/:edit?" component={Rooms} />
        <Route path="/auth" component={Auth} />
        <Route exact path="/" component={Main} />
      </Switch>
    </AppLoader>
  );
}

export default App;
