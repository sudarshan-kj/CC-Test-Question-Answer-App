import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import Button from "@mui/material/Button";

const CountryInput = () => {
  const navigate = useNavigate();
  const handleOnSumbit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get("name"),
      gender: data.get("gender"),
      languagePreferred: data.get("languagePreferred"),
    });
    navigate("/question/1");
  };

  return (
    <Box
      component="form"
      onSubmit={handleOnSumbit}
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "350px",
        width: "300px",
        justifyContent: "space-between",
        p: 8,
        border: "1px dashed grey",
      }}
    >
      <TextField required id="outlined-required" label="Name" name="name" />
      <Box>
        <FormControl component="fieldset">
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup aria-label="gender" defaultValue="female" name="gender">
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
        <FormControl component="fieldset" sx={{ marginLeft: "35px" }}>
          <FormLabel component="legend">Language Preference</FormLabel>
          <RadioGroup
            aria-label="language preference"
            defaultValue="english"
            name="languagePreferred"
          >
            <FormControlLabel
              value="english"
              control={<Radio />}
              label="English"
            />
            <FormControlLabel value="hindi" control={<Radio />} label="Hindi" />
          </RadioGroup>
        </FormControl>
      </Box>
      <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
        Get started
      </Button>
    </Box>
  );
};

export default CountryInput;
