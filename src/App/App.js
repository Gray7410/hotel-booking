import RoomsListPage from "./components/page/roomsListPage/roomsListPage";
import AppLoader from "./components/ui/hoc/appLoader";
import CreateRoomForm from "./components/ui/createRoomForm";

function App() {
  return (
    <AppLoader>
      <h1>Hotel booking</h1>
      <RoomsListPage />
      <CreateRoomForm />
    </AppLoader>
  );
}

export default App;
