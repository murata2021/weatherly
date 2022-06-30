import FavList from "../components/FavList";

const FavoritesPage = () => {
  return (
    <>
      <div className="col-lg-8 offset-lg-2 col-md-8 offset-md-2 col-sm-10 offset-sm-1">
        <div className="container">
          <FavList />
        </div>
      </div>
    </>
  );
};

export default FavoritesPage;
