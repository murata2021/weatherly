import React, { useContext, useState } from "react";
import Switch from "react-switch";
import { WiCelsius, WiFahrenheit } from "react-icons/wi";
import { UnitsContext } from "../state/UnitsContextWrapper";
const Toggle = () => {
  const { isMetric, changeMetric } = useContext(UnitsContext);

  return (
    <label>
      <Switch
        onChange={changeMetric}
        checked={isMetric}
        checkedIcon={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              fontSize: 15,
              paddingRight: 2,
            }}
          >
            <WiCelsius size="3em" />
          </div>
        }
        uncheckedIcon={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              fontSize: 15,
              paddingRight: 2,
            }}
          >
            <WiFahrenheit size="3em" />
          </div>
        }
      />
    </label>
  );
};

export default Toggle;
