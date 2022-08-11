import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getRoomsList } from "../../store/rooms";
import { getCurrentUserId, getUserById } from "../../store/users";
import RoomCard from "../ui/roomCard";

const UserPage = () => {
  const currentUser = useSelector(getCurrentUserId());
  const user = useSelector(getUserById(currentUser));
  const rooms = useSelector(getRoomsList());
  const bookingRooms = rooms.filter((r) => r.available === currentUser);
  return (
    <div className="container mb-3">
      <h1 className="m-3">Профиль</h1>
      <div className="card d-flex flex-row mb-3">
        <img
          src={
            user.avatar ||
            "https://static.wixstatic.com/media/f2a160_c9c86716aca24834875db9e82badb39a.png_srz_289_280_85_22_0.50_1.20_0.00_png_srz"
          }
          className="img-fluid rounded m-3 border"
          width={200}
          alt={user.name}
        />
        <div className="m-3">
          <h2>{user.name}</h2>
          <p>
            <b>E-mail: </b>
            <a href={`mailto:${user.email}`}>{user.email}</a>
          </p>
          <Link to={`/profile/edit`}>
            <button className="btn btn-outline-success">Редактировать</button>
          </Link>
        </div>
      </div>
      <h3 className="m-3">Забронированные номера</h3>
      <div className="card">
        <div className="d-flex flex-wrap m-2">
          {bookingRooms.map((r) => (
            <RoomCard room={r} key={r._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
