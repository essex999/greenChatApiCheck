import { useDispatch, useSelector } from "react-redux";
import styles from "./chatPage.module.css";
import Message from "./message/message";
import CustomizedInputBase from "../input/customizedInputBase";
import { useEffect, useState } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import MultilineTextField from "../input/multilineTextField";
import axios from "axios";
import LogoutIcon from "@mui/icons-material/Logout";
import { setMessage } from "../redux/slicers/messages";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { setIsAuth } from "../redux/slicers/isAuthenticated";

function Chat() {
  const nagivate = useNavigate();
  const dispatch = useDispatch();
  const messagesData = useSelector((state) => state.messages);
  const currentTime = Math.floor(Date.now() / 1000);
  const userApiData = useSelector((state) => state.userData);
  const [isSending, setSending] = useState(true);
  const [messageID, setMessageID] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isUser, setUser] = useState(false);
  const savedApiTokenInstanceValue = localStorage.getItem(
    "apiTokenInstanceValue"
  );

  const savedIdInstanceValue = localStorage.getItem("idInstanceValue");
  const link = `https://api.green-api.com/waInstance${savedIdInstanceValue}/sendMessage/${savedApiTokenInstanceValue}`;
  const receiveLink = `https://api.green-api.com/waInstance${savedIdInstanceValue}/receiveNotification/${savedApiTokenInstanceValue}`;
  const removeLink = `https://api.green-api.com/waInstance${savedIdInstanceValue}/deleteNotification/${savedApiTokenInstanceValue}/${messageID}`;
  const [messageTextContent, setMessageTextContent] = useState("");

  const resetIsActiveButton = () => {
    setSending(false);
  };
  const disableButton = () => {
    setSending(true);
  };
  const setTextContent = (event) => {
    setMessageTextContent(event.target.value);
  };
  function setNumber(number) {
    dispatch(setPhoneNumber(number));
  }
  function setUserPhone(user) {
    setUser(user);
  }
  const data = {
    chatId: phoneNumber,
    message: messageTextContent,
  };

  function sendMessage() {
    axios
      .post(link, data)
      .then(function (response) {
        dispatch(
          setMessage({
            sender: "my",
            text: messageTextContent,
            time: currentTime,
          })
        );

        setMessageTextContent("");
      })
      .catch(function (error) {});
  }
  const removeNotyf = useCallback(() => {
    axios
      .delete(removeLink)
      .then(function (response) {})
      .catch(function (error) {});
  }, [removeLink]);

  const receiveNotyf = useCallback(() => {
    axios
      .get(receiveLink)
      .then(function (response) {
        const userMessageID = response.data.receiptId;
        setMessageID(userMessageID);

        if (response.data.body.typeWebhook === "incomingMessageReceived") {
          const message =
            response.data.body.messageData.textMessageData.textMessage;

          const timeStamp = response.data.body.timestamp;

          dispatch(
            setMessage({
              sender: "you",
              text: message,
              time: timeStamp,
            })
          );
        }

        if (response.data.receiptId) {
          setTimeout(() => {
            removeNotyf();
          }, 100);
        }
      })
      .catch(function (error) {});
  }, [dispatch, receiveLink, removeNotyf]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      receiveNotyf();
    }, 1000);
    return () => clearInterval(intervalId);
  }, [receiveNotyf]);

  return (
    <div className={styles.elementBody}>
      <div className={styles.topBorder}></div>
      <div className={styles.mainContent}>
        <div className={styles.box}>
          <div className={styles.topBox}>
            <div className={styles.userInfo}>
              <img
                src={userApiData.avatar}
                style={{ borderRadius: "50%", width: "40px" }}
                alt="avatar"
              />
              <div>{userApiData.phone}</div>
              <LogoutIcon
                style={{ cursor: "pointer" }}
                onClick={() => {
                  dispatch(setIsAuth(false));
                  nagivate("/");
                }}
              />
            </div>
            <div className={styles.arrows}>
              <NavigateNextIcon />
              <NavigateNextIcon />
              <NavigateNextIcon />
            </div>

            <CustomizedInputBase
              setPhoneNumber={setNumber}
              setActiveUser={setUserPhone}
            />
          </div>
          {isUser ? (
            <div className={styles.messagesBox}>
              {messagesData.messages.length > 0 ? (
                messagesData.messages.map((message, index) => (
                  <Message key={index} data={message} />
                ))
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    paddingTop: "140px",
                  }}
                >
                  No messages to display
                </div>
              )}
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "160px",
              }}
            >
              search number
            </div>
          )}
          {isUser ? (
            <MultilineTextField
              setOnButton={disableButton}
              resButton={resetIsActiveButton}
              activeSendButton={isSending}
              setMessage={setTextContent}
              sendPostRequest={sendMessage}
              textContent={messageTextContent}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
export default Chat;
