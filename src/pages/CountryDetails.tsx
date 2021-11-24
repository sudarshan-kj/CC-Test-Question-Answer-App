import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import styles from "./CountryDetails.module.css";

const CountryDetails = () => {
  const localState = useLocation().state;
  const [locationData, setLocationData] = useState<any>({
    location: { name: "", country: "", region: "" },
    current: { temperature: "", weather_icons: [], weather_descriptions: [] },
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!localState.data) {
      navigate("/");
    } else {
      const { location, current } = localState.data;
      setLocationData({ location, current });
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.weatherData}>
          <img
            className={styles.weatherIcon}
            alt="Image icon"
            src={locationData.current.weather_icons[0]}
          />
          <span>
            {locationData.current.temperature}
            <sup>°C</sup>
          </span>

          <h4>{locationData.current.weather_descriptions[0]}</h4>
        </div>
        <p>
          {locationData.location.name}, {locationData.location.region},&nbsp;
          {locationData.location.country}
        </p>
      </div>
      <button onClick={() => navigate("/")}> ← Back</button>
    </div>
  );
};

export default CountryDetails;
