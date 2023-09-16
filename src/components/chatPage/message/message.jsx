import styles from "./message.module.css";

function Message(props) {
  return (
    <div
      className={styles.message}
      style={
        props.data.sender === "my"
          ? {
              justifyContent: "flex-end",
            }
          : {
              justifyContent: "flex-start",
            }
      }
    >
      <div
        className={styles.messageText}
        style={
          props.data.sender === "my"
            ? {
                backgroundColor: "#00A884",

                justifyContent: "flex-end",
              }
            : {
                backgroundColor: "#00c298",
                justifyContent: "flex-end",
              }
        }
      >
        {props.data.text}
      </div>
    </div>
  );
}
export default Message;
