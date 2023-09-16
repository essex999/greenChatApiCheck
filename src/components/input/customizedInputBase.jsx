import * as React from "react";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { useState } from "react";

export default function CustomizedInputBase(props) {
  const [user, setUser] = useState(false);
  const [isError, setError] = useState(false);
  const savedApiTokenInstanceValue = localStorage.getItem(
    "apiTokenInstanceValue"
  );
  const changePhone = () => {
    setUser(!user);
  };
  const savedIdInstanceValue = localStorage.getItem("idInstanceValue");
  const [inputValue, setInputValue] = useState("");
  const link = `https://api.green-api.com/waInstance${savedIdInstanceValue}/checkWhatsapp/${savedApiTokenInstanceValue}`;
  const requestBody = { phoneNumber: inputValue };
  const element = document.getElementById("myInput");
  function checkNumber() {
    axios
      .post(link, requestBody)
      .then(function (response) {
        if (response.data.existsWhatsapp === true) {
          setUser(true);
          props.setActiveUser(true);
        }

        props.setPhoneNumber(`${inputValue}@c.us`);
      })
      .catch(function (error) {
        setError(true);
        if (element) {
          element.blur();
        }
      });
  }

  return (
    <div
      style={{
        display: "flex",
        height: "50px",
      }}
    >
      {user ? (
        <div style={{ display: "flex", gap: "80px", alignItems: "center" }}>
          <div>{inputValue}</div>

          <LogoutIcon
            style={{ cursor: "pointer" }}
            onClick={() => {
              changePhone();
              props.setActiveUser(false);
              setError(false);
            }}
          ></LogoutIcon>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            checkNumber();
          }}
        >
          <Box
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
          >
            <div>
              <FormControl
                size="small"
                sx={{ m: 1, width: "250px" }}
                variant="outlined"
                error={isError}
              >
                <InputLabel>Search User</InputLabel>
                <OutlinedInput
                  id="myInput"
                  onInput={(e) => {
                    setInputValue(e.target.value);
                    setError(false);
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => {
                          checkNumber();
                          setError(false);
                        }}
                        type="button"
                        sx={{ p: "10px" }}
                        aria-label="search"
                      >
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Search User"
                />
              </FormControl>
            </div>
          </Box>
        </form>
      )}
    </div>
  );
}
