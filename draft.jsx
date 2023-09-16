import styles from "./App.module.css";
import axios from "axios";

import { useState } from "react";
export default function App() {
  const [messageContent, setMessageContent] = useState("");
  const idInstance = "7103852190";
  const apiTokenInstance = "f08221a810894f299eafa629cd4c9571c9652d430c6742138a";
  const getUserSettings = `https://api.green-api.com/waInstance${idInstance}/getWaSettings/${apiTokenInstance}`;

  const data = {
    chatId: "37368855569@c.us",
    message: messageContent,
  };

  const link = `https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;

  function sendMessage() {
    axios
      .post(link, data)
      .then(function (response) {
        console.log(response.data);
        console.log("ok");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function getAckountSettings() {
    axios
      .get(
        `https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`
      )
      .then(function (response) {
        console.log(response.data);
        console.log("ok");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="App">
      <input
        onInput={(event) => {
          setMessageContent(event.target.value);
        }}
        className={styles.messageBox}
      ></input>
      <button
        onClick={() => {
          getAckountSettings();
        }}
      >
        getAckData
      </button>
      <button
        onClick={() => {
          sendMessage();
        }}
      >
        sendMessage
      </button>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
