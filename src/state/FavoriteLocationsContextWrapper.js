import { useState, createContext, useEffect } from "react";

export const FavoriteLocationsContext = createContext();

function FavoriteLocationsContextWrapper(props) {
  const [favLocs, setFavLocs] = useState(
    JSON.parse(localStorage.getItem("weatherly")) || []
  );
  const [isFav, setIsFav] = useState(false);

  const isElementInFavList = (location) => {
    // let localStorageObject =
    //   JSON.parse(localStorage.getItem("weatherly")) || [];
    // localStorage.setItem("weatherly", JSON.stringify(localStorageObject));

    if (favLocs.filter((el) => el.title === location.title).length > 0) {
      setIsFav(true);
      return true;
    } else {
      setIsFav(false);
      return false;
    }
  };

  const handleFavStatus = (element) => {
    let localStorageObject = JSON.parse(JSON.stringify(favLocs));

    if (localStorageObject.find((el) => el.title === element.title)) {
      let newArray = localStorageObject.filter(
        (el) => el.title !== element.title
      );
      localStorage.setItem("weatherly", JSON.stringify(newArray));
      setFavLocs(JSON.parse(JSON.stringify(newArray))); //DEEP COPY
      setIsFav(false);
    } else {
      localStorageObject.push(element);
      localStorage.setItem("weatherly", JSON.stringify(localStorageObject));
      setFavLocs(JSON.parse(JSON.stringify(localStorageObject))); //DEEP COPY
      setIsFav(true);
    }
  };

  return (
    <FavoriteLocationsContext.Provider
      value={{
        isFav,
        favLocs,
        handleFavStatus,
        isElementInFavList,
      }}
    >
      {props.children}
    </FavoriteLocationsContext.Provider>
  );
}

export default FavoriteLocationsContextWrapper;
