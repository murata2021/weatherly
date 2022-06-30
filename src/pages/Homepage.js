//HOOKS
import { useState, useEffect, useContext } from "react";
//COMPONENTS
import CityWeatherProfileCard from "../components/CityWeatherProfileCard";
import Forecast from "../components/Forecast";
import Spinner from "../components/Spinner";
//HELPER FUNCTIONS
import {
  formatCurrentWeatherData,
  formatForecastWeather,
  formatLocationData,
} from "../helpers/helpers";
//API CALLS
import { getWeather, searchLocation } from "../api/apiCalls";

//CONTEXTS
import { UnitsContext } from "../state/UnitsContextWrapper";
import { FavoriteLocationsContext } from "../state/FavoriteLocationsContextWrapper";
//SEARCH BAR
import { AsyncPaginate } from "react-select-async-paginate";

function HomePage() {
  const [inputValue, setInputValue] = useState("");
  const [selectedValue, setSelectedValue] = useState(null);
  const [currentDataQueryResults, setCurrentDataQueryResults] = useState(null);

  const [apiProgress, setApiProgress] = useState(false);

  const { isMetric } = useContext(UnitsContext);
  const { isElementInFavList } = useContext(FavoriteLocationsContext);

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const loadWeatherInfo = async () => {
    try {
      setApiProgress(true);

      let units = isMetric ? "metric" : "imperial";
      let { lat, lng } = selectedValue;
      let response = await getWeather(lat, lng, units);

      isElementInFavList(selectedValue);

      let data = response.data;
      let formattedCurrentData = formatCurrentWeatherData(data);
      let forecastData = formatForecastWeather(data);
      setCurrentDataQueryResults({
        ...formattedCurrentData,
        ...forecastData,
        ...selectedValue,
      });
      setApiProgress(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (selectedValue !== null) {
      isElementInFavList(selectedValue);
      loadWeatherInfo();
    }
  }, [selectedValue, isMetric]);

  // handle selection
  const handleLocationChange = (value) => {
    setSelectedValue(value);
  };

  // load options using API call
  const loadOptions = async (inputValue) => {
    if (inputValue) {
      let response = await searchLocation(inputValue);

      return {
        options: formatLocationData(response.data.results[0].locations),
        hasMore: false,
      };
    } else {
      return { options: [], hasMore: false };
    }
  };

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
        <div className="container">
          <>
            <AsyncPaginate
              cacheOptions
              defaultOptions
              value={selectedValue}
              getOptionLabel={(e) => e.title}
              getOptionValue={(e) => ({ id: e.id, lat: e.lat, lng: e.lng })}
              loadOptions={loadOptions}
              onInputChange={handleInputChange}
              onChange={handleLocationChange}
              debounceTimeout={1000}
              isClearable
              placeholder="Search location..."
              noOptionsMessage={() => "No Location found!"}
            />
          </>
        </div>
      </div>
      <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1">
        <div className="container pt-2">{content}</div>
      </div>
    </>
  );
}

export default HomePage;
