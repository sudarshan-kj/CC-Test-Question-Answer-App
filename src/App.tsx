import { Routes, Route, Link } from "react-router-dom";
import CountryDetails from "./pages/CountryDetails";
import NotFound from "./pages/NotFound";
import styles from "./App.module.css";
import CountryInputForm from "./pages/CountryInputForm";

function App() {
  return (
    <div>
      <Link className={styles.header} to="/">
        Country Weather App
      </Link>
      <div className={styles.appContainer}>
        <Routes>
          <Route path="/" element={<CountryInputForm />} />
          <Route path="countryDetails" element={<CountryDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
