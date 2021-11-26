import { useLocation, useNavigate } from "react-router";
import questionsFile from "src/questions.json";
import Box from "@mui/material/Box";
import PieChart from "src/components/PieChart";
import Button from "@mui/material/Button";

const totalQuestions = questionsFile.questions.length;

const ResultsPage = () => {
  const params = useLocation();
  const navigate = useNavigate();

  const rightAnswers = questionsFile.questions.reduce((prev, question) => {
    return JSON.stringify(params.state[question.id - 1]) ===
      JSON.stringify(question.answer)
      ? prev + 1
      : prev;
  }, 0);

  if (!params.state) {
    return <h2>Not allowed</h2>;
  }

  return (
    <Box>
      <Box
        px={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>
          You got {rightAnswers}/{totalQuestions} right!
        </h1>
        <PieChart
          value1={Number(rightAnswers)}
          value2={totalQuestions - rightAnswers}
        />
      </Box>

      {questionsFile.questions.map((question) => {
        return (
          <>
            <p>Q: {question.question}</p>
            {
              <Box
                sx={{
                  backgroundColor:
                    JSON.stringify(params.state[question.id - 1]) ===
                    JSON.stringify(question.answer)
                      ? "#a8f0b4"
                      : "#f4c6be",
                  padding: "1rem",
                  borderRadius: "4px",
                  border:
                    JSON.stringify(params.state[question.id - 1]) ===
                    JSON.stringify(question.answer)
                      ? "1px solid green"
                      : "1px solid red",
                }}
              >
                {JSON.stringify(params.state[question.id - 1])}
              </Box>
            }
            {JSON.stringify(params.state[question.id - 1]) !==
              JSON.stringify(question.answer) && (
              <Box>
                <h5>Right answer: </h5>
                <p>{JSON.stringify(question.answer)}</p>
              </Box>
            )}
          </>
        );
      })}
      <Box sx={{ marginTop: "2rem" }}>
        <Button
          onClick={() => navigate("/question/1")}
          sx={{ marginRight: "1rem" }}
          variant="contained"
        >
          Retake
        </Button>
        <Button
          color="warning"
          onClick={() => navigate("/")}
          variant="contained"
        >
          Exit
        </Button>
      </Box>
    </Box>
  );
};

export default ResultsPage;
