import { useContext } from "react";
//COMPONENT
import FavListItem from "./FavListItem";
//CONTEXT
import { FavoriteLocationsContext } from "../state/FavoriteLocationsContextWrapper";
import { Link } from "react-router-dom";

const FavList = () => {
  const { favLocs } = useContext(FavoriteLocationsContext);

  return (
    <>
      <div className="card">
        <div className="card-header text-center">
          <h3>Favorite Locations</h3>
        </div>
        {favLocs.length === 0 ? (
          <p>
            No Location found.{" "}
            <Link to="/" style={{ textDecoration: "none" }}>
              Please visit the home page!
            </Link>
          </p>
        ) : (
          <ul className="list-group list-group flush">
            {favLocs.map((loc) => {
              return (
                <div key={loc.id}>
                  <FavListItem loc={loc} />
                </div>
              );
            })}
          </ul>
        )}

        <div className="card-footer text-center"></div>
      </div>
    </>
  );
};

export default FavList;
