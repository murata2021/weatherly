import { useState, useEffect, useContext } from "react";
//COMPONENTS
import CityWeatherProfileCard from "../components/CityWeatherProfileCard";
import Forecast from "../components/Forecast";
import Spinner from "../components/Spinner";
//HELPER FUNCTIONS
import {
  formatCurrentWeatherData,
  formatForecastWeather,
} from "../helpers/helpers";
//API CALLS
import { getWeather } from "../api/apiCalls";
//ICONS
//CONTEXTS
import { UnitsContext } from "../state/UnitsContextWrapper";
import { FavoriteLocationsContext } from "../state/FavoriteLocationsContextWrapper";
import { useHistory, useParams } from "react-router-dom";

function SingleLocationPage() {
  const { id } = useParams();
  const { isMetric } = useContext(UnitsContext);
  const { favLocs, isElementInFavList } = useContext(FavoriteLocationsContext);

  const [selectedValue, setSelectedValue] = useState(
    favLocs.filter((el) => el.id === id)[0]
  );
  let history = useHistory();
  if (!selectedValue) history.push("/");
  const [currentDataQueryResults, setCurrentDataQueryResults] = useState(null);

  const [apiProgress, setApiProgress] = useState(false);

  const loadWeatherInfo = async () => {
    try {
      setApiProgress(true);

      let units = isMetric ? "metric" : "imperial";
      let { lat, lng } = selectedValue;
      let response = await getWeather(lat, lng, units);

      let data = response.data;
      let formattedCurrentData = formatCurrentWeatherData(data);
      let forecastData = formatForecastWeather(data);
      setCurrentDataQueryResults(() =>
        JSON.parse(
          JSON.stringify({
            ...formattedCurrentData,
            ...forecastData,
            ...selectedValue,
          })
        )
      );
      setApiProgress(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    let cancel = false;

    if (selectedValue && !cancel) {
      if (cancel) return;
      isElementInFavList(selectedValue);
      loadWeatherInfo();
    }
    return () => {
      cancel = true;
    };
  }, [isMetric]);

  let content = apiProgress ? (
    <div className="card text-center">
      <Spinner size="big" />
    </div>
  ) : (
    <>
      {selectedValue && currentDataQueryResults && (
        <>
          <div
            className="card text-center position-relative"
            style={{ backgroundColor: "grey" }}
          >
            <div className="card-body">
              <CityWeatherProfileCard
                currentData={currentDataQueryResults}
                selectedValue={selectedValue}
              />
              <Forecast
                title="HOURLY"
                forecastData={currentDataQueryResults.hourly}
              />
              <Forecast
                title="DAILY"
                forecastData={currentDataQueryResults.daily}
              />
            </div>
          </div>
        </>
      )}
    </>
  );

  return (
    <>
      <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1">
        <div className="container pt-2">{content}</div>
      </div>
    </>
  );
}

export default SingleLocationPage;
