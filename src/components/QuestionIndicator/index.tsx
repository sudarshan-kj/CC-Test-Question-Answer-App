import Box from "@mui/material/Box";
import questionsFile from "src/questions.json";
import { Link } from "react-router-dom";

const Circle: any = ({ id, answered = false, highlight = false }: any) => (
  <Link to={`/question/${id}`}>
    <Box
      component="span"
      sx={{
        bgcolor: answered ? "primary.main" : "gray",
        border: highlight ? "3px solid #004ec2" : "",
        width: 40,
        height: 40,
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        boxShadow: "2px 2px 10px 1px #c2bcbc;",
      }}
    >
      {id}
    </Box>
  </Link>
);

const QuestionIndicator = ({ answered, current }: any) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        position: "absolute",
        top: "150px",
        right: 0,
        left: 0,
      }}
    >
      {questionsFile.questions.map((question) => {
        const isAnswered = answered.some((item: any) => question.id === item);
        let highlight = false;
        if (current == question.id) {
          highlight = true;
        }
        return (
          <Circle
            key={question.id}
            id={question.id}
            answered={isAnswered}
            highlight={highlight}
          />
        );
      })}
    </Box>
  );
};

export default QuestionIndicator;
