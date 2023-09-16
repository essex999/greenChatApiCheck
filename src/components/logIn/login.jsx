import styles from "./login.module.css";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Button } from "@mui/material";
import ValidationTextField from "../input/validationTextField";
import { useState } from "react";
import { setIsAuth } from "../redux/slicers/isAuthenticated";
import { setIsError } from "../redux/slicers/isErrorSlicer";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserData } from "../redux/slicers/userSettingsData";
function LogInPage() {
  const dispatch = useDispatch();
  const [idInstanceValue, setIdInstanceValue] = useState("");
  const [apiTokenInstanceValue, setApiTokenInstanceValue] = useState("");

  const navigate = useNavigate();

  const setInstance = (event) => {
    setIdInstanceValue(event.target.value);
  };

  const setApiTokenValue = (event) => {
    setApiTokenInstanceValue(event.target.value);
  };

  const getUserSettingsApi = () => {
    axios
      .get(
        `https://api.green-api.com/waInstance${idInstanceValue}/getWaSettings/${apiTokenInstanceValue}`
      )
      .then(function (response) {
        dispatch(setIsAuth(true));
        dispatch(setUserData(response.data));
        localStorage.setItem("apiTokenInstanceValue", apiTokenInstanceValue);
        localStorage.setItem("idInstanceValue", idInstanceValue);
        navigate("/chat");
      })
      .catch(function (error) {
        dispatch(setIsError(true));
      });
  };

  return (
    <div className={styles.elementBody}>
      <div className={styles.topBorder}></div>
      <div className={styles.mainContent}>
        <div className={styles.appLogo}>
          <WhatsAppIcon style={{ height: "40px", width: "40px" }} />
          <span className={styles.whatsAppIconText}>Green Chat</span>
        </div>

        <div className={styles.box}>
          <div
            onSubmit={(e) => {
              e.preventDefault();
              getUserSettingsApi();
            }}
            className={styles.form}
          >
            <ValidationTextField
              index="1"
              setInstanceValue={setInstance}
              labelValue={"idInstance"}
            />
            <ValidationTextField
              index="2"
              setTokenValue={setApiTokenValue}
              labelValue={"apiTokenInstance"}
            />
            <Button
              onClick={getUserSettingsApi}
              style={{
                width: "120px",
                marginTop: "30px",
                color: "#00A884",
                borderColor: "#00A884",
              }}
              variant="outlined"
            >
              Go Chat
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogInPage;
