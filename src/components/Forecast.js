import { getIconFromWeatherAPI } from "../helpers/helpers";
import { v4 as uuidv4 } from "uuid";

const Forecast = (props) => {
  return (
    <div className="container">
      <p style={{ color: "white" }}>{props.title} FORECAST</p>
      <hr className="my-3" />
      <div className="row row-cols-5">
        {props.forecastData.map((el) => {
          return (
            <div className="col" key={uuidv4()}>
              <p style={{ fontSize: "13px" }}>{el.title}</p>
              <img
                src={`${getIconFromWeatherAPI(el.icon)}`}
                alt="weather"
                style={{ height: "10vh" }}
              />
              <p style={{ fontSize: "13px" }}>{el.temp.toFixed(1)}&deg;</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;
