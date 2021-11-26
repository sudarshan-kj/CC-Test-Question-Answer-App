import { Routes, Route, Link } from "react-router-dom";
import NotFound from "./pages/NotFound";
import styles from "./App.module.css";
import CandidateInputForm from "./pages/CandidateInputForm";
import QuestionPage from "./pages/QuestionPage";
import ResultsPage from "./pages/ResultsPage";

function App() {
  return (
    <div>
      <Link className={styles.header} to="/">
        Question Answer App
      </Link>

      <div className={styles.appContainer}>
        <Routes>
          <Route path="/" element={<CandidateInputForm />} />
          <Route path="question/:id" element={<QuestionPage />} />
          <Route path="results" element={<ResultsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
