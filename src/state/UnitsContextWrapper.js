import { useState, createContext } from "react";

export const UnitsContext = createContext();

function UnitsContextWrapper(props) {
  const [isMetric, setIsMetric] = useState(
    JSON.parse(localStorage.getItem("isMetric")) ? true : false
  );

  const changeMetric = () => {
    localStorage.setItem("isMetric", !isMetric);
    setIsMetric(!isMetric);
  };

  return (
    <UnitsContext.Provider
      value={{
        isMetric,
        changeMetric,
      }}
    >
      {props.children}
    </UnitsContext.Provider>
  );
}

export default UnitsContextWrapper;
