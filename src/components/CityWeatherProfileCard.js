//HELPER FUNCTION
import { getIconFromWeatherAPI } from "../helpers/helpers";

//ICONS
import { TbTemperature } from "react-icons/tb";
import { WiHumidity } from "react-icons/wi";
import { BsSunset, BsSunrise } from "react-icons/bs";
import { GiThermometerCold, GiThermometerHot } from "react-icons/gi";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

//CONTEXTS
import { FavoriteLocationsContext } from "../state/FavoriteLocationsContextWrapper";
import { useContext } from "react";

const CityWeatherProfileCard = (props) => {
  let { currentData, selectedValue } = props;

  const { isFav, handleFavStatus } = useContext(FavoriteLocationsContext);

  return (
    <div>
      <div className="container">
        <div className="row">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="col-auto me-auto">
              <p
                style={{
                  color: "white",
                  fontSize: "14px",
                  fontWeight: "bolder",
                }}
              >
                {currentData.localTime}
              </p>
            </div>
            <div className="col-auto">
              <p
                style={{ color: "yellow", borderColor: "yellow" }}
                onClick={() => handleFavStatus(selectedValue)}
              >
                {isFav ? <AiFillStar size="26" /> : <AiOutlineStar size="26" />}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p style={{ color: "white", fontSize: "20px", fontWeight: "bolder" }}>
          {currentData.title}
        </p>
        <p style={{ color: "white", fontSize: "12px" }}>
          {currentData.description}
        </p>
      </div>
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={getIconFromWeatherAPI(currentData.icon)}
            alt="weather"
            style={{ height: "9vh" }}
          />
          <span
            style={{
              color: "white",
              fontSize: "40px",
            }}
          >
            {currentData.temp.toFixed(1)}&deg;
          </span>
        </div>

        <div>
          <div style={{ color: "white", fontWeight: "bold" }}>
            <TbTemperature size="12" />
            <span style={{ fontSize: "12px" }}>
              Feels Like: {currentData.feels_like.toFixed(1)}&deg;
            </span>
          </div>
        </div>
        <div>
          <div style={{ color: "white", fontWeight: "bold" }}>
            <WiHumidity size="12" />
            <span style={{ fontSize: "12px" }}>
              Humidity: {currentData.humidity}%
            </span>
          </div>
        </div>
      </div>
      <div className="container pt-2">
        <div className="row">
          <div className="col">
            <BsSunrise />
            <p style={{ fontSize: "12px" }}>
              <span>Rise: {currentData.sunrise}</span>
            </p>
          </div>
          <div className="col">
            <BsSunset />
            <p style={{ fontSize: "12px" }}>
              <span>Set: {currentData.sunset}</span>
            </p>
          </div>
          <div className="col">
            <GiThermometerHot />
            <p style={{ fontSize: "12px" }}>
              <span>High: {currentData.max.toFixed(1)}&deg;</span>
            </p>
          </div>
          <div className="col">
            <GiThermometerCold />
            <p style={{ fontSize: "12px" }}>
              <span>Low: {currentData.min.toFixed(1)}&deg;</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityWeatherProfileCard;
