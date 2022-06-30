import { useContext } from "react";
import { Link } from "react-router-dom";
import { FavoriteLocationsContext } from "../state/FavoriteLocationsContextWrapper";
import { TbHandClick } from "react-icons/tb";

const FavListItem = (props) => {
  const { loc } = props;
  const { handleFavStatus } = useContext(FavoriteLocationsContext);
  return (
    <>
      <li className="list-group-item list-group-item-action">
        <div className="row">
          <div className="col-auto me-auto">
            <Link
              to={`/my-locations/${loc.id}`}
              style={{
                cursor: "pointer",
                textDecoration: "none",
                color: "black",
              }}
            >
              <TbHandClick />

              <span> {loc.title}</span>
            </Link>
          </div>
          <div className="col-auto">
            <button
              className="btn btn-sm btn-danger"
              onClick={() => handleFavStatus(loc)}
            >
              Remove
            </button>
          </div>
        </div>
      </li>
    </>
  );
};
export default FavListItem;
