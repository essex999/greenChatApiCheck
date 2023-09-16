import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { setIsError } from "../redux/slicers/isErrorSlicer";
export default function ValidationTextField(props) {
  const savedApiTokenInstanceValue = localStorage.getItem(
    "apiTokenInstanceValue"
  );
  const savedIdInstanceValue = localStorage.getItem("idInstanceValue");
  const isError = useSelector((state) => state.isError);
  const dispatch = useDispatch();
  const resetError = () => {
    dispatch(setIsError(false));
  };
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
        "& label.Mui-focused": {
          color: "#00A884",
        },
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderColor: "#00A884",
          },
        },
      }}
      autoComplete="on"
    >
      <div>
        <TextField
          autoComplete="on"
          onInput={
            props.index === "1" ? props.setInstanceValue : props.setTokenValue
          }
          onChange={resetError}
          error={isError}
          label={props.labelValue}
          helperText=""
        />
      </div>
    </Box>
  );
}
