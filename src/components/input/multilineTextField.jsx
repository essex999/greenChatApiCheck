import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";

import SendIcon from "@mui/icons-material/Send";
export default function MultilineTextField(props) {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": {
          m: 1,
          width: "740px",
        },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        value={props.textContent === "" ? "" : props.textContent}
        onInput={(e) => {
          props.setMessage(e);
          props.resButton();
          if (e.target.value === "") {
            props.setOnButton();
          }
        }}
        id="outlined-multiline-flexible"
        label="New message"
        multiline
        maxRows={2}
        sx={{
          "& label.Mui-focused": {
            color: "#00A884",
          },

          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "#00A884",
            },
          },
        }}
      />
      <IconButton
        style={{ position: "relative", left: "-60px", top: "16px" }}
        onClick={() => {
          props.setOnButton();
          props.sendPostRequest();
        }}
        disabled={props.activeSendButton}
        type="button"
        aria-label="send"
      >
        <SendIcon />
      </IconButton>
    </Box>
  );
}
