import Box from "@mui/material/Box";
import { FC } from "react";

type PieChartInputs = {
  value1: number;
  value2: number;
};

const PieChart: FC<PieChartInputs> = ({ value1, value2 }) => {
  const total = value1 + value2;
  const correct = (360 / total) * value1;
  const inCorrect = (360 / total) * value2;

  console.log("Value 1 2 are", correct, inCorrect);

  return (
    <Box
      sx={{
        marginTop: "50px",
        display: "block",
        width: "200px",
        height: "200px",
        borderRadius: "50%",
        backgroundImage: `conic-gradient(#a8f0b4 ${correct}deg,  #f4c6be 0 ${inCorrect}deg)`,
        boxShadow: "2px 2px 10px 4px gainsboro",
      }}
    />
  );
};

export default PieChart;
