import RoomsListPage from "./components/page/roomsListPage/roomsListPage";
import CreateRoomForm from "./components/ui/createRoomForm";
import RoomProvider from "./hooks/useRooms";

function App() {
  return (
    <>
      <h1>Hotel booking</h1>
      <RoomProvider>
        <RoomsListPage />
        <CreateRoomForm />
      </RoomProvider>
    </>
  );
}

export default App;
