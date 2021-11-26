import { FormEvent, useEffect, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import questionsFile from "src/questions.json";
import QuestionIndicator from "src/components/QuestionIndicator";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";

const QuestionPage = () => {
  const [submissions, setSubmissions] = useState(Array(5).fill(""));
  const [answered, setAnswered] = useState<any>([]);
  const [checkBoxState, setCheckBoxState] = useState({
    option1: false,
    option2: false,
    option3: false,
    option4: false,
  });
  const navigate = useNavigate();
  const params: any = useParams();
  let id = params.id;
  if (!id) id = 1;
  const { questions } = questionsFile;

  useEffect(() => {
    if (submissions[1]) {
      setAnswered((prev: any) => [...prev, 2]);
    } else if (submissions[1].trim() === "") {
      setAnswered((prev: any) => prev.filter((answer: number) => answer !== 2));
    }
  }, [submissions[1]]);

  useEffect(() => {
    setSubmissions((prev: any) => {
      const newArr = [...prev];
      newArr[2] = checkBoxState;
      return newArr;
    });
    const { option1, option2, option3, option4 } = checkBoxState;
    if (option1 || option2 || option3 || option4) {
      setAnswered((prev: any) => [...prev, 3]);
    } else {
      setAnswered((prev: any) => prev.filter((answer: number) => answer !== 3));
    }
  }, [checkBoxState]);

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate("/results", { state: submissions });
    console.log("Submissions are", submissions);
  };

  const handleCheckBoxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckBoxState({
      ...checkBoxState,
      [event.target.name]: event.target.checked,
    });
  };

  const { option1, option2, option3, option4 } = checkBoxState;

  if (id > questions.length) {
    return <div>Invalid id</div>;
  }

  return (
    <Box component="form" onSubmit={handleOnSubmit}>
      <QuestionIndicator answered={answered} current={id} />

      <Button
        disabled={id <= 1}
        sx={{ position: "absolute", left: "50px", bottom: "40%" }}
        onClick={() => navigate(`/question/${Number(id) - 1}`)}
      >
        ← Previous
      </Button>

      <Box sx={{ fontSize: "1rem", fontWeight: "bold", marginBottom: "4rem" }}>
        <Typography
          sx={{
            background: "gainsboro",
            display: "inline-block",
            padding: 1,
            borderRadius: 1,
          }}
        >
          Question {questions[id - 1].id}:
        </Typography>
        <p>{questions[id - 1].question}</p>
      </Box>

      {(() => {
        switch (id) {
          case "1":
            return (
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="gender"
                  name="first-answer"
                  value={submissions[0]}
                  onChange={(e: any) => {
                    setSubmissions((prev) => {
                      const newArr: any = [...prev];
                      newArr[0] = e.target.value;
                      return newArr;
                    });
                    setAnswered((prev: any) => [...prev, 1]);
                  }}
                >
                  <FormControlLabel
                    value="384400"
                    control={<Radio />}
                    label="384,400"
                  />
                  <FormControlLabel
                    value="380400"
                    control={<Radio />}
                    label="380,400"
                  />
                  <FormControlLabel
                    value="320400"
                    control={<Radio />}
                    label="320,400"
                  />
                </RadioGroup>
              </FormControl>
            );
          case "2":
            return (
              <TextField
                id="outlined-required"
                label="Enter your answer here"
                name="second-answer"
                value={submissions[1]}
                onChange={(e: any) => {
                  setSubmissions((prev) => {
                    const newArr: any = [...prev];
                    newArr[1] = e.target.value;
                    return newArr;
                  });
                }}
                onKeyPress={(e) => {
                  e.key === "Enter" && e.preventDefault();
                }}
              />
            );
          case "3":
            return (
              <FormGroup sx={{ width: "450px" }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={option1}
                      onChange={handleCheckBoxChange}
                      name="option1"
                    />
                  }
                  label="Initializes state to value 2"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={option2}
                      onChange={handleCheckBoxChange}
                      name="option2"
                    />
                  }
                  label="Returns a state variable and a state updater function"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={option3}
                      onChange={handleCheckBoxChange}
                      name="option3"
                    />
                  }
                  label="Returns null"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={option4}
                      onChange={handleCheckBoxChange}
                      name="option4"
                    />
                  }
                  label="None of the above"
                />
              </FormGroup>
            );
          case "4":
            return (
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="react-question"
                  name="react-question"
                  value={submissions[3]}
                  onChange={(e: any) => {
                    setSubmissions((prev) => {
                      const newArr: any = [...prev];
                      newArr[3] = e.target.value;
                      return newArr;
                    });
                    setAnswered((prev: any) => [...prev, 4]);
                  }}
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="No"
                  />
                </RadioGroup>
              </FormControl>
            );
          case "5":
            return <div>First Div</div>;
          default:
            return null;
        }
      })()}

      <Button
        disabled={id >= questions.length}
        sx={{ position: "absolute", right: "50px", bottom: "40%" }}
        onClick={() => navigate(`/question/${Number(id) + 1}`)}
      >
        Next →
      </Button>
      {id >= questions.length && (
        <Button
          disabled={id < questions.length}
          sx={{ marginTop: "4rem" }}
          type="submit"
          variant="contained"
        >
          Submit
        </Button>
      )}
    </Box>
  );
};

export default QuestionPage;
